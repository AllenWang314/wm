from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('api/get_slug', views.get_slug),
    path('api/post/', views.post_event),
    path('api/', views.all_events),
    path('api/<page_slug>', views.event_info),
]
urlpatterns = format_suffix_patterns(urlpatterns)