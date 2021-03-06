from django import forms
from django.contrib.auth import password_validation
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from .models import UserAccount


class UserAccountCreationForm(UserCreationForm):
    """
    Formulaire pour créer des utilisateurs
    """

    password1 = forms.CharField(
        label="Mot de passe",
        widget=forms.PasswordInput(),
        help_text=password_validation.password_validators_help_text_html(),
    )
    password2 = forms.CharField(
        label="Confirmez votre mot de passe",
        widget=forms.PasswordInput(),
        help_text="Entrez votre mot de passe une autre fois"
    )

    class Meta:
        model = UserAccount

        fields = (
            "email",
            "first_name",
            "last_name"
        )

    def clean_password2(self):
        # Validate the passwords match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")

        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Le mot de passe n'est pas le même")
        return password2

    def save(self, commit=True):
        # Save the user in the database
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()

        return user


class UserAccountChangeForm(UserChangeForm):
    """
    Formulaire pour modifier un utilisateur
    """

    password = ReadOnlyPasswordHashField()

    class Meta:
        model = UserAccount
        fields = ("email", "password",)

    def clean_password(self):
        return self.initial["password"]
