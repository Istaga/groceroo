import graphene
from graphene_django import DjangoObjectType, DjangoListField
from .models import Groceries, Item

class GroceriesType(DjangoObjectType):

    class Meta:
        model = Groceries
        fields = ("id", "title", "code")

class ItemType(DjangoObjectType):

    class Meta:
        model = Item
        fields = ("id", "name", "quantity", "units")


class Query(graphene.ObjectType):
    all_groceries = DjangoListField(GroceriesType)
    pacific_room = graphene.Field(GroceriesType, code=graphene.String())
    all_items = DjangoListField(ItemType)

    def resolve_all_groceries(root, info):
        return Groceries.objects.all()

    def resolve_pacific_room(root, info, code):
        return Groceries.objects.get(code=code)
    
    def resolve_all_groceries(root, info):
        return Groceries.objects.all()

    def resolve_all_items(root, info):
        return Item.objects.all()





class ItemCreation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        quantity = graphene.Float(required=True)
        units = graphene.String(required=True)

    item = graphene.Field(ItemType)

    @classmethod
    def mutate(cls, root, info, name, quantity, units):
        item = Item.objects.create(name=name, quantity=quantity, units=units)
        item.save()
        return ItemMutation(item=item)

class ItemMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        name = graphene.String(required=True)
        quantity = graphene.Float(required=True)
        units = graphene.String(required=True)

    item = graphene.Field(ItemType)

    @classmethod
    def mutate(cls, root, info, id, name, quantity, units):
        item = Item.objects.get(id=id)
        item.name = name
        item.quantity = quantity
        item.units = units
        item.save()
        return ItemMutation(item=item)


class GroceriesCreation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        code = graphene.String(required=True)

    groceries = graphene.Field(GroceriesType)

    @classmethod
    def mutate(cls, root, info, code, title):
        groceries = Groceries.objects.create(code=code, title=title)
        groceries.save()
        return GroceriesMutation(groceries=groceries)


class GroceriesDeletion(graphene.Mutation):

    class Arguments:
        code = graphene.String()

    groceries = graphene.Field(GroceriesType)

    @classmethod
    def mutate(cls, root, info, code):
        groceries = Groceries.objects.get(code=code)
        groceries.delete()
        return GroceriesMutation(groceries = groceries)


class GroceriesMutation(graphene.Mutation):
    class Arguments:
        code = graphene.String(required=True)
        title = graphene.String(required=True)

    groceries = graphene.Field(GroceriesType)

    @classmethod
    def mutate(cls, root, info, code, title):
        groceries = Groceries.objects.get(code=code)
        groceries.title = title
        groceries.save()
        return GroceriesMutation(groceries = groceries)

class Mutation(graphene.ObjectType):
    update_groceries_title = GroceriesMutation.Field()
    delete_groceries = GroceriesDeletion.Field()
    create_groceries = GroceriesCreation.Field()
    create_item = ItemCreation.Field()
    update_item = ItemMutation.Field()



schema = graphene.Schema(query=Query, mutation=Mutation)