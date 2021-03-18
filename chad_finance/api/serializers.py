from djoser.serializers import UserCreateSerializer
from .models import UserAccount, Portfolio, Trade
from rest_framework import serializers
from django.contrib.auth.models import User

class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        # fields = ('owner', 'creation_date') more to come
        fields = '__all__'

class TradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trade
        # fields = ('portfolio', 'symbol', 'buy_price', 'buy_date', 'quantity')
        fields = '__all__'

class UserCreateSerializer(UserCreateSerializer):
    """
    Serializer des utilisateurs
    """
    class Meta(UserCreateSerializer.Meta):
        model = UserAccount
        fields = ("id", "email", "first_name", "last_name", "password")
