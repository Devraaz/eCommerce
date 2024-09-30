from django.db import models
from manageproduct.models import Products, ProductImages
from manageusers.models import Users, UserAddress
import json
# Create your models here.
 

class Orders(models.Model):
    STATUS_CHOICES = [
        ('None', "None"),
        ('Placed', "Placed"),
        ('Processing', "Processing"),
        ('Shipped', "Shipped"),
        ('Delivered', "Delivered"),
        ('Cancelled', "Cancelled"),
    ]
    PAYMENT_STATUS = [
        ('Not Paid', "Not Paid"),
        ('Paid', "Paid"),
    ]
    PAYMENT_OPTIONS= [
        ('Net Banking', "Net Banking"),
        ('COD', "COD"),
        ('UPI', "UPI"),
    ]
    order_no = models.CharField(max_length=20, null=True, blank=True, unique=True)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE )
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    gross_amount = models.DecimalField(max_digits=10, decimal_places=2)
    tax = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_charge = models.DecimalField(max_digits=10, decimal_places=2)
    net_amount = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_status = models.CharField(max_length= 20, choices = STATUS_CHOICES,  default = 'None')
    payment_status = models.CharField(max_length=20, choices = PAYMENT_STATUS, default='Not Paid' )
    payment_options = models.CharField(max_length = 20, choices= PAYMENT_OPTIONS, default = 'None')
    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.order_no
    
class OrderItems(models.Model):
    name = models.CharField(max_length=10, null=True, blank = True, default='Order items for')
    order_id = models.ForeignKey(Orders, on_delete = models.CASCADE, related_name = 'items')
    product_id = models.ForeignKey(Products, on_delete=models.CASCADE , related_name = 'order_items')
    product_price = models.DecimalField(max_digits=10, decimal_places=2, default = 0.0)
    quantity = models.IntegerField()
    size = models.TextField() 

    def set_sizes(self, sizes):
        self.sizes = json.dumps(sizes)  # Convert list to JSON string

    def get_sizes(self):
        return json.loads(self.sizes)  # Convert JSON string to list

    def __str__(self):
        return self.name