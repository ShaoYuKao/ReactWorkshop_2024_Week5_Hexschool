# 單一產品細節

- Request Method: `GET`
- Request URL: `​/v2​/api​/{api_path}​/product​/{id}`
- Request QueryString:
  - id

- Response Payload:
  ```json
  {
    "success": true,
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
      "origin_price": 100,
      "price": 600,
      "title": "[賣]動物園造型衣服3",
      "unit": "個"
    }
  }
  ```

