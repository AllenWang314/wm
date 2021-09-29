from rest_framework import serializers
from .models import event, times, passwords

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
    name_array = serializers.ListField(child=serializers.CharField(), required=False)
    class Meta:
        model = event
        fields = '__all__'

class SlugSerializer(serializers.Serializer):
    slug = serializers.SlugField(max_length=15)

class TimesSerializer(serializers.Serializer):
    snd_hash = serializers.CharField(max_length = 150, required=True, allow_blank=False) # hash only slug and name
    times_array = serializers.ListField(child=serializers.IntegerField())     
    
    def update(self, instance, validated_data):
        instance.snd_hash = validated_data.get('snd_hash', instance.snd_hash)
        instance.times_array = validated_data.get('times_array', instance.times_array)
        instance.save()
        return instance

    class Meta:
        model = times
        fields = '__all__'   

class PasswordSerializer(serializers.Serializer):
    snd_hash = serializers.CharField(max_length = 150, required=True, allow_blank=False) # hash only slug and name
    password = serializers.CharField(max_length=100, required=False)

    def update(self, instance, validated_data):
        instance.snd_hash = validated_data.get('snd_hash', instance.snd_hash)
        instance.password = validated_data.get('password', instance.password)
        instance.save()
        return instance

    class Meta:
        model = passwords
        fields = '__all__'   