from django.contrib import admin
from .models import Orders, OrderItems


# Register your models here.
@admin.register(Orders)
class OrderAdmin(admin.ModelAdmin):
    list_display = ( 'id','user_id','order_no','total_amount', 'discount', 'gross_amount', 'tax', 'shipping_charge', 'net_amount', 'delivery_status', 'payment_status', 'payment_options', 'order_date')

@admin.register(OrderItems)
class OrderItemsAdmin(admin.ModelAdmin):
    list_display = ( 'product_id','product_price','quantity', 'size')