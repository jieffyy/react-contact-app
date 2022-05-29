from contacts.models import Contact
from rest_framework import serializers


class ContactSerializer(serializers.ModelSerializer):
    # See: https://stackoverflow.com/questions/38556217
    user = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True)

    class Meta:
        model = Contact
        fields = ['id', 'contact_name', 'user',
                  'contact_number', 'contact_email', 'created_at', 'updated_at']
