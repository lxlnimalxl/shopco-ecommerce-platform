import uuid
import json
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import Category, Brand, Product, ProductReview, Order, Coupon, Testimonial
from .serializers import (
    CategorySerializer, BrandSerializer, ProductSerializer,
    ProductReviewSerializer, OrderSerializer, CouponSerializer,
    TestimonialSerializer
)

class ProductListView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        qs = Product.objects.all().order_by('-created_at')

        # Filter: category
        category = self.request.query_params.get('category')
        if category and category.lower() != 'all':
            qs = qs.filter(category__slug=category.lower())

        # Filter: dress style
        dress_style = self.request.query_params.get('dress_style')
        if dress_style and dress_style.lower() != 'all':
            qs = qs.filter(dress_style=dress_style.lower())

        # Filter: new arrivals
        new_arrivals = self.request.query_params.get('new_arrivals')
        if new_arrivals == 'true':
            qs = qs.filter(is_new_arrival=True)

        # Filter: top selling
        top_selling = self.request.query_params.get('top_selling')
        if top_selling == 'true':
            qs = qs.filter(is_top_selling=True)

        # Filter: price range
        min_price = self.request.query_params.get('min_price')
        if min_price:
            try:
                qs = qs.filter(price__gte=float(min_price))
            except ValueError:
                pass

        max_price = self.request.query_params.get('max_price')
        if max_price:
            try:
                qs = qs.filter(price__lte=float(max_price))
            except ValueError:
                pass

        # Search query
        search = self.request.query_params.get('search')
        if search:
            qs = qs.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(category__name__icontains=search) |
                Q(brand__name__icontains=search)
            )

        # Sort order
        sort_by = self.request.query_params.get('sort')
        if sort_by == 'price_low':
            qs = qs.order_by('price')
        elif sort_by == 'price_high':
            qs = qs.order_by('-price')
        elif sort_by == 'rating':
            qs = qs.order_by('-rating')

        return qs

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'

class AddProductReviewView(APIView):
    def post(self, request, product_id):
        product = get_object_or_404(Product, pk=product_id)
        author = request.data.get('author_name', 'Verified Shopper')
        rating = int(request.data.get('rating', 5))
        comment = request.data.get('comment', '')

        if not comment:
            return Response({'error': 'Comment cannot be empty'}, status=status.HTTP_400_BAD_REQUEST)

        review = ProductReview.objects.create(
            product=product,
            author_name=author,
            rating=rating,
            is_verified=True,
            comment=comment
        )
        serializer = ProductReviewSerializer(review)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class BrandListView(generics.ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class ValidateCouponView(APIView):
    def post(self, request):
        code = request.data.get('code', '').strip().upper()
        coupon = Coupon.objects.filter(code=code, active=True).first()
        if coupon:
            return Response({
                'valid': True,
                'code': coupon.code,
                'discount_percent': coupon.discount_percent,
                'message': f"Coupon applied: {coupon.discount_percent}% off!"
            })
        return Response({
            'valid': False,
            'message': 'Invalid or expired promo code.'
        }, status=status.HTTP_400_BAD_REQUEST)

class CreateOrderView(APIView):
    def post(self, request):
        customer_name = request.data.get('customer_name')
        customer_email = request.data.get('customer_email')
        shipping_address = request.data.get('shipping_address')
        city = request.data.get('city', 'New York')
        postal_code = request.data.get('postal_code', '10001')
        items = request.data.get('items', [])
        subtotal = float(request.data.get('subtotal', 0))
        discount = float(request.data.get('discount', 0))
        delivery_fee = float(request.data.get('delivery_fee', 15.00))
        total_amount = float(request.data.get('total_amount', subtotal - discount + delivery_fee))
        payment_method = request.data.get('payment_method', 'CREDIT_CARD')

        order_num = f"ORD-{uuid.uuid4().hex[:8].upper()}"

        order = Order.objects.create(
            order_number=order_num,
            customer_name=customer_name or "Alex Johnson",
            customer_email=customer_email or "alex.johnson@gmail.com",
            shipping_address=shipping_address or "742 Evergreen Terrace",
            city=city,
            postal_code=postal_code,
            items_json=json.dumps(items) if isinstance(items, list) else str(items),
            subtotal=subtotal,
            discount=discount,
            delivery_fee=delivery_fee,
            total_amount=total_amount,
            payment_method=payment_method,
            status='CONFIRMED'
        )

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class OrderDetailView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    lookup_field = 'order_number'

class TestimonialListView(generics.ListAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer

class SystemOverviewView(APIView):
    def get(self, request):
        return Response({
            'platform': 'SHOP.CO Premium E-Commerce API',
            'version': '2.0-Production',
            'status': 'OPERATIONAL',
            'catalog': {
                'total_products': Product.objects.count(),
                'total_categories': Category.objects.count(),
                'total_orders': Order.objects.count(),
                'new_arrivals_count': Product.objects.filter(is_new_arrival=True).count(),
                'top_selling_count': Product.objects.filter(is_top_selling=True).count(),
            }
        })
