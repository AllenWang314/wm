# Generated by Django 3.0.4 on 2020-04-04 20:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0019_auto_20200404_0554'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='day_array',
        ),
    ]