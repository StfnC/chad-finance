from djoser.serializers import UserCreateSerializer
from .models import UserAccount, Portfolio, Trade
from rest_framework import serializers
from django.contrib.auth.models import User

class PortfolioSerializer(serializers.ModelSerializer):
    value = serializers.SerializerMethodField()
    
    #rajout de la valeur totale du portfolio dans le serializer
    def get_value(self, portfolio):
        return portfolio.calculate_total_value()  

    class Meta:
        model = Portfolio
        fields = ('owner', 'creation_date','starting_amount', 'current_amount', 'value')
       

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
