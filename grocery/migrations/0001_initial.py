# Generated by Django 3.2.5 on 2021-07-19 19:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Groceries',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=80)),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80, unique=True)),
                ('quantity', models.FloatField(default=1)),
                ('units', models.CharField(choices=[('mL', 'milliliters'), ('L', 'liters'), ('g', 'grams'), ('kg', 'kilograms'), ('oz', 'ounces'), ('lbs', 'pounds'), ('', '')], default='', max_length=20)),
            ],
        ),
    ]
