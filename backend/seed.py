import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import Category, Brand, Product, ProductReview, Order, Coupon, Testimonial

def run():
    print("Clearing database...")
    Order.objects.all().delete()
    ProductReview.objects.all().delete()
    Product.objects.all().delete()
    Brand.objects.all().delete()
    Category.objects.all().delete()
    Coupon.objects.all().delete()
    Testimonial.objects.all().delete()

    print("Seeding Categories...")
    cats = {
        'tshirts': Category.objects.create(name='T-Shirts', slug='t-shirts', description='Casual and graphic tees'),
        'shorts': Category.objects.create(name='Shorts', slug='shorts', description='Comfortable everyday shorts'),
        'shirts': Category.objects.create(name='Shirts', slug='shirts', description='Casual and formal button-downs'),
        'hoodie': Category.objects.create(name='Hoodie', slug='hoodie', description='Warm heavyweight fleece'),
        'jeans': Category.objects.create(name='Jeans', slug='jeans', description='Denim fits and cuts'),
    }

    print("Seeding Brands...")
    brands = {
        'versace': Brand.objects.create(name='Versace', slug='versace'),
        'zara': Brand.objects.create(name='Zara', slug='zara'),
        'gucci': Brand.objects.create(name='Gucci', slug='gucci'),
        'prada': Brand.objects.create(name='Prada', slug='prada'),
        'calvin_klein': Brand.objects.create(name='Calvin Klein', slug='calvin-klein'),
    }

    print("Seeding Products...")
    # 1. PDP Hero Product: One Life Graphic T-shirt
    pdp_product = Product.objects.create(
        title="One Life Graphic T-shirt",
        slug="one-life-graphic-tshirt",
        category=cats['tshirts'],
        brand=brands['calvin_klein'],
        dress_style='casual',
        price=260.00,
        original_price=300.00,
        discount_percent=40,
        rating=4.5,
        review_count=451,
        description="This graphic t-shirt is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and modern streetwear style. Pre-washed to reduce shrinkage and maintain vivid graphic clarity.",
        colors_csv="#4F4631,#314F4A,#31344F",
        sizes_csv="Small,Medium,Large,X-Large",
        stock=35,
        is_new_arrival=True,
        is_top_selling=True,
        featured=True,
        main_image="pdp-detail-1.png",
        gallery_images_csv="pdp-detail-1.png,pdp-detail-2.png,pdp-detail-3.png"
    )

    # Reviews for One Life Graphic T-shirt (exact Figma reviews)
    pdp_reviews = [
        ("Samantha D.", 5, True, "I absolutely love this t-shirt! The design is unique and the fabric feels so light and comfortable. As someone who values both fashion and comfort, this was a must-have!"),
        ("Alex M.", 5, True, "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I appreciate the attention to detail. Definitely recommending!"),
        ("Ethan R.", 4, True, "This t-shirt is a must-have for anyone who appreciates quality design. The minimalist yet stylish pattern caught my eye, and the fit is spot on."),
        ("Olivia P.", 5, True, "As a fashion enthusiast, I'm always on the lookout for unique pieces. This t-shirt is not only comfortable but also turns heads with its bold graphic design."),
        ("Liam K.", 4, True, "This graphic tee is effortlessly cool. Paired with denim or shorts, it creates an effortless streetwear aesthetic that always gets compliments."),
        ("Ava H.", 5, True, "I'm not usually into graphic tees, but the design on this one won me over. The texture is soft, breathable, and holds up great in the wash!"),
    ]
    for author, stars, ver, text in pdp_reviews:
        ProductReview.objects.create(
            product=pdp_product,
            author_name=author,
            rating=stars,
            is_verified=ver,
            comment=text
        )

    # 2. New Arrivals
    p2 = Product.objects.create(
        title="T-SHIRT WITH TAPE DETAILS",
        slug="tshirt-with-tape-details",
        category=cats['tshirts'],
        brand=brands['zara'],
        dress_style='casual',
        price=120.00,
        original_price=None,
        discount_percent=0,
        rating=4.5,
        review_count=184,
        description="Minimalist monochrome t-shirt featuring branded woven tape details across the sleeves and hemline.",
        colors_csv="#000000,#FFFFFF,#2E4057",
        sizes_csv="Small,Medium,Large,X-Large",
        stock=40,
        is_new_arrival=True,
        main_image="product-tape-tshirt.png",
        gallery_images_csv="product-tape-tshirt.png"
    )

    p3 = Product.objects.create(
        title="SKINNY FIT JEANS",
        slug="skinny-fit-jeans",
        category=cats['jeans'],
        brand=brands['calvin_klein'],
        dress_style='casual',
        price=240.00,
        original_price=260.00,
        discount_percent=20,
        rating=3.5,
        review_count=92,
        description="Ultra-stretch dark blue denim tailored for a sleek skinny silhouette with reinforced stitching.",
        colors_csv="#1B263B,#415A77,#0D1B2A",
        sizes_csv="Small,Medium,Large,X-Large",
        stock=25,
        is_new_arrival=True,
        main_image="product-skinny-jeans.png",
        gallery_images_csv="product-skinny-jeans.png"
    )

    p4 = Product.objects.create(
        title="CHECKERED SHIRT",
        slug="checkered-shirt",
        category=cats['shirts'],
        brand=brands['prada'],
        dress_style='formal',
        price=180.00,
        original_price=None,
        discount_percent=0,
        rating=4.5,
        review_count=210,
        description="Timeless buffalo checkered flannel shirt with button-down collar and twin chest patch pockets.",
        colors_csv="#C1121F,#003049,#780000",
        sizes_csv="Medium,Large,X-Large",
        stock=30,
        is_new_arrival=True,
        main_image="product-checkered-shirt.png",
        gallery_images_csv="product-checkered-shirt.png"
    )

    p5 = Product.objects.create(
        title="SLEEVE STRIPED T-SHIRT",
        slug="sleeve-striped-tshirt",
        category=cats['tshirts'],
        brand=brands['gucci'],
        dress_style='casual',
        price=130.00,
        original_price=160.00,
        discount_percent=30,
        rating=4.5,
        review_count=138,
        description="Relaxed crewneck tee with sporty contrast multi-colored arm stripes on premium cotton jersey.",
        colors_csv="#FA8072,#F4A261,#E76F51",
        sizes_csv="Small,Medium,Large",
        stock=45,
        is_new_arrival=True,
        main_image="product-striped-tshirt.png",
        gallery_images_csv="product-striped-tshirt.png"
    )

    # 3. Top Selling
    p6 = Product.objects.create(
        title="VERTICAL STRIPED SHIRT",
        slug="vertical-striped-shirt",
        category=cats['shirts'],
        brand=brands['versace'],
        dress_style='formal',
        price=212.00,
        original_price=232.00,
        discount_percent=20,
        rating=5.0,
        review_count=320,
        description="Luxury vertical stripe collared button-down shirt designed for both casual elegance and smart formalwear.",
        colors_csv="#2A9D8F,#264653,#E9C46A",
        sizes_csv="Small,Medium,Large,X-Large",
        stock=60,
        is_top_selling=True,
        main_image="product-vertical-shirt.png",
        gallery_images_csv="product-vertical-shirt.png"
    )

    p7 = Product.objects.create(
        title="COURAGE GRAPHIC T-SHIRT",
        slug="courage-graphic-tshirt",
        category=cats['tshirts'],
        brand=brands['zara'],
        dress_style='party',
        price=145.00,
        original_price=None,
        discount_percent=0,
        rating=4.0,
        review_count=215,
        description="Vibrant typography statement tee in bold sunny orange featuring high-density front typography.",
        colors_csv="#FF9F1C,#2EC4B6,#E71D36",
        sizes_csv="Small,Medium,Large",
        stock=50,
        is_top_selling=True,
        main_image="product-courage-tshirt.png",
        gallery_images_csv="product-courage-tshirt.png"
    )

    p8 = Product.objects.create(
        title="LOOSE FIT BERMUDA SHORTS",
        slug="loose-fit-bermuda-shorts",
        category=cats['shorts'],
        brand=brands['zara'],
        dress_style='gym',
        price=80.00,
        original_price=None,
        discount_percent=0,
        rating=3.0,
        review_count=85,
        description="Comfort-focused relaxed cut cargo Bermuda shorts with elasticated drawstring waistband.",
        colors_csv="#4A5759,#D8B4E2,#A5C4D4",
        sizes_csv="Small,Medium,Large,X-Large",
        stock=40,
        is_top_selling=True,
        main_image="product-bermuda-shorts.png",
        gallery_images_csv="product-bermuda-shorts.png"
    )

    p9 = Product.objects.create(
        title="FADED SKINNY JEANS",
        slug="faded-skinny-jeans",
        category=cats['jeans'],
        brand=brands['calvin_klein'],
        dress_style='casual',
        price=210.00,
        original_price=None,
        discount_percent=0,
        rating=4.5,
        review_count=190,
        description="Acid-washed light blue distressed skinny jeans with authentic whiskers and slight knee abrasion.",
        colors_csv="#A8DADC,#457B9D,#1D3557",
        sizes_csv="Medium,Large,X-Large",
        stock=35,
        is_top_selling=True,
        main_image="product-faded-jeans.png",
        gallery_images_csv="product-faded-jeans.png"
    )

    # 4. Catalog additions
    Product.objects.create(
        title="Gradient Graphic T-shirt",
        slug="gradient-graphic-tshirt",
        category=cats['tshirts'],
        brand=brands['prada'],
        dress_style='casual',
        price=145.00,
        original_price=None,
        discount_percent=0,
        rating=3.5,
        review_count=112,
        description="Artisanal gradient spray effect t-shirt made with combed ring-spun organic cotton.",
        colors_csv="#E63946,#F1FAEE,#A8DADC",
        sizes_csv="Small,Medium,Large",
        stock=28,
        main_image="product-gradient-tshirt.png",
        gallery_images_csv="product-gradient-tshirt.png"
    )

    Product.objects.create(
        title="Polo with Tipping Details",
        slug="polo-with-tipping-details",
        category=cats['shirts'],
        brand=brands['gucci'],
        dress_style='formal',
        price=180.00,
        original_price=None,
        discount_percent=0,
        rating=4.5,
        review_count=176,
        description="Sporty pique polo shirt featuring contrast ribbed collar and sleeve tipping.",
        colors_csv="#118AB2,#073B4C,#06D6A0",
        sizes_csv="Small,Medium,Large,X-Large",
        stock=32,
        main_image="product-polo-tipping.png",
        gallery_images_csv="product-polo-tipping.png"
    )

    Product.objects.create(
        title="Black Striped T-shirt",
        slug="black-striped-tshirt",
        category=cats['tshirts'],
        brand=brands['versace'],
        dress_style='party',
        price=120.00,
        original_price=150.00,
        discount_percent=30,
        rating=5.0,
        review_count=230,
        description="Parisian Breton style horizontal stripe t-shirt in monochrome jet black and crisp white.",
        colors_csv="#000000,#FFFFFF,#333333",
        sizes_csv="Small,Medium,Large",
        stock=50,
        main_image="product-black-striped.png",
        gallery_images_csv="product-black-striped.png"
    )

    Product.objects.create(
        title="Polo with Contrast Trims",
        slug="polo-with-contrast-trims",
        category=cats['shirts'],
        brand=brands['prada'],
        dress_style='formal',
        price=212.00,
        original_price=242.00,
        discount_percent=20,
        rating=4.0,
        review_count=98,
        description="Modern cut polo shirt engineered with contrasting collar accents and mother-of-pearl buttons.",
        colors_csv="#3D5A80,#98C1D9,#E0FBFC",
        sizes_csv="Small,Medium,Large,X-Large",
        stock=25,
        main_image="product-polo-contrast.png",
        gallery_images_csv="product-polo-contrast.png"
    )

    print("Seeding Coupons...")
    Coupon.objects.create(code='SHOP20', discount_percent=20, active=True)
    Coupon.objects.create(code='WELCOME10', discount_percent=10, active=True)
    Coupon.objects.create(code='SUMMER30', discount_percent=30, active=True)

    print("Seeding Testimonials (Figma exact texts)...")
    testimonials = [
        ("Sarah M.", 5, True, "\"I'm blown away by the quality and style of the clothes I received from SHOP.CO. From casual wear to elegant dresses, every item I've bought has exceeded my expectations.\""),
        ("Alex K.", 5, True, "\"Finding clothes that align with my personal style used to be a challenge until I discovered SHOP.CO. The range of options they offer is truly remarkable, catering to a variety of tastes.\""),
        ("James L.", 5, True, "\"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon SHOP.CO. The selection of clothes is not only diverse but also on-point with latest trends.\""),
        ("Mooen T.", 5, True, "\"The shopping experience was seamless, the size guides were 100% accurate, and delivery arrived 2 days earlier than scheduled. Absolutely my go-to fashion store!\""),
    ]
    for name, stars, ver, quote in testimonials:
        Testimonial.objects.create(
            customer_name=name,
            rating=stars,
            is_verified=ver,
            comment=quote
        )

    # Initial order for demo
    Order.objects.create(
        order_number="ORD-SHOPCO-101",
        customer_name="Jackob Henderson",
        customer_email="jackob.fashion@icloud.com",
        customer_phone="+1 (555) 392-1082",
        shipping_address="450 Lexington Ave, Suite 1400",
        city="New York",
        postal_code="10017",
        items_json='[{"id":1,"title":"One Life Graphic T-shirt","price":260,"size":"Large","color":"#314F4A","quantity":1},{"id":4,"title":"CHECKERED SHIRT","price":180,"size":"Medium","color":"#C1121F","quantity":1}]',
        subtotal=440.00,
        discount=88.00,
        delivery_fee=15.00,
        total_amount=367.00,
        payment_method="CREDIT_CARD",
        status="CONFIRMED"
    )

    print("Successfully seeded all database items!")

if __name__ == '__main__':
    run()
