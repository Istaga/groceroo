# Generated by Django 3.2.5 on 2021-07-20 20:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('grocery', '0003_alter_item_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='units',
            field=models.CharField(max_length=30),
        ),
    ]