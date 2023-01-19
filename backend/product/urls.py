from django.urls import path
from product import views

urlpatterns=[
    path('category', views.product_category),
    path('', views.product_list)
    
]