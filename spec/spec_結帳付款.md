# 結帳付款

- 購物車無產品時不建議發出結帳請求。因此購物車無產品時[送出訂單]按鈕為 `disabled` 狀態。
- 送出訂單後，購物車需要清除原本項目。因此呼叫 `handleClearCart` 方法來清空購物車。

## API

- Request Method: `POST`
- Request URL: `​/v2​/api​/{api_path}​/order`
- Request Payload:
  ```json
  {
    "data": {
      "user": {
        "name": "test",
        "email": "test@gmail.com",
        "tel": "0912346768",
        "address": "kaohsiung"
      },
      "message": "這是留言"
    }
  }
  ```

- Response Payload:
  ```json
  {
    "success": true,
    "message": "已建立訂單",
    "total": 100,
    "create_at": 1523539519,
    "orderId": "-L9tH8jxVb2Ka_DYPwng"
  }
  ```
