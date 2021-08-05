from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.views import APIView
from .serializers import GroceriesSerializer, CreateGroceriesSerializer
from .models import Groceries

class GroceriesView(generics.CreateAPIView):
    queryset = Groceries.objects.all()
    serializer_class = GroceriesSerializer
