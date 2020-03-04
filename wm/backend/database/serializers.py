from rest_framework import serializers
from .models import event

class DatabaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = event
        fields = ('event_name', 'creator', 'location', 'created_at')