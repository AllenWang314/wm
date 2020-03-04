from django.shortcuts import render
from .models import event
from .serializers import DatabaseSerializer
from rest_framework import generics

# Create your views here.

class DatabaseListView(generics.ListCreateAPIView):
    queryset = event.objects.all()
    serializer_class = DatabaseSerializer