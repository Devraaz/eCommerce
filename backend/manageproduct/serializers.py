from manageproduct.models import Category, Products, ProductImages, ProductVariant
from rest_framework import serializers
import json
class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = ['id', 'image']
 

class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['id', 'size']


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    # category = CategorySerializers()
    images = ProductImageSerializer(many=True, read_only=True)
    variant = ProductVariantSerializer(many=True, read_only=True)
    
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True
    )

    class Meta:
        model = Products
        fields = ['id', 'product_name', 'product_description', 'price',  'stock', 'url_slug', 'discount', 'images', 'net_price', 'variant', 'category', 'uploaded_images']
        # fields = '__all__'
        
 
    def create(self,validated_data):
        print("Validated Data", validated_data)
        uploaded_images = validated_data.pop('uploaded_images')
        # variant_items = validated_data.pop('variant', [])
        variant_items = json.loads(self.context['request'].data.get('variant', '[]'))  # Parse JSON string


        product_instance = Products.objects.create(**validated_data)

        for image in uploaded_images:
            ProductImages.objects.create(product=product_instance, image=image)
        
        for variant_data in variant_items:
            ProductVariant.objects.create(product=product_instance, **variant_data)
        
        return product_instance

    def update(self, instance, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', [])
        variant_items = json.loads(self.context['request'].data.get('variant', '[]'))  # Parse JSON string

        instance.product_name = validated_data.get('product_name', instance.product_name)
        instance.product_description = validated_data.get('product_description', instance.product_description)
        instance.price = validated_data.get('price', instance.price)
        instance.stock = validated_data.get('stock', instance.stock)
        instance.url_slug = validated_data.get('url_slug', instance.url_slug)
        instance.discount = validated_data.get('discount', instance.discount)
        instance.save()

         # Handle ProductVariant instances
        instance.variant.all().delete()  # Delete existing variants
        for variant_data in variant_items:
            ProductVariant.objects.create(product=instance, **variant_data)

        # Handle ProductImages instances
        instance.images.all().delete()  # Delete existing images
        for image in uploaded_images:
            ProductImages.objects.create(product=instance, image=image)

        return instance