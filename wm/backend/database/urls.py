from django.urls import path
from . import views

urlpatterns = [
    path('api/', views.DatabaseListViewAll.as_view() ),
    path('api/<slug>', views.DatabaseListView.as_view() ),
]