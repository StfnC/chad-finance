from django.contrib.auth.models import BaseUserManager


class UserAccountManager(BaseUserManager):
    """
    Manager des utilisateurs
    """
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            **kwargs
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **kwargs):
        user = self.create_user(
            email,
            password=password,
            is_superuser=True,
            **kwargs
        )

        user.is_active = True
        user.is_email_verified = True
        user.save(using=self._db)
        return user
