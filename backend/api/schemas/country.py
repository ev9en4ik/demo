from pydantic import BaseModel, Field
from typing import Optional
from tortoise.contrib.pydantic import pydantic_model_creator
from api.models.country import Country

GetCountry = pydantic_model_creator(Country, name="Country")
