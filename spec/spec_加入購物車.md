# 加入購物車

- Request Method: `POST`
- Request URL: `/v2​/api​/{api_path}​/cart`
- Request Payload:

  ```json
  {
    "data": {
      "product_id": "-L9tH8jxVb2Ka_DYPwng",
      "qty": 1
    }
  }
  ```

- Response Payload:
  ```json
  {
    "success": true,
    "message": "已加入購物車",
    "data": {
      "product_id": "-L9tH8jxVb2Ka_DYPwng",
      "qty": 1,
      "id": "-LAl5v_2MhWeh3linQxx",
      "total": 600,
      "final_total": 600,
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
      }
    }
  }
  ```
