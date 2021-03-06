from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import UserAccount
from .forms import UserAccountCreationForm, UserAccountChangeForm


# Register your models here.

admin.site.site_header = "Chad Finance"
admin.site.site_title = "Chad Finance"
admin.site.index_title = "Chad Finance"

class UserAdmin(BaseUserAdmin):
    # Forms to add and change user instances
    form = UserAccountChangeForm
    add_form = UserAccountCreationForm

    list_display = ("email", "first_name", "last_name", "is_active")
    list_filter = ("is_active", "is_staff")

    fieldsets = (
        ("Information de connexion", {"fields": ("email", "password")}),
        ("Informations personnelles", {"fields": ("first_name", "last_name")}),
        ("Autres", {"fields": ("is_active", "is_staff")}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "password1", "password2", "is_active", "is_staff")
        }),
    )

    search_fields = ("email", "first_name", "last_name", "is_active")
    ordering = ("email", "first_name", "last_name")
    filter_horizontal = ()

admin.site.register(UserAccount, UserAdmin)