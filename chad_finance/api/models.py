import datetime

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import UserAccountManager
from django.conf import settings
from alpha_vantage.timeseries import TimeSeries


def get_data_from_date_window(data, start_date):
    """
    Nettoie un dictionnaire pour obtenir seulement les donnees a partir d'une certaine date

    Args:
        data (dict): Dictionnaire contenant les donnees provenant de l'api
        start_date (string): Date de debut

    Returns:
        dict: Dictionnaire qui contient les valeurs de la periode voulue
    """
    # TODO: Handle les cas lorsque le end_date n'est pas dans les donnees
    # Liste ordonnees des dates contenues dans les donnees
    key_list = list(data.keys())
    end_date_index = 0
    start_date_index = key_list.index(start_date)

    # On recupere les dates qui se trouvent entre les deux dates
    sub_keys = [key_list[x]
                for x in range(end_date_index, start_date_index + 1)]

    # On construit un nouveau dictionnaire avec les dates qui nous interessent
    data_range = {key: data[key] for key in sub_keys}

    return data_range


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

    def create_portfolio(self):
        """
        Cree le portfolio de l'utilisateur
        """
        portfolio = Portfolio(owner=self)
        portfolio.save()
        return portfolio


class Trade(models.Model):
    portfolio = models.ForeignKey(to="Portfolio", on_delete=models.CASCADE)
    symbol = models.CharField(max_length=5, blank=False)
    buy_price = models.DecimalField(max_digits=25, decimal_places=4)
    buy_date = models.DateTimeField(auto_now_add=True)
    quantity = models.DecimalField(
        max_digits=50, decimal_places=2, blank=False)

    def get_daily_price(self):
        """
        Retourner la valeur du trade a chaque jour entre le moment de son achat et la journee la plus recente disponible
        """
        API_KEY = str(settings.ALPHA_VANTAGE_KEY)
        ts = TimeSeries(key=API_KEY)
        data, metadata = ts.get_daily_adjusted(
            symbol=self.symbol, outputsize="compact")
        try:
            data = get_data_from_date_window(data, str(self.buy_date.date()))
        except ValueError as ve:
            # Cette erreur survient lorsqu'on essaie d'obtenir la valeur d'une action achetee le jour meme
            # On renvoie alors les donnees au moment de l'achat
            data = {str(self.buy_date.date()): {"4. close": self.buy_price}}
        return data

    def __str__(self):
        return f"Symbol: {self.symbol} from {self.portfolio}"


class Portfolio(models.Model):
    DEFAULT_AMOUNT = 200000

    owner = models.OneToOneField(to="UserAccount", on_delete=models.CASCADE)
    creation_date = models.DateField(auto_now_add=True)
    starting_amount = models.DecimalField(
        max_digits=9, decimal_places=2, default=DEFAULT_AMOUNT)
    current_amount = models.DecimalField(
        max_digits=9, decimal_places=2, default=DEFAULT_AMOUNT)

    def calculate_total_value(self):
        trades = self.trade_set.all()
        total_value = 0.0
        for trade in trades:
            # prendre la première value dans le json de données
            data = list(trade.get_daily_price().values())[0]
            total_value = total_value + \
                float(data['4. close']) * \
                float(trade.quantity)
        return total_value

    def get_portfolio_data_daily(self):
        """
        Retourne un dictionnaire qui contient les donnees necessaires pour construire un graphique de la valeur du portfolio en fonction du temps
        """
        # On cree une liste de journees entre aujourd'hui et le moment de la creation du portfolio
        dates = [self.creation_date + datetime.timedelta(n) for n in range(
            int((datetime.date.today() - self.creation_date).days) + 1)]
        # On cree un dictionnaire ayant pour cle les dates et qui ont comme valeur initiale zero
        values = {str(date): 0 for date in dates}

        for trade in self.trade_set.all():
            # On recupere les donnees de chaque trade
            data = trade.get_daily_price()
            for date in data:
                # On ajoute la valeur du trade a chaque jour
                values[date] += float(data[date]['4. close']) * \
                    float(trade.quantity)

        # TODO: Arrondir les montants
        # On enleve les journees ou la valeur du portfolio est zero
        for key, value in list(values.items()):
            if value == 0:
                del values[key]

        return values

    def modify_amount(self, new_value):
        self.current_amount = new_value

    def __str__(self):
        return f"Portfolio of {self.owner}"
