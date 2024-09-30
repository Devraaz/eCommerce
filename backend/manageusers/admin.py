from django.contrib import admin
from manageusers.models import Users, UserAddress
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# Register your models here.

class UserAdmin(BaseUserAdmin):
     
    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ["id", "email","name", "tc", "is_admin", 'is_superuser', 'is_staff', 'created_at']
    list_filter = ["is_admin"]
    fieldsets = [
        ('UserCredentials', {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["name", 'tc']}),
        ("Permissions", {"fields": ["is_admin"]}),
    ]
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "name", "password1", "password2"],
            },
        ),
    ]
    search_fields = ["email","name"]
    ordering = ["email"]
    filter_horizontal = []

@admin.register(UserAddress)
class UserAddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'address1', 'address1', 'state', 'district', 'pin', 'is_current')
    search_fields = ('user', 'district')


    
# Now register the new UserAdmin...
admin.site.register(Users, UserAdmin)
# ... and, since we're not using Django's built-in permissions,
# unregister the Group model from admin.
