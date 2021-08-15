from django.db import models
from django.db.models.constraints import UniqueConstraint
from django.utils.translation import gettext_lazy as _
import string
import random

# Groceries is a list of items
# Groceries are connected to users
# One Groceries list can be connected with many users
# Groceries list is a list of items

# todo extra: extend groceries so that a user can have a list of items they want to add every time


def generate_unique_code():
    length=8

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Groceries.objects.filter(code=code).count() == 0:
            break

    return code


class Groceries(models.Model):
    min_length_code = 8
    title = models.CharField(max_length=80, default="Our Grocery List")
    code = models.CharField(max_length=min_length_code, default=generate_unique_code, unique=True)


class Item(models.Model):
    name        = models.CharField(max_length=80)
    quantity    = models.FloatField(default=1)
    units       = models.CharField(max_length=30)
    list        = models.ForeignKey(Groceries, on_delete=models.CASCADE, default=Groceries.objects.all().first().pk)


