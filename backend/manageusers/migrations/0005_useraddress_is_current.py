# Generated by Django 4.2.13 on 2024-09-29 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manageusers', '0004_useraddress_phone_alter_useraddress_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraddress',
            name='is_current',
            field=models.BooleanField(default=False),
        ),
    ]
