# Generated by Django 3.0.4 on 2020-04-04 05:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0018_auto_20200404_0251'),
    ]

    operations = [
        migrations.AlterField(
            model_name='passwords',
            name='password',
            field=models.CharField(max_length=100),
        ),
    ]