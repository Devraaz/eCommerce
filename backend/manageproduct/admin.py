from django.contrib import admin
from .models import Category, Products, ProductImages, ProductVariant

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name', 'description')
    list_filter = ('name',)
    ordering = ('name',)

@admin.register(Products)
class ProductsAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'category', 'price', 'stock', 'url_slug', 'discount', 'net_price')
    search_fields = ('product_name', 'category__name', 'price', 'discount')
    list_filter = ('category',)
    ordering = ('product_name',)

@admin.register(ProductImages)
class ProductImagesAdmin(admin.ModelAdmin):
    list_display = ('product', 'image', 'uploaded_at')
    search_fields = ('product__product_name',)
    list_filter = ('uploaded_at',)
    ordering = ('-uploaded_at',)

@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ('product', 'size')
    search_fields = ('product', 'size')