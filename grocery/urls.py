from django.urls import path
from .views import GroceriesView

urlpatterns = [
    path('', GroceriesView.as_view())
]
