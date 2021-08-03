from django.urls import path
from .views import GroceriesView
from graphene_django.views import GraphQLView
from grocery.schema import schema
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('', GroceriesView.as_view()),
    path('gql', csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema)))
]
