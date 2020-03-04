from django.db import models

# Create your models here.
class event(models.Model):
    event_name = models.CharField(max_length=100)
    creator = models.CharField(max_length=100)
    location = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)