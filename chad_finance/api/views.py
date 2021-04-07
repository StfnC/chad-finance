import json
from .models import UserAccount, Portfolio, Trade
from .serializers import PortfolioSerializer, TradeSerializer
from .permissions import IsFromUser
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from alpha_vantage.timeseries import TimeSeries
from django.conf import settings

# Objet TimeSeries qui permet de faire des requetes a l'api TimeSeries de Alpha Vantage
ts = TimeSeries(key=str(settings.ALPHA_VANTAGE_KEY))

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
        print(request.data)
        keywords = request.data["keywords"]
        print(keywords + "***************************************************")
        data, meta = ts.get_symbol_search(keywords = keywords)
        
        # Un bug dans le package alpha_vantage fait en sorte qu'on ne recoit pas les donnees en format json
        # Il faut passer d'un pandas DataFrame a JSON
        parsed = json.loads(data.to_json(orient="index"))
        formatted = list(parsed.values())
        
        return Response(data=json.dumps(formatted))