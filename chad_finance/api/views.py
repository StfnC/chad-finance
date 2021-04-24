import json

from .models import UserAccount, Portfolio, Trade
from .serializers import PortfolioSerializer, TradeSerializerComplete
from .permissions import IsFromUser
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from alpha_vantage.timeseries import TimeSeries
from alpha_vantage.fundamentaldata import FundamentalData
from django.conf import settings
from django.core.exceptions import ValidationError
from decimal import Decimal

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
    serializer_class = TradeSerializerComplete


class TradeCreateAPIView(APIView):
    """
    Vue qui permet de creer un trade
    """

    def post(self, request):
        """
        Cree un Trade pour un utilisateur
        """
        # TODO: Ajouter validation pour s'assurer que l'utilisateur peut faire la transaction
        response_data = {"message": ""}
        trade_data = request.data
        user_portfolio = request.user.portfolio
        # On recupere le prix actuel de l'action
        symbol_info, meta = ts.get_quote_endpoint(symbol=trade_data["symbol"])
        buy_price = float(symbol_info["05. price"])

        try:
            # On cree un nouveau Trade avec l'information recue
            trade = Trade(portfolio=user_portfolio,
                          buy_price=buy_price, **trade_data)
            trade.save()
            # On deduit le montant de l'achat a la quantite de fonds disponibles
            self.deduce_trade_amount(
                user_portfolio, buy_price, float(trade_data["quantity"]))
            response_data["message"] = "Transaction effectuee avec succes"
        except ValidationError as ve:
            # On renvoie un message d'erreur dans la reponse
            response_data["message"] = "Erreur durant la transaction"
        finally:
            return Response(data=response_data)

    def deduce_trade_amount(self, portfolio, buy_price, quantity):
        """
        Deduit le montant de la transaction de la quantite de fonds disponible pour faire des transactions
        """
        # Il faut cast le montant en Decimal pour avoir le meme type de donnees que dans la base de donnees
        trade_amount = Decimal(buy_price * quantity)
        portfolio.current_amount -= trade_amount
        portfolio.save()


class TradeListAPIView(generics.ListAPIView):
    """
    Vue qui permet de recuperer les trades
    """
    permission_classes = (IsFromUser,)
    serializer_class = TradeSerializerComplete

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
        Retourner les actions associees au symbole recherche sous forme de liste
        """
        results = {}
        try:
            keywords = request.data["keywords"]
            data, meta = ts.get_symbol_search(keywords=keywords)
            # Un bug dans le package alpha_vantage fait en sorte qu'on ne recoit pas les donnees en format json
            # Il faut passer d'un pandas DataFrame a JSON
            parsed = json.loads(data.to_json(orient="index"))
            results = list(parsed.values())
        except ValueError as ve:
            results = [{"message": "Une erreur est survenue"}]
        return Response(data=json.dumps(results))


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
        chart_data = self.get_chart_data(symbol)
        company_data = self.get_company_info(symbol)
        return Response(data=json.dumps({"info": company_data, "chart_data": chart_data}))

    def get_chart_data(self, symbol):
        """
        Retourne l'information financiere sur un symbole
        """
        data = dict()
        try:
            data, meta = ts.get_daily_adjusted(symbol=symbol)
            keys = list(data.keys())
            values = list(data.values())
            # Cette ligne permet d'utiliser la fonction map pour formatter les donnees efficacement
            formatted = list(map(self.format_chart_data, keys, values))
            # On inverse l'ordre de la liste, car le graphique veut les dates en ordre croissant
            data = formatted[::-1]
        except ValueError as ve:
            # Cette erreur survient lorsque le symbole recherche ne renvoie aucun resultat
            data = {"message": "Aucune donnee financiere sur ce symbole"}

        return data

    def get_company_info(self, company):
        """
        Retourne l'information liee a une compagnie
        """
        data = dict()
        try:
            data = fd.get_company_overview(symbol=company)
        except ValueError as ve:
            # Cette erreur survient lorsque le symbole recherche ne renvoie aucun resultat
            data = {"message": "Aucune information disponible sur ce symbole"}

        return data
