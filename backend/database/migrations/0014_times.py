# Generated by Django 3.0.4 on 2020-03-22 18:25

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0013_event_name_array'),
    ]

    operations = [
        migrations.CreateModel(
            name='times',
            fields=[
                ('snd_hash', models.CharField(max_length=150, primary_key=True, serialize=False)),
                ('times_array', django.contrib.postgres.fields.ArrayField(base_field=models.BigIntegerField(), size=50)),
            ],
        ),
    ]
