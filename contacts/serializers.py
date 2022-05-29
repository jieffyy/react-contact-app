from asyncore import read
from cgitb import lookup
from django.contrib.auth.models import User, Group
from contacts.models import Contact
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'groups', 'contacts']


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']


class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = ['id', 'contact_name', 'user',
                  'contact_number', 'contact_email', 'created_at', 'updated_at']
