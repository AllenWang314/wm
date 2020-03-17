from django.db import models

# Create your models here.
class event(models.Model):
    event_name = models.CharField(max_length=100)
    creator = models.CharField(max_length=100)
    timezone = models.CharField(max_length=100)
    earliest = models.CharField(max_length=100)
    latest = models.CharField(max_length=100)
    repeating = models.BooleanField()
    location = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(max_length=15)
    date_list = models.CharField(max_length=400)