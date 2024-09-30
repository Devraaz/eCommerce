from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):
    """
    Custom permission to only allow admin users (staff users).
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_staff  # or request.user.is_admin if you're using that field
