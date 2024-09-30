from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from .models import Orders
from manageproduct.models import Products
from .serializers import OrdersSerializers
from rest_framework.exceptions import ValidationError
from decimal import Decimal
from rest_framework.decorators import action
from django.db import transaction
from django.core.mail import send_mail
from .permissions import IsAdminUser 
from django.template.loader import render_to_string
from django.conf import settings
from django.core.mail import EmailMultiAlternatives

# Create your views here.

class CreateOrderViewSet(viewsets.ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializers
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action == 'list':  # Restrict the list action to admins only
            return [IsAdminUser()]
        return super().get_permissions()
    
    def check_stock(self, items_data):
        """
        Check if there is sufficient stock for all products in the order.
        """
        for item in items_data:
            product_id = item.get('product_id')
            quantity = int(item.get('quantity'))
            product = Products.objects.get(id=product_id)

            if product.stock < quantity:
                raise ValidationError(f"Insufficient stock for product {product.product_name}.")

    
    def perform_create(self, serializer):
        order = serializer.save(user_id=self.request.user)

         # Reduce the quantities of the ordered products
        items_data = self.request.data.get('items', [])
        for item in items_data:
            product_id = item.get('product_id')
            quantity = int(item.get('quantity'))
            product = Products.objects.get(id=product_id)
            
            product.stock -= quantity
            product.save()

         # Send order invoice email
        self.send_invoice_email(order)


        return order
    
    
    def create(self, request, *args, **kwargs):
        items_data = request.data.get('items',[])
        try:
            self.check_stock(items_data)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
   

    def send_invoice_email(self, order):
        """
        Send an email with the order invoice.
        """
   
        user = order.user_id
        subject = 'Order Confirmation - Invoice'
        message = "This is a plain fallback message"
        html_message = render_to_string('email/invoice.html', {
            
            'user': user,
            'order': order,
            'items': order.items.all(),  # Assuming `items` is related to order
        })
        
        # Send the email
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            html_message=html_message,
            fail_silently=False,
        )


    @action(detail= True, methods=['patch'], permission_classes=[IsAuthenticated])    
    def update_status(self, request, pk=None):
        order = self.get_object()
        new_status = request.data.get('delivery_status')
        if new_status:
            order.delivery_status = new_status
            order.save()
             # Send order invoice email
            self.send_invoice_email(order)

            
            return Response({'status': 'status updated'})
        return Response({'error': 'Invalid status'}, status=400)

    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def user_orders(self, request):
        user = request.user
        orders = Orders.objects.filter(user_id=user)
        serializer = OrdersSerializers(orders, many=True)
        return Response(serializer.data)
    


    
