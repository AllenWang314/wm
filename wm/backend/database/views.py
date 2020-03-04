from django.shortcuts import render
from .models import event
from .serializers import DatabaseSerializer
from rest_framework import generics

class DatabaseListView(generics.ListAPIView):
	serializer_class = DatabaseSerializer
	def get_queryset(self):
		page_slug = self.kwargs['slug']
		return event.objects.filter(slug = page_slug)

class DatabaseListViewAll(generics.ListCreateAPIView):
    queryset = event.objects.all()
    serializer_class = DatabaseSerializer