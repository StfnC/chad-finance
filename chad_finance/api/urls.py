from django.urls import path
from .views import PortfolioAPIView, TradeCreateAPIView, TradeListAPIView, TradeRetrieveAPIView, DeleteAccountView, PortfolioChartDataView, SearchSymbolView

urlpatterns = [
    # Portfolio urls
    path('portfolio/', PortfolioAPIView.as_view()),
    path('portfolio/data/', PortfolioChartDataView.as_view()),

    # Trade urls
    path('trade/<int:pk>/', TradeRetrieveAPIView.as_view()),
    path('trade/', TradeCreateAPIView.as_view()),
    path('trade/all/', TradeListAPIView.as_view()),

    # User urls
    path('user/delete/', DeleteAccountView.as_view()),

    # Autres
    path('search/', SearchSymbolView.as_view()),
]
