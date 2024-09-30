from django.urls import path, include
from manageorders.views import CreateOrderViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('orders', CreateOrderViewSet, basename = 'orders')

urlpatterns = [
     path('', include(router.urls))
]
