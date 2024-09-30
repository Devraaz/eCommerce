from rest_framework import serializers
from manageusers.models import Users, UserAddress

from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.conf import settings




class UserRegistrationSerializer(serializers.ModelSerializer):
    # We are writing this we need to confirm password field in our Registration Request
    password2 = serializers.CharField(style = {'input': 'password'}, write_only =True)
    class Meta:
        model = Users
        fields = ['id', 'email', 'name', 'password', 'password2', 'tc']
        extra_kwargs = { 
            'password' : {"write_only" : True} 
        }
        
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if(password != password2):
            raise serializers.ValidationError('Password & Confirm Password doesn\'t Match ' )
        return attrs
    def create(self, validated_data):
        validated_data.pop('password2')  # Remove password2 from the data before saving
        user = Users.objects.create_user(**validated_data)
        return user

class UserLoginSerializer(serializers.ModelSerializer):
    email  =serializers.CharField(max_length = 255 )
    class Meta:
        model = Users
        fields = ['email', 'password']

class AdminLoginSerializer(serializers.ModelSerializer):
    email  =serializers.CharField(max_length = 255 )
    class Meta: 
        model = Users
        fields = ['email', 'password']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model =Users
        fields = ['id', 'name', 'email', 'is_admin', 'is_superuser']

class UserChangePswdSerializer(serializers.Serializer):
    password = serializers.CharField(max_length = 255, style={'input_type': 'password'}, write_only = True)
    password2 = serializers.CharField(max_length = 255, style={'input_type': 'password'}, write_only = True)
    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if(password != password2):
            raise serializers.ValidationError('Password & Confirm Password doesn\'t Match ' )
        user.set_password(password)
        user.save()
        return attrs


class UserSendPswdResetMailSerializer(serializers.Serializer):
    email  =serializers.CharField(max_length = 255 )
    class Meta:
        fields = ['email']

    def validate(self, attrs):
        email = attrs.get('email')
        if Users.objects.filter(email = email).exists():
            user = Users.objects.get(email = email)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            print("Encoded ID", uid)
            token = PasswordResetTokenGenerator().make_token(user)
            print("password token", token)
            link = "http://localhost:5173/User/ResetPassword/" + uid+ '/' + token
            print("Email Link", link)

            subject = 'Password Reset Email'
            message = 'This is a plain text fallback message.'
            sender_email = settings.EMAIL_HOST_USER
            recipient_list = [email]
            html_message = f"""
                <h1>Reset Your Password</h1>
                <p>Click the link below to reset your password:</p>
                <a href="{link}">Reset Password</a>
                <p>If you did not request this, please report us </p>
                """
            
                # Send the email
            send_mail(
                subject,
                message,
                sender_email,
                recipient_list,
                html_message=html_message  # Pass the HTML content here
            )

            return attrs
        else:
            raise serializers.ValidationError('Not a Registered User ' )
        
class UserResetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length = 255, style={'input_type': 'password'}, write_only = True)
    password2 = serializers.CharField(max_length = 255, style={'input_type': 'password'}, write_only = True)
    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            uid = self.context.get('uid')
            token = self.context.get('token')

            if(password != password2):
                raise serializers.ValidationError('Password & Confirm Password doesn\'t Match ' )
            id = smart_str(urlsafe_base64_decode(uid))
            user = Users.objects.get(id = id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError('Token is not Valid / Expired' )

            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as identifier :
            PasswordResetTokenGenerator().check_token(user, token)
            raise serializers.ValidationError('Token is not Valid / Expired' )

class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = ['id','address1', 'address2', 'phone', 'state', 'district', 'pin', 'is_current']

class UserSerializer(serializers.ModelSerializer):
    address = UserAddressSerializer(many = True)
    class Meta:
        model = Users
        fields = '__all__'
    
    


