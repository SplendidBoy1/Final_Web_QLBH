# Import list of products

import psycopg2
import re
from json import loads

conn = psycopg2.connect(
    host="localhost",
    database="final_web",
    user="postgres",
    password="160703",
    port="5432"
)

cur = conn.cursor()

cur.execute(""" 
    CREATE TABLE IF NOT EXISTS public."Products" (
        "ID" VARCHAR(20) PRIMARY KEY,
        "Title" VARCHAR(255),
        "Rating" FLOAT,
        "Stock" INT,
        "Price" FLOAT,
        "Currency" VARCHAR(5),
        "Description" TEXT,
        "Image1" TEXT,
        "Image2" TEXT,
        "Image3" TEXT,
        "Image4" TEXT,
        "Image5" TEXT,
        "Image6" TEXT,
        "Image7" TEXT,
        "Image8" TEXT,
        "Image9" TEXT,     
        "Category" INT,   
        "SellerId" INT
    )
""")

conn.commit()

with open("Shopee - products.json", "rb") as file:
    products = loads(file.read())

count = 1

for product in products:
    id = product["id"]
    title = product["title"]
    rating = product["rating"]
    stock = product["stock"]
    price = product["initial_price"]
    currency = product["currency"]
    description = product["Product Description"]
    images = product["image"]
    # 9 images but product image might be less than 9
    image1 = images[0] if len(images) >= 1 else ""
    image2 = images[1] if len(images) >= 2 else ""
    image3 = images[2] if len(images) >= 3 else ""
    image4 = images[3] if len(images) >= 4 else ""
    image5 = images[4] if len(images) >= 5 else ""
    image6 = images[5] if len(images) >= 6 else ""
    image7 = images[6] if len(images) >= 7 else ""
    image8 = images[7] if len(images) >= 8 else ""
    image9 = images[8] if len(images) >= 9 else ""
    
    category = product["category_id"]
    seller_id = None

    cur.execute("""INSERT INTO public."Products" (
            "ID", "Title", "Rating", "Stock", "Price", "Currency", "Description", "Image1", "Image2", "Image3", "Image4", "Image5", "Image6", "Image7", "Image8", "Image9", "Category", "SellerId"
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""", 
        (id, title, rating, stock, price, currency, description, image1, image2, image3, image4, image5, image6, image7, image8, image9, category, seller_id))
    conn.commit()

    print(f"Inserted {count} products")
    count += 1