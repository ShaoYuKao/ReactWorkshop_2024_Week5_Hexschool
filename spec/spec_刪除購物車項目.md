# 刪除購物車項目

## 單一刪除

- Request Method: `DELETE`
- Request URL: `​/v2​/api​/{api_path}​/cart​/{id}`

- Response Payload:
  ```json
  {
    "success": true,
    "message": "已刪除"
  }
  ```

## 全部刪除

- Request Method: `DELETE`
- Request URL: `​/v2​/api​/{api_path}​/carts`

- Response Payload:
  ```json
  {
    "success": true,
    "message": "已刪除"
  }
  ```
