from tortoise.models import Model
from tortoise.fields import CharField, JSONField

class Country(Model):
    id = CharField(pk=True, max_length=3)
    name = CharField(max_length=255)
    continent = CharField(max_length=255)
    populations = JSONField()
    predictions = JSONField()

