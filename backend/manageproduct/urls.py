
from django.urls import path, include
from manageproduct.views import CategoryViewSet, ProductViewSet, AddProductViewSet, ProductImagesViewSet
from rest_framework.routers import DefaultRouter



router = DefaultRouter()
router.register('all', ProductViewSet, basename = 'products')
router.register('addproducts', AddProductViewSet, basename = 'addproducts')
router.register('addimages', ProductImagesViewSet, basename = 'addimages')
router.register('categories', CategoryViewSet, basename = 'categories')

urlpatterns = [
    path('', include(router.urls))
]