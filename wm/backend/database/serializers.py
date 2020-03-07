from rest_framework import serializers
from .models import event

class DatabaseSerializer(serializers.ModelSerializer):
    event_name = serializers.CharField(max_length=100, required=False)
    creator = serializers.CharField(max_length=100, required=False)
    timezone = serializers.CharField(max_length=100, required=False)
    earliest = serializers.CharField(max_length=100, required=False)
    latest = serializers.CharField(max_length=100, required=False)
    repeating = serializers.BooleanField(required=False)
    location = serializers.CharField(max_length=300, required=False)
    slug = serializers.SlugField(max_length=15, required=False)
    class Meta:
        model = event
        fields = '__all__'