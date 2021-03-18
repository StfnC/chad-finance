from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import UserAccountManager
from django.conf import settings
from datetime import date
from alpha_vantage.timeseries import TimeSeries


class UserAccount(AbstractBaseUser, PermissionsMixin):
    """
    Model des utilisateurs
    """
    # TODO: Rendre le primary key en UUID
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def __str__(self):
        return self.email


class Trade(models.Model):
    portfolio = models.ForeignKey(to="Portfolio", on_delete=models.CASCADE)
    symbol = models.CharField(max_length=5, blank=False)
    buy_price = models.DecimalField(max_digits=25, decimal_places=4)
    buy_date = models.DateTimeField(auto_now_add=True)
    quantity = models.DecimalField(max_digits=50, decimal_places=2, blank=False)

    def get_daily_price(self):
        API_KEY = str(settings.ALPHA_VANTAGE_KEY)
        ts = TimeSeries(key=API_KEY)
        data, metadata = ts.get_daily_adjusted(symbol=self.symbol, outputsize="compact")
        return data

    def __str__(self):
        return f"Symbol: {self.symbol} from {self.portfolio}"


class Portfolio(models.Model):
    DEFAULT_AMOUNT = 200000

    owner = models.OneToOneField(to="UserAccount", on_delete=models.CASCADE)
    creation_date = models.DateField(auto_now_add=True)
    starting_amount = models.DecimalField(max_digits=9, decimal_places=2, default=DEFAULT_AMOUNT)
    current_amount = models.DecimalField(max_digits=9, decimal_places=2, default=DEFAULT_AMOUNT)

    def calculate_total_value(self):
        trades = self.trade_set.all()
        total_value = 0.0
        for trade in trades:
            data = trade.get_daily_price()
            total_value = total_value + float(data[str(date.today())]['4. close']) * float(trade.quantity)
        return total_value

    def modify_amount(self, new_value):
        self.current_amount = new_value

    def __str__(self):
        return f"Portfolio of {self.owner}"
