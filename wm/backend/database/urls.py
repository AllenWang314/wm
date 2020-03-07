from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('api/<page_slug>/', views.event_info),
    path('api/', views.all_events),
    path('api/post', views.post_event),
]
urlpatterns = format_suffix_patterns(urlpatterns)