from django.urls import path
from .views import (
    ProductListView, ProductDetailView, AddProductReviewView,
    CategoryListView, BrandListView, ValidateCouponView,
    CreateOrderView, OrderDetailView, TestimonialListView,
    SystemOverviewView
)

urlpatterns = [
    path('system/overview/', SystemOverviewView.as_view(), name='system-overview'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:id>/', ProductDetailView.as_view(), name='product-detail'),
    path('products/<int:product_id>/reviews/', AddProductReviewView.as_view(), name='add-review'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('brands/', BrandListView.as_view(), name='brand-list'),
    path('coupons/validate/', ValidateCouponView.as_view(), name='validate-coupon'),
    path('orders/', CreateOrderView.as_view(), name='create-order'),
    path('orders/<str:order_number>/', OrderDetailView.as_view(), name='order-detail'),
    path('testimonials/', TestimonialListView.as_view(), name='testimonial-list'),
]
