from django.db import models
import uuid

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Brand(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    DRESS_STYLES = (
        ('casual', 'Casual'),
        ('formal', 'Formal'),
        ('party', 'Party'),
        ('gym', 'Gym'),
    )

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, related_name='products', on_delete=models.SET_NULL, null=True, blank=True)
    dress_style = models.CharField(max_length=50, choices=DRESS_STYLES, default='casual')
    
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    discount_percent = models.IntegerField(default=0)

    rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.5)
    review_count = models.IntegerField(default=451)
    
    description = models.TextField(default="Crafted from a soft and breathable fabric, offering superior comfort and modern street style.")
    
    colors_csv = models.CharField(max_length=200, default="#4F4631,#314F4A,#31344F")
    sizes_csv = models.CharField(max_length=200, default="Small,Medium,Large,X-Large")
    
    stock = models.IntegerField(default=50)
    is_new_arrival = models.BooleanField(default=False)
    is_top_selling = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    
    main_image = models.CharField(max_length=255)
    gallery_images_csv = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class ProductReview(models.Model):
    product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE)
    author_name = models.CharField(max_length=150)
    rating = models.IntegerField(default=5)
    is_verified = models.BooleanField(default=True)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.author_name} on {self.product.title}"

class Order(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('CONFIRMED', 'Confirmed'),
        ('PROCESSING', 'Processing'),
        ('SHIPPED', 'Shipped'),
        ('DELIVERED', 'Delivered'),
    )

    order_number = models.CharField(max_length=32, unique=True, default=uuid.uuid4)
    customer_name = models.CharField(max_length=150)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=50, blank=True)
    shipping_address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=30)
    
    items_json = models.TextField() # Array of items in cart
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    delivery_fee = models.DecimalField(max_digits=10, decimal_places=2, default=15.00)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    payment_method = models.CharField(max_length=50, default='CREDIT_CARD')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='CONFIRMED')
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.order_number or len(self.order_number) > 20:
            self.order_number = f"ORD-{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Order {self.order_number} - {self.customer_name}"

class Coupon(models.Model):
    code = models.CharField(max_length=50, unique=True)
    discount_percent = models.IntegerField(default=20)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.code} (-{self.discount_percent}%)"

class Testimonial(models.Model):
    customer_name = models.CharField(max_length=150)
    rating = models.IntegerField(default=5)
    is_verified = models.BooleanField(default=True)
    comment = models.TextField()

    def __str__(self):
        return self.customer_name
