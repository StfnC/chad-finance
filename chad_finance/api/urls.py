from django.urls import path
from .views import PortfolioCreateAPIView, PortfolioRetrieveAPIView, TradeCreateAPIView, TradeListAPIView, TradeRetrieveAPIView, DeleteAccountView

urlpatterns = [

    # Portfolio urls

    path('portfolio/<int:pk>', PortfolioRetrieveAPIView.as_view()),
    path('portfolio/', PortfolioCreateAPIView.as_view()),

    # Trade urls

    path('trade/<int:pk>', TradeRetrieveAPIView.as_view()),
    path('trade/', TradeCreateAPIView.as_view()),
    path('trade/all', TradeListAPIView.as_view()),

    # User urls
    path('user/delete', DeleteAccountView.as_view()),
]
