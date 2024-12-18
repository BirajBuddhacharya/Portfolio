from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ConnectSerializer
from .models import Connect

# Create your views here.
class connect(APIView):
    def get(self, request):
        connects = Connect.objects.all()
        serializer = ConnectSerializer(connects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request): 
        serializer = ConnectSerializer(data=request.data)
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)