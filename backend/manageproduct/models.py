from django.db import models
from django.utils import timezone
from PIL import Image
import os
from django.utils.text import slugify
from django.db.models.signals import pre_save
from django.dispatch import receiver
from ckeditor.fields import RichTextField

# Create your models here.


def p_image(instance, filename):
    ext = filename.split('.')[-1]
    original_filename = '.'.join(filename.split('.')[:-1])
    timestamp = timezone.now().strftime('%Y%m%d%H%M%S')
    new_filename = f"{original_filename}_{timestamp}.{ext}"
    return os.path.join('images/', new_filename)


class Category(models.Model):
    CATEGORY_CHOICES = [
        ('MEN', "Men"),
        ('WOMEN', "Women"),
        ('KIDS', "Kids"),
    ]
    name = models.CharField(max_length= 10, choices=CATEGORY_CHOICES, default = 'MEN')
    description =  models.TextField(blank=True, null=True)

    def __str__(self):
        return self.description
    
class Products(models.Model):
    category = models.ForeignKey(Category, on_delete= models.CASCADE, related_name='category')
    product_name = models.CharField(max_length=100)
    product_description = RichTextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    url_slug = models.SlugField(max_length=255, unique=True, blank=True)
    discount = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)  # Discount percentage

    @property
    def net_price(self):
        discount_amount = (self.discount / 100) * self.price
        return self.price - discount_amount

    def __str__(self):
        return self.product_name
    
@receiver(pre_save, sender = Products)
def generate_slug(sender, instance, **kwargs):
    if not instance.url_slug:
        instance.url_slug = slugify(instance.product_name)
    
class ProductVariant(models.Model):
    product = models.ForeignKey(Products, on_delete = models.CASCADE, related_name = 'variant')
    size = models.CharField(max_length=5, blank=True, null=True)
    
    def __str__(self):
        return f"Size for {self.product.product_name}"
    

class  ProductImages(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to=p_image, blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"Image for {self.product.product_name}"
    
    def save(self, *args, **kwargs):
        # Delete old image if it exists
        try:
            old_image = ProductImages.objects.get(pk=self.pk)
            if old_image.image and old_image.image != self.image:
                old_image.image.delete(save=False)
        except ProductImages.DoesNotExist:
            pass

        
        super().save(*args, **kwargs)
        if self.image:
            img = Image.open(self.image.path)
            # Compress the image
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")

            img.save(self.image.path, quality=85, optimize=True)