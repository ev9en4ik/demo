from tortoise.models import Model
from tortoise.fields import CharField, JSONField


class Predict(Model):
    id = CharField(pk=True, max_length=3)
    name = CharField(max_length=255)
    continent = CharField(max_length=255)
    populations = JSONField()
    arima_params = JSONField()
    arima_predictions = JSONField()
    arima_previous_predictions = JSONField()
    arima_accuracy = JSONField()
    exp_smooth_params = JSONField()
    exp_smooth_predictions = JSONField()
    exp_smooth_previous_predictions = JSONField()
    exp_smooth_accuracy = JSONField()
    custom_model = CharField(max_length=255)
    custom_params = JSONField()
    custom_predictions = JSONField()
    custom_accuracy = JSONField()

