from django.urls import path
from .views import GroceriesView
from graphene_django.views import GraphQLView
from grocery.schema import schema

urlpatterns = [
    path('', GroceriesView.as_view()),
    path('gql', GraphQLView.as_view(graphiql=True, schema=schema))
]
