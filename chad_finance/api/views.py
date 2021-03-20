from .models import UserAccount, Portfolio, Trade
from .serializers import PortfolioSerializer, TradeSerializer
from .permissions import IsFromUser
from rest_framework import generics
from rest_framework.response import Response


# portfolio views

class PortfolioRetrieveAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
    Vue qui permet de récuperer l'information sur un portfolio
    """
    permission_classes = (IsFromUser,)
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer


class PortfolioCreateAPIView(generics.CreateAPIView):
    """
    Vue qui permet de creer un portfolio
    """
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

    def get(self, request):
        """
        Cette methode renvoie le portfolio de l'utilisateur quand une requete GET est faite
        """
        portfolio = PortfolioSerializer(
            Portfolio.objects.get(owner=request.user)).data
        return Response(portfolio)

# trade views


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
