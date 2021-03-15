from django.contrib import admin
from django.urls import path, include

urlpatterns = [

    # portfolio views

    path('portfolio/<int:pk>', views.PortfolioRetrieveUpdateDestroyAPIView.as_view()),
    path('portfolio/', views.PortfolioCreateAPIView.as_view()),

    # trade views 

    path('trade/<int:pk>', views.TradeRetrieveUpdateDestroyAPIView.as_view()),
    path('trade/', views.TradeCreateAPIView.as_view())
    path('trade/all', views.TradeListAPIView.as_view())
]
