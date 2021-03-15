from django.contrib import admin
from django.urls import path, include
from .views import PortfolioCreateAPIView, PortfolioRetrieveAPIView, TradeCreateAPIView, TradeListAPIView, TradeRetrieveAPIView

urlpatterns = [

    # portfolio views

    path('portfolio/<int:pk>', PortfolioRetrieveAPIView.as_view()),
    path('portfolio/', PortfolioCreateAPIView.as_view()),

    # trade views

    path('trade/<int:pk>', TradeRetrieveAPIView.as_view()),
    path('trade/', TradeCreateAPIView.as_view()),
    path('trade/all', TradeListAPIView.as_view()),
]

# quand un l'utilisateur est dirige vers un url la 'view' appropriee est appelee automatiquement