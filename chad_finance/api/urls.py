from django.contrib import admin
from django.urls import path, include
from .views import PortfolioCreateAPIView, PortfolioRetrieveAPIView, TradeCreateAPIView, TradeListAPIView, TradeRetrieveAPIView, DeleteAccountView

urlpatterns = [

    # portfolio views

    path('portfolio/<int:pk>', PortfolioRetrieveAPIView.as_view()),
    path('portfolio/', PortfolioCreateAPIView.as_view()),

    # trade views

    path('trade/<int:pk>', TradeRetrieveAPIView.as_view()),
    path('trade/', TradeCreateAPIView.as_view()),
    path('trade/all', TradeListAPIView.as_view()),
    path('user/delete', DeleteAccountView.as_view()),
]
