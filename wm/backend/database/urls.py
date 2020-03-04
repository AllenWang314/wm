from django.urls import path
from . import views

urlpatterns = [
    path('api/', views.DatabaseListView.as_view() ),
]