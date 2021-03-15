from .models import UserAccount, Portfolio, Trade
from .serializers import PortfolioSerializer, TradeSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from django.shortcuts import render

# portfolio views 

class PortfolioRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):   
	queryset = Portfolio.objects.all()
	serializer_class = PortfolioSerializer


class PortfolioCreateAPIView(generics.CreateAPIView):    
	queryset = Portfolio.objects.all()
	serializer_class = PortfolioSerializer


# trade views

class TradeRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView): 
	queryset = Trade.objects.all()
	serializer_class = TradeSerializer


class TradeCreateAPIView(generics.CreateAPIView):      
	queryset = Trade.objects.all()
	serializer_class = TradeSerializer


class TradeListAPIView(generics.ListAPIView):
	queryset = Trade.objects.all()
	serializer_class = TradeSerializer
