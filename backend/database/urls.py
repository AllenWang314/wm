from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('api/get_slug', views.get_slug),
    path('api/post/', views.post_event),
    path('api/post-times/', views.post_time),
    path('api/', views.all_events),
    path('api/times', views.all_times),
    path('api/availabilities/<pkey>', views.get_availabilities),
    path('api/passwords', views.all_passwords),
    path('api/post-password/', views.post_password),
    path('api/password/<pkey>', views.get_password),
    path('api/times/<pkey>', views.times_info),
    path('api/<page_slug>', views.event_info),
]
urlpatterns = format_suffix_patterns(urlpatterns)