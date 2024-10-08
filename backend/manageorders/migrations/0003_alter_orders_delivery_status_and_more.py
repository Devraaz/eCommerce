# Generated by Django 4.2.13 on 2024-07-20 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manageproduct', '0004_products_discount'),
        ('manageorders', '0002_orders_product_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orders',
            name='delivery_status',
            field=models.CharField(choices=[('None', 'None'), ('Placed', 'Placed'), ('Processing', 'Processing'), ('Shipped', 'Shipped'), ('Delivered', 'Delivered'), ('Cancelled', 'Cancelled')], default='None', max_length=20),
        ),
        migrations.RemoveField(
            model_name='orders',
            name='product_id',
        ),
        migrations.AddField(
            model_name='orders',
            name='product_id',
            field=models.ManyToManyField(related_name='product_id', to='manageproduct.products'),
        ),
    ]
