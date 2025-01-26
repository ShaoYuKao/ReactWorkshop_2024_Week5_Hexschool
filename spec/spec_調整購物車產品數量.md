# 調整購物車產品數量

- Request Method: `PUT`
- Request URL: `​/v2​/api​/{api_path}​/cart​/{id}`
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
    "message": "已更新購物車",
    "data": {
      "product_id": "-L9tH8jxVb2Ka_DYPwng",
      "qty": 1
    }
  }
  ```
