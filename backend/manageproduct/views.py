from django.shortcuts import render
from manageproduct.models import Category, Products, ProductImages, ProductVariant
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from .mypagination import MyPagination
from rest_framework.authentication import BasicAuthentication

from .filters import ProductFilter  # Import the custom filter
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from rest_framework.filters import SearchFilter, OrderingFilter
from .serializers import CategorySerializers, ProductSerializer, ProductImageSerializer
# Create your views here.
 

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializers
    permission_classes = [IsAuthenticated]

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ProductFilter  
    search_fields = ['product_name', 'product_description']
    # search_fields = ['^product_name']   Starts with 
    # search_fields = ['=product_name']   Exact match
    ordering_fields = ['price', 'stock', 'product_name']
    # pagination_class = MyPagination


class AddProductViewSet(viewsets.ModelViewSet):
    # authentication_classes = [BasicAuthentication]
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser]
    parser_classes = (MultiPartParser, FormParser, FileUploadParser)
    
    def perform_destroy(self, instance):
        if (instance):
            instance.delete()
            return Response({'message': "Product Deleted Successfully"})
        else:
            return Response({'msg': "Product Not Found"}, status = status.HTTP_404_NOT_FOUND)
 
    def create(self, request, *args, **kwargs):
        # Use the serializer to validate and save data
        print("Requested Data ",request.data.get('variant'))
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product = serializer.save()

        # Handle images separately
        images = request.FILES.getlist('uploaded_images')
        for image in images:
            ProductImages.objects.create(product=product, image=image)

        # Handle variants
        # variant_items = request.data.getlist('variant')  # Extract the variant list
        # print("Variant Items: ", variant_items)
        # for variant_data in variant_items:
        #     size = variant_data.get('size')
        #     if size:
        #         ProductVariant.objects.create(product=product, size=size)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # Handle images and variants
        images = request.FILES.getlist('uploaded_images')
        ProductImages.objects.filter(product=instance).delete()
        for image in images:
            ProductImages.objects.create(product=instance, image=image)

        variant_items = request.data.getlist('variant')
        ProductVariant.objects.filter(product=instance).delete()
        for variant_data in variant_items:
            ProductVariant.objects.create(product=instance, **variant_data)

        return Response(serializer.data)

class ProductImagesViewSet(viewsets.ModelViewSet):
    authentication_classes = [BasicAuthentication]
    queryset = ProductImages.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = [IsAuthenticated]