from django.shortcuts import render
from rest_framework import generics
from .serializers import GroceriesSerializer
from .models import Groceries

class GroceriesView(generics.CreateAPIView):
    queryset = Groceries.objects.all()
    serializer_class = GroceriesSerializer