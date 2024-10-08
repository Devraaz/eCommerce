# Generated by Django 4.2.13 on 2024-07-20 13:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Orders',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_no', models.CharField(blank=True, max_length=20, null=True)),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('discount', models.DecimalField(decimal_places=2, default=0.0, max_digits=5)),
                ('gross_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('tax', models.DecimalField(decimal_places=2, max_digits=10)),
                ('shipping_charge', models.DecimalField(decimal_places=2, max_digits=10)),
                ('net_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('delivery_status', models.CharField(choices=[('Placed', 'Placed'), ('Processing', 'Processing'), ('Shipped', 'Shipped'), ('Delivered', 'Delivered')], default='None', max_length=20)),
                ('payment_options', models.CharField(choices=[('Net Banking', 'Net Banking'), ('COD', 'COD'), ('UPI', 'UPI')], default='None', max_length=20)),
                ('payment_status', models.CharField(choices=[('Pending', 'Pending'), ('Paid', 'Paid')], default='Pending', max_length=20)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
