# 購物車列表

- Request Method: `GET`
- Request URL: `​/v2​/api​/{api_path}​/cart`

- Response Payload:
  ```json
  {
    "success": true,
    "data": {
      "carts": [
        {
          "coupon": {
            "code": "testCode",
            "due_date": 6547658,
            "id": "-L9uIs5EfPibJpwwTMhN",
            "is_enabled": 1,
            "percent": 60,
            "title": "超級特惠價格"
          },
          "final_total": 2160,
          "id": "-LATwxc_bIJu-AR4AlNj",
          "product": {
            "category": "衣服3",
            "content": "這是內容",
            "description": "Sit down please 名設計師設計",
            "id": "-L9tH8jxVb2Ka_DYPwng",
            "imageUrl": "主圖網址",
            "imagesUrl": [
              "圖片網址一",
              "圖片網址二",
              "圖片網址三",
              "圖片網址四",
              "圖片網址五"
            ],
            "is_enabled": 1,
            "num": 1,
            "origin_price": 500,
            "price": 600,
            "title": "[賣]動物園造型衣服3",
            "unit": "個"
          },
          "product_id": "-L9tH8jxVb2Ka_DYPwng",
          "qty": 6,
          "total": 3600
        }
      ],
      "total": 3600,
      "final_total": 2160
    },
    "messages": []
  }
  ```
