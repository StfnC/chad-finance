from djoser.serializers import UserCreateSerializer
from .models import UserAccount


class UserCreateSerializer(UserCreateSerializer):
    """
    Serializer des utilisateurs
    """
    class Meta(UserCreateSerializer.Meta):
        model = UserAccount
        fields = ("id", "email", "first_name", "last_name", "password")
