# Generated by Django 3.2.5 on 2021-08-18 20:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('grocery', '0007_item_details'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='units',
            field=models.CharField(default='', max_length=30),
        ),
    ]