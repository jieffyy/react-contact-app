from django.contrib.auth.models import User, Group
from contacts.models import Contact
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class ContactSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Contact
        fields = ['url', 'contact_name', 'belongs_to',
                  'contact_number', 'contact_email', 'created_at', 'updated_at']
