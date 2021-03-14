from .models import UserAccount, Portfolio, Trade
from .serializers import PortfolioSerializer, TradeSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from django.shortcuts import render

# portfolio views 

class PortfolioRetrieveAPIView(generics.RetrieveAPIView):
	queryset = Portfolio.objects.all()
	serializer_class = PortfolioSerializer


class PorfolioListAPIView(generics.ListAPIView):
	queryset = Portfolio.objects.all()
	serializer_class = PortfolioSerializer


class PortfolioListCreate(generics.ListCreateAPIView):
   queryset = Portfolio.objects.all()
	serializer_class = PortfolioSerializer


# trade views

class TradeRetrieveAPIView(generics.RetrieveAPIView):
	queryset = Trade.objects.all()
	serializer_class = TradeSerializer


class TradeListAPIView(generics.ListAPIView):
	queryset = Trade.objects.all()
	serializer_class = TradeSerializer


class TradeListCreate(generics.ListCreateAPIView):
  queryset = Trade.objects.all()
	serializer_class = TradeSerializer
