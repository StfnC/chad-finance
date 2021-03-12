from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import UserAccountManager


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


class Portfolio(models.Model):
    owner = models.OneToOneField(to="UserAccount", on_delete=models.CASCADE)
    creation_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Portfolio of {self.owner}"


class Trade(models.Model):
    portfolio = models.ForeignKey(to="Portfolio", on_delete=models.CASCADE)
    symbol = models.CharField(max_length=5, blank=False)
    buy_price = models.DecimalField(max_digits=25, decimal_places=4)
    buy_date = models.DateTimeField(auto_now_add=True)
    quantity = models.DecimalField(max_digits=50, decimal_places=2, blank=False)

    def __str__(self):
        return f"Symbol: {self.symbol} from {self.portfolio}"
