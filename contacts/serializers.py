from contacts.models import Contact
from rest_framework import serializers


class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = ['id', 'contact_name', 'user',
                  'contact_number', 'contact_email', 'created_at', 'updated_at']
