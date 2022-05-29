from django.db import models
from django.contrib.auth.models import User
from django.core.validators import validate_email


class Contact(models.Model):
    contact_name = models.CharField(max_length=200)
    belongs_to = models.ForeignKey(User, on_delete=models.CASCADE)
    contact_number = models.CharField(max_length=100)
    contact_email = models.CharField(
        max_length=400, validators=[validate_email])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['updated_at']
