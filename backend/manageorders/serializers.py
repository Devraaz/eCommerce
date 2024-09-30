from .models import Orders, OrderItems
from rest_framework import serializers


class OrderItemSerializers(serializers.ModelSerializer):

    class Meta:
        model = OrderItems
        fields = ['id','product_id','product_price', 'quantity', 'size']

class OrdersSerializers(serializers.ModelSerializer):
    items = OrderItemSerializers(many=True)
    user_email = serializers.CharField(source='user_id.email', read_only=True)
    
    
    class Meta:
        model = Orders
        fields = ['id','user_email', 'order_no','total_amount', 'discount', 'gross_amount', 'tax', 'shipping_charge', 'net_amount', 'delivery_status', 'payment_status', 'payment_options', 'items', 'order_date']
 
 
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Orders.objects.create(**validated_data)
        for item_data in items_data:
            OrderItems.objects.create(order_id=order, **item_data)
        return order