import json

from django.db.models.query import QuerySet
from .models import UserAccount, Portfolio, Trade
from .serializers import PortfolioSerializer, TradeSerializer
from .permissions import IsFromUser
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from alpha_vantage.timeseries import TimeSeries
from alpha_vantage.fundamentaldata import FundamentalData
from django.conf import settings

# Objet TimeSeries qui permet de faire des requetes a l'api TimeSeries de Alpha Vantage
ts = TimeSeries(key=str(settings.ALPHA_VANTAGE_KEY))
fd = FundamentalData(key=str(settings.ALPHA_VANTAGE_KEY))

# Portfolio views


class PortfolioChartDataView(APIView):
    """
    Vue qui permet de recuperer les donnees pour afficher la valeur du portfolio dans le temps
    """

    def get(self, request):
        """
        Renvoie les donnees du portfolio en format JSON
        """
        portfolio_data = Portfolio.objects.get(
            owner=request.user).get_portfolio_data_daily()

        return Response(data=json.dumps(portfolio_data))


class PortfolioAPIView(APIView):
    """
    Vue qui renvoie le portfolio de l'utilisateur
    """

    def get(self, request):
        """
        Cette methode renvoie le portfolio de l'utilisateur quand une requete GET est faite
        """
        portfolio = PortfolioSerializer(
            Portfolio.objects.get(owner=request.user)).data
        return Response(portfolio)


# Trade views

class TradeRetrieveAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
    Vue qui permet de recuperer l'information sur un trade
    """
    permission_classes = (IsFromUser,)
    queryset = Trade.objects.all()
    serializer_class = TradeSerializer


class TradeCreateAPIView(generics.CreateAPIView):
    """
    Vue de creer un trade
    """
    queryset = Trade.objects.all()
    serializer_class = TradeSerializer


class TradeListAPIView(generics.ListAPIView):
    """
    Vue qui permet de recuperer les trades
    """
    permission_classes = (IsFromUser,)
    serializer_class = TradeSerializer

    def get_queryset(self):
        """
        Cette methode permet de s'assurer que l'utilisateur n'a acces qu'aux trades qu'il a cree
        """
        return Trade.objects.filter(portfolio=self.request.user.portfolio)


class DeleteAccountView(generics.DestroyAPIView):
    """
    Vue qui permet de supprimer l'entirete du compte personnel
    """

    queryset = UserAccount.objects.all()

    def delete(self, request):
        # TODO: Donner une autre réponse peut-être
        UserAccount.objects.get(pk=request.user.pk).delete()
        return Response({"user": "User has been deleted"})


class SearchSymbolView(APIView):
    """
    Vue qui permet de chercher un symbole
    """

    def post(self, request):
        """
        Retourner les actions associees au symbole recherche
        """
        keywords = request.data["keywords"]
        data, meta = ts.get_symbol_search(keywords=keywords)
        # Un bug dans le package alpha_vantage fait en sorte qu'on ne recoit pas les donnees en format json
        # Il faut passer d'un pandas DataFrame a JSON
        parsed = json.loads(data.to_json(orient="index"))
        formatted = list(parsed.values())

        return Response(data=json.dumps(formatted))


class SymbolInfoView(APIView):
    """
    Vue permettant d'obtenir l'information sur une action specifique
    """

    def format_chart_data(self, dates, values):
        """
        Retourne les valeurs dans le format que le graphique en a besoin
        Cette fonction s'utilise beaucoup mieux avec un map()
        """
        val = dict()
        # On ajoute le temps dans les donnees et on renome les cles associees pour avoir le bon format
        val["time"] = dates
        val["open"] = values["1. open"]
        val["high"] = values["2. high"]
        val["low"] = values["3. low"]
        val["close"] = values["4. close"]
        return val

    def post(self, request):
        """
        Retourne l'information sur la compagnie associee a un symbol ansi que les donnees pour construire un graphique de la valeur de la compagnie
        """
        symbol = request.data["symbol"]
        data, meta = ts.get_daily_adjusted(symbol=symbol)
        company_data = fd.get_company_overview(symbol=symbol)
        keys = list(data.keys())
        values = list(data.values())
        # Cette ligne permet d'utiliser la fonction map pour formatter les donnees efficacement
        formatted = list(map(self.format_chart_data, keys, values))
        # On inverse l'ordre de la liste, car le graphique veut les dates en ordre croissant
        formatted = formatted[::-1]
        return Response(data=json.dumps({"info": company_data, "chart_data": formatted}))

