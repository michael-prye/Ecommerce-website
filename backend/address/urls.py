from django import path
from address import views

urlpatterns= [
    path('', views.get_address)
]