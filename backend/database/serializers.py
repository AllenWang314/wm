from rest_framework import serializers
from .models import event

class DatabaseSerializer(serializers.ModelSerializer):
    event_name = serializers.CharField(max_length=100, required=False)
    creator = serializers.CharField(max_length=100, required=False, allow_blank=True)
    timezone = serializers.CharField(max_length=100, required=False, allow_blank=True)
    earliest = serializers.CharField(max_length=100, required=False, allow_blank=True)
    latest = serializers.CharField(max_length=100, required=False, allow_blank=True)
    repeating = serializers.BooleanField(required=False)
    location = serializers.CharField(max_length=300, required=False, allow_blank=True)
    slug = serializers.SlugField(max_length=15, required=False)
    date_list = serializers.CharField(max_length=400)
    class Meta:
        model = event
        fields = '__all__'

class SlugSerializer(serializers.Serializer):
    slug = serializers.SlugField(max_length=15)