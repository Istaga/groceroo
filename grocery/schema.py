import graphene
from graphene_django import DjangoObjectType, DjangoListField
from .models import Groceries, Item, generate_unique_code

class GroceriesType(DjangoObjectType):
    class Meta:
        model = Groceries
        fields = ("id", "title", "code")

class ItemType(DjangoObjectType):
    class Meta:
        model = Item
        fields = ("id", "name", "quantity", "units", "list")


class Query(graphene.ObjectType):
    all_groceries = DjangoListField(GroceriesType)
    pacific_room = graphene.Field(GroceriesType, code=graphene.String())
    all_items = DjangoListField(ItemType)
    pacific_items = graphene.List(ItemType, code=graphene.String())
    last_room = graphene.Field(GroceriesType)

    def resolve_all_groceries(root, info):
        return Groceries.objects.all()

    def resolve_pacific_room(root, info, code):
        return Groceries.objects.get(code=code)
    
    def resolve_all_groceries(root, info):
        return Groceries.objects.all()

    def resolve_all_items(root, info):
        return Item.objects.all()
    
    def resolve_pacific_items(root, info, code):
        groceries = Groceries.objects.get(code=code)
        return Item.objects.filter(list=groceries)

    def resolve_last_room(root, info):
        groceries = Groceries.objects.last()
        return groceries



#### Item Mutations

class ItemCreation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        quantity = graphene.Float(required=True)
        units = graphene.String(required=True)
        list_code = graphene.String(required=True)

    item = graphene.Field(ItemType)

    @classmethod
    def mutate(cls, root, info, name, quantity, units, list_code):
        list = Groceries.objects.get(code=list_code)
        item = Item.objects.create(name=name, quantity=quantity, units=units, list=list)
        item.save()
        return ItemMutation(item=item)


class ItemDeletion(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    item = graphene.Field(ItemType)

    @classmethod
    def mutate(cls, root, info, id):
        item = Item.objects.get(id=id)
        item.delete()
        return ItemDeletion(item = item)


class ItemMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        name = graphene.String(required=True)
        quantity = graphene.Float(required=True)
        units = graphene.String(required=True)
        list_code = graphene.String(required=True)

    item = graphene.Field(ItemType)

    @classmethod
    def mutate(cls, root, info, id, name, quantity, units, list_code):
        item = Item.objects.get(id=id)
        item.name = name
        item.quantity = quantity
        item.units = units
        item.list_code = list_code
        item.save()
        return ItemMutation(item=item)



#### Groceries Mutations

class GroceriesCreation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        code = graphene.String(required=True)

    groceries = graphene.Field(GroceriesType)

    @classmethod
    def mutate(cls, root, info, code, title):
        if( type(code) is not str or len(code) != 8 ):
            code = generate_unique_code()

        groceries = Groceries.objects.create(title=title, code=code)
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
    delete_item = ItemDeletion.Field()



schema = graphene.Schema(query=Query, mutation=Mutation)