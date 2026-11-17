from rest_framework import serializers
from .models import Category, Brand, Product, ProductReview, Order, Coupon, Testimonial

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description']

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name', 'slug']

class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = ['id', 'author_name', 'rating', 'is_verified', 'comment', 'created_at']

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    brand_name = serializers.CharField(source='brand.name', read_only=True)
    reviews = ProductReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'slug', 'category', 'category_name',
            'brand', 'brand_name', 'dress_style', 'price',
            'original_price', 'discount_percent', 'rating',
            'review_count', 'description', 'colors_csv', 'sizes_csv',
            'stock', 'is_new_arrival', 'is_top_selling', 'featured',
            'main_image', 'gallery_images_csv', 'reviews', 'created_at'
        ]

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'customer_name', 'customer_email',
            'customer_phone', 'shipping_address', 'city', 'postal_code',
            'items_json', 'subtotal', 'discount', 'delivery_fee',
            'total_amount', 'payment_method', 'status', 'created_at'
        ]

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ['code', 'discount_percent', 'active']

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'customer_name', 'rating', 'is_verified', 'comment']
