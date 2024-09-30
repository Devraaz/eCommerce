from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from manageusers import views

router = DefaultRouter()
router.register('addAddress', views.UserAddressView, basename='addAddress')
router.register('users', views.Users, basename='users')


urlpatterns = [
    path('register/', views.UserRegistrationView.as_view(), name='register'),
    path('login/', views.UserLoginView.as_view(), name='login'),
    path('profile/', views.UserProfileView.as_view(), name='profile'),
    path('changepassword/', views.UserChangePassword.as_view(), name='changepassword'),
    path('send-reset-pswd-mail/', views.UserSendPswdResetMail.as_view(), name='send-reset-pswd-mail'),
    path('reset-password/<uid>/<token>/', views.UserPswdReset.as_view(), name='reset-password'),
    
    path('admin-login/', views.AdminLoginView.as_view(), name='admin-login'),

    # JWT Token endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Include the router urls
    path('', include(router.urls)),
    
]