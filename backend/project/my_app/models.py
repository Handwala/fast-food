from django.db import models
from django.contrib.auth.models import User  # Import the User model for linking orders to users

from django.db import models

class Order(models.Model):
    food_item = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    mpesa_transaction_id = models.CharField(max_length=255)
    status = models.CharField(max_length=50)  # Store the payment status
    description = models.TextField(default="No description provided")  # Set a default value

    def __str__(self):
        return f"{self.food_item} - {self.amount}"
