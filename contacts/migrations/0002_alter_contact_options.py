# Generated by Django 4.0.4 on 2022-05-29 09:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='contact',
            options={'ordering': ['updated_at']},
        ),
    ]
