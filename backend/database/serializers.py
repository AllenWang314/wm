from rest_framework import serializers
from .models import event, times

class DatabaseSerializer(serializers.ModelSerializer):
    event_name = serializers.CharField(max_length=100, required=False)
    creator = serializers.CharField(max_length=100, required=False, allow_blank=True)
    timezone = serializers.CharField(max_length=100, required=False, allow_blank=True)
    earliest = serializers.CharField(max_length=100, required=False, allow_blank=True)
    latest = serializers.CharField(max_length=100, required=False, allow_blank=True)
    repeating = serializers.BooleanField(required=False)
    location = serializers.CharField(max_length=300, required=False, allow_blank=True)
    slug = serializers.SlugField(max_length=15, required=False)
    date_array = serializers.ListField(child=serializers.IntegerField(), required=False)
    day_array = serializers.ListField(child=serializers.CharField(), required=False)
    name_array = serializers.ListField(child=serializers.CharField(), required=False)
    class Meta:
        model = event
        fields = '__all__'

class SlugSerializer(serializers.Serializer):
    slug = serializers.SlugField(max_length=15)

class TimesSerializer(serializers.Serializer):
    snd_hash = serializers.CharField(max_length = 150, required=True, allow_blank=False) # hash only slug and name
    times_array = serializers.ListField(child=serializers.IntegerField())