from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import  status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth import authenticate
from manageusers.serializers import UserRegistrationSerializer, AdminLoginSerializer, UserLoginSerializer, UserProfileSerializer, UserChangePswdSerializer, UserSendPswdResetMailSerializer, UserResetPasswordSerializer, UserAddressSerializer, UserSerializer
from manageusers.renderers import UserRenderer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets, status
from django.core.mail import send_mail
from django.conf import settings


# Create your views here.

from .models import Users, UserAddress


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }



class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self,request, format=None):
        serializer = UserRegistrationSerializer(data = request.data)
        if serializer.is_valid(raise_exception = True):
            user = serializer.save()
            token = get_tokens_for_user(user)

            subject = 'Welcome to Fashion Nana | The smartest Shopping Cart in Koraput'
            message = 'This is a plain text fallback message.'
            sender_email = settings.EMAIL_HOST_USER
            recipient_list = [user.email]
            html_message = f"""
                <h1 style="text-align: center; color: #2c3e50;">Welcome to Fashion Nana, {user.name}!</h1>
                <p style="font-size: 16px; color: #34495e;">
                    We are beyond excited to have you join our Fashion Nana family! 
                    At Fashion Nana, we pride ourselves on being the trendiest and fastest-growing fashion destination, especially here in Koraput.
                </p>
                <p style="font-size: 16px; color: #34495e;">
                    From stylish everyday wear to the latest in fashion trends, we've got you covered for every occasion. 
                    Get ready to embark on an exciting shopping journey filled with unique styles and amazing deals, tailored just for you.
                </p>
                <p style="font-size: 16px; color: #34495e;">
                    To get started, explore our <a href="http://localhost:5173" style="color: #3498db; text-decoration: none;">latest collections</a> 
                    or check out our exclusive discounts waiting just for you!
                </p>
                <p style="font-size: 16px; color: #34495e;">
                    Thank you for choosing Fashion Nana. We can't wait to be a part of your style journey!
                </p>

                <p style="font-size: 16px; color: #34495e;">Warm regards,</p>
                <p style="font-size: 16px; color: #34495e;"><strong>The Fashion Nana Team</strong></p>
                """

            
                # Send the email
            send_mail(
                subject,
                message,
                sender_email,
                recipient_list,
                html_message=html_message  # Pass the HTML content here
            )
            return Response ({'token': token ,'msg': 'Registration Successful'}, status = status.HTTP_201_CREATED)
        
        return Response(serializer.errors ,  status=status.HTTP_400_BAD_REQUEST)



class UserLoginView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format = None):
        serializer = UserLoginSerializer(data = request.data)
        if serializer.is_valid(raise_exception= True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email = email, password = password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response ({'token': token, 'msg': "Login Success"}, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({'errors': {'non-field-errors': ['Email or Password is not Valid']}}, status = status.HTTP_404_NOT_FOUND)

        return Response(serializer.errors ,  status=status.HTTP_400_BAD_REQUEST)
    
class AdminLoginView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format = None):
        serializer = AdminLoginSerializer(data = request.data)
        if(serializer.is_valid(raise_exception = True)):
            email = serializer.data.get('email')
            passowrd = serializer.data.get('password')
            user = authenticate(email = email, password = passowrd)
            if user is not None and user.is_staff:
                token = get_tokens_for_user(user)
                return Response({'token': token, 'msg': "Login Success"}, status = status.HTTP_202_ACCEPTED)
            else:
                return Response({'errors': {'non-field-errors': ["Authentication failed! Only for Admin Users Only"]}}, status = status.HTTP_404_NOT_FOUND)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        serializer = UserProfileSerializer(request.user)
        
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserChangePassword(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def post(self, request, format = None):
        serializer= UserChangePswdSerializer(data= request.data, context={'user': request.user})
        if serializer.is_valid(raise_exception = True):
            return Response({'msg': "Password Changed Successfully"}, status = status.HTTP_201_CREATED)
    
        return Response(serializer.errors ,  status=status.HTTP_400_BAD_REQUEST)

class UserSendPswdResetMail(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format = None):
        serializer = UserSendPswdResetMailSerializer(data = request.data)
        if serializer.is_valid(raise_exception = True):
            return Response({'msg': "Password Link Send. Please check your Email"}, status=status.HTTP_200_OK)


class UserPswdReset(APIView):
    renderer_classes = [UserRenderer]
    def post(self,request,  uid, token, format = None):
        serializer = UserResetPasswordSerializer(data = request.data, context = {'uid': uid , 'token': token})
        if serializer.is_valid(raise_exception = True):
            return Response({'msg': "Password Changed Successfully"}, status = status.HTTP_201_CREATED)
    
        return Response(serializer.errors ,  status=status.HTTP_400_BAD_REQUEST)
    
class UserAddressView(viewsets.ModelViewSet):
    queryset = UserAddress.objects.all()
    serializer_class = UserAddressSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Return only addresses for the authenticated user
        user = self.request.user
        return UserAddress.objects.filter(user=user)
    
    def create(self, request, *args, **kwargs):
    # Automatically associate the address with the authenticated user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
         # Check if the new address is being marked as 'is_current=True'
        if serializer.validated_data.get('is_current', False):
            # Set all other addresses for this user to 'is_current=False'
            UserAddress.objects.filter(user=request.user, is_current=True).update(is_current=False)
        

        # Add the authenticated user to the validated data
        validated_data = serializer.validated_data
        validated_data['user'] = request.user

        # Create the UserAddress instance
        address = UserAddress.objects.create(**validated_data)
         # Re-serialize the created instance to return in the response
        response_serializer = self.get_serializer(address)
        
        return Response({'msg': "Address Added Successfully"}, status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        # If 'is_current=True' is being updated, reset all other addresses
        if serializer.validated_data.get('is_current', instance.is_current):
            UserAddress.objects.filter(user=request.user, is_current=True).exclude(id=instance.id).update(is_current=False)

        self.perform_update(serializer)
        
        return Response({'msg': "Address Updated Successfully"}, status=status.HTTP_200_OK)
    
    
class Users(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser] 
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['name', ]
    search_fields = ['name']
    ordering_fields = ['name']
    