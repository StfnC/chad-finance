from django.contrib import admin
from django.urls import path, include
from .views import DeleteViewAccount

urlpatterns = [
    path('')
    path('delete', DeleteViewAccount.as_view()),   
]
