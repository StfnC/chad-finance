from django.urls import path
from .views import PortfolioAPIView, PortfolioRetrieveAPIView, TradeCreateAPIView, TradeListAPIView, TradeRetrieveAPIView, DeleteAccountView

urlpatterns = [
    # Portfolio urls
    path('portfolio/', PortfolioAPIView.as_view()),

    # Trade urls

    path('trade/<int:pk>', TradeRetrieveAPIView.as_view()),
    path('trade/', TradeCreateAPIView.as_view()),
    path('trade/all', TradeListAPIView.as_view()),

    # User urls
    path('user/delete', DeleteAccountView.as_view()),
]
