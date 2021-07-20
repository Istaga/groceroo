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
    length=6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Groceries.objects.filter(code=code).count() == 0:
            break

    return code


class Item(models.Model):
    name        = models.CharField(max_length=80)
    quantity    = models.FloatField(default=1)
    units       = models.CharField(max_length=30)

    # How to ask for bottles, boxes, etc?
    # I can't make enums work so I'm just gonna be lazy
    # class Unit(models.TextChoices):
    #     MILLILITERS = 'mL', _('milliliters'),
    #     LITERS = 'L', _('liters'),
    #     GRAMS = 'g', _('grams'),
    #     KILOGRAMS = 'kg', _('kilograms'),
    #     OUNCES = 'oz', _('ounces'),
    #     POUNDS = 'lbs', _('pounds'),
    #     NONE = '', _(''),

    # units = models.CharField(
    #     max_length=20,
    #     choices=Unit.choices,
    #     default=Unit.NONE
    # )


class Groceries(models.Model):
    title = models.CharField(max_length=80, default="Our Grocery List")
    code = models.CharField(max_length=8, default="", unique=True)

