from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    list_display=("id", "username", "first_name","is_employee", )

# Register your models here.
admin.site.register(User, CustomUserAdmin,)
