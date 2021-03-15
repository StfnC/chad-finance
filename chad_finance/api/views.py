from .models import UserAccount, Portfolio, Trade
from .serializers import PortfolioSerializer, TradeSerializer
from rest_framework import generics
from rest_framework.response import Response 
from django.contrib.auth.models import User
from django.shortcuts import render


# portfolio views


class PortfolioRetrieveAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
	Vue qui permet de récuperer l'information sur un portfolio
	"""
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer


class PortfolioCreateAPIView(generics.CreateAPIView):
    """
    Vue qui permet de creer un portfolio
    """
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer


# trade views

class TradeRetrieveAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
	Vue qui permet de recuperer l'information sur un trade
	"""
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
    queryset = Trade.objects.all()
    serializer_class = TradeSerializer


class DeleteAccountView(generics.DestroyAPIView):
    """
    Vue qui permet de supprimer l'entirerte du compte personnel
    """

    queryset = UserAccount.objects.all()

    def delete(self, request):
        # TODO: Donner une autre réponse peut-être
        UserAccount.objects.get(pk=request.user.pk).delete()
        return Response({"user" : "User has been deleted"})
