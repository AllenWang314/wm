from django.shortcuts import render
from .models import event, times
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from .serializers import DatabaseSerializer, SlugSerializer, TimesSerializer
from rest_framework.parsers import JSONParser
from django.utils.crypto import get_random_string

def unique_slug_gen():
	found_unique = False
	current_slugs = event.objects.values_list('slug', flat=True)
	while found_unique == False:
		slug_guess = get_random_string(8,'0123456789ABCDEFGHIJKLMNOPQRSTUVWSYZabcdefghijklmnopqstuvwxyz')
		if slug_guess not in current_slugs:	
			return(slug_guess) 
			
@api_view(['GET', 'POST'])
def all_events(request, format = None):
	items = event.objects.all()
	if request.method == "GET":
		serializer = DatabaseSerializer(items, many=True)
		return Response(serializer.data)
	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def all_times(request, format = None):
	items = times.objects.all()
	if request.method == "GET":
		serializer = TimesSerializer(items, many=True)
		return Response(serializer.data)
	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', 'PUT'])
def event_info(request, page_slug, format = None):
	try:
		items = event.objects.filter(slug = page_slug)
	except event.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)
	if request.method == "GET":
		serializer = DatabaseSerializer(items, many=True)
		return Response(serializer.data)
	elif request.method == 'POST' or request.method == 'PUT':
		serializer = DatabaseSerializer(items.first(), data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', 'PUT'])
def times_info(request, pkey, format = None):
	try:
		item = times.objects.get(pk = pkey) # take advantage of primary key here
	except times.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)
	if request.method == "GET":
		serializer = TimesSerializer(item, many=False)
		return Response(serializer.data)
	elif request.method == 'POST' or request.method == 'PUT':
		serializer = TimesSerializer(item, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		print(serializer.errors)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def post_event(request, format = None):
	if request.method == 'POST':
		serializer = DatabaseSerializer(event(), data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		print(serializer.errors)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def post_time(request, format = None):
	if request.method == 'POST':
		serializer = TimesSerializer(times(), data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		print(serializer.errors)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_slug(request, format = None):
	if request.method == 'GET':
		field = [{'slug': unique_slug_gen()}]
		serializer = SlugSerializer(field)
		return Response(field)
	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)