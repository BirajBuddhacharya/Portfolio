from django.urls import path, include 
from .views import connect

urlpatterns = [
    path("connect/", connect.as_view(), name= 'connect')
]
