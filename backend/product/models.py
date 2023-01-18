from django.db import models
from authentication.models import User

class Category(models.Model):
    name=models.CharField(max_length=50)

class Product(models.Model):
    name =models.CharField(max_length=255)
    description=models.CharField(max_length=255)
    price=models.DecimalField(max_digits=5, decimal_places=2)
    category=models.ForeignKey(Category, on_delete=models.PROTECT)




