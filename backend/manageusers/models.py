from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, email, name,   tc , password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            name = name,
            tc = tc
            
        )

        user.set_password(password)
        user.save(using=self._db) 
        return user

    def create_superuser(self, email, name,  tc , password=None, password2 = None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
            name = name,
            tc = tc
        )
        user.is_admin = True
        user.is_superuser = True  # Set is_superuser to True
        user.save(using=self._db)
        return user

class Users(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="Email",
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length = 200)
    tc = models.BooleanField()
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name",'tc' ]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

class UserAddress(models.Model):
    STATE_CHOICES = [
        ('Odisha', "Odisha"),
        # ('Arunachal Pradesh', "Arunachal Pradesh"),
        # ('Assam', "Assam"),
        # ('Bihar', "Bihar"),
        # ('Chhattisgarh', "Chhattisgarh"),
        # ('Goa', "Goa"),
        # ('Gujarat', "Gujarat"),
        # ('Haryana', "Haryana"),
        # ('Himachal Pradesh', "Himachal Pradesh"),
        # ('Jharkhand', "Jharkhand"),
        # ('Karnataka', "Karnataka"),
        # ('Kerala', "Kerala"),
        # ('Madhya Pradesh', "Madhya Pradesh"),
        # ('Maharashtra', "Maharashtra"),
        # ('Manipur', "Manipur"),
        # ('Meghalaya', "Meghalaya"),
        # ('Mizoram', "Mizoram"),
        # ('Nagaland', "Nagaland"),
        # ('Odisha', "Odisha"),
        # ('Punjab', "Punjab"),
        # ('Rajasthan', "Rajasthan"),
        # ('Sikkim', "Sikkim"),
        # ('Tamil Nadu', "Tamil Nadu"),
        # ('Telangana', "Telangana"),
        # ('Tripura', "Tripura"),
        # ('Uttar Pradesh', "Uttar Pradesh"),
        # ('Uttarakhand', "Uttarakhand"),
        # ('West Bengal', "West Bengal"),
        # ('Andaman and Nicobar Islands', "Andaman and Nicobar Islands"),
        # ('Chandigarh', "Chandigarh"),
        # ('Dadra and Nagar Haveli and Daman and Diu', "Dadra and Nagar Haveli and Daman and Diu"),
        # ('Lakshadweep', "Lakshadweep"),
        # ('Delhi', "Delhi"),
        # ('Puducherry', "Puducherry"),
        # ('Ladakh', "Ladakh"),
        # ('Jammu and Kashmir', "Jammu and Kashmir"),
    ]

    user = models.ForeignKey(Users, on_delete= models.CASCADE, related_name='address')
    address1 = models.TextField()
    address2 = models.TextField()
    phone = models.IntegerField()
    state = models.CharField(max_length=30, choices = STATE_CHOICES, default = 'Odisha')
    district = models.CharField(max_length=30, default='Koraput' )
    pin = models.CharField(max_length=6)
    is_current = models.BooleanField(default=False)  # Add this field to track the current address

    def __str__(self):
        return self.user.name

