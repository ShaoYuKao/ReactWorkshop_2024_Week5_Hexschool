import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as bootstrap from "bootstrap";
import './App.css';
import FullPageLoading from './components/FullPageLoading';
import ProductModal from './components/ProductModal';
import AddToCartModal from './components/AddToCartModal';
import Pagination from './components/Pagination';
import RemoveCartItemModal from './components/RemoveCartItemModal';
import ClearCartModal from './components/ClearCartModal';
import { useForm } from 'react-hook-form';

const API_BASE = "https://ec-course-api.hexschool.io/v2";
const API_PATH = "202501-react-shaoyu";

function App() {
  const [products, setProducts] = useState([]); // 產品列表
  const [page, setPage] = useState(1);  // 當前頁數
  const [totalPages, setTotalPages] = useState(1); // 總頁數
  const [searchTerm, setSearchTerm] = useState(''); // 搜尋關鍵字
  const [loading, setLoading] = useState(false); // 加載狀態
  const searchCategoryRef = useRef(null); // 分類搜尋的參考
  const [selectedProduct, setSelectedProduct] = useState(null); // 選擇的產品
  const [cartProduct, setCartProduct] = useState(null); // 加到購物車的產品
  const [cartQty, setCartQty] = useState(1);  // 加到購物車的數量
  const [cartItems, setCartItems] = useState([]); // 購物車項目
  const [cartTotal, setCartTotal] = useState(0); // 購物車總計
  const [cartFinalTotal, setCartFinalTotal] = useState(0); // 購物車折扣後總計
  const [mode, setMode] = useState('add'); // 模式
  const [editCartId, setEditCartId] = useState(null); // 編輯的購物車ID
  const [removeCartItem, setRemoveCartItem] = useState(null); // 要刪除的購物車項目

  const { register, handleSubmit, formState: { errors } } = useForm();  // 表單處理

  /**
   * 提交訂單資料的處理函式
   * 
   * @param {Object} data - 包含使用者訂單資料的物件
   * @param {string} data.name - 使用者名稱
   * @param {string} data.email - 使用者電子郵件
   * @param {string} data.tel - 使用者電話號碼
   */
  const onSubmit = (data) => {
    if (cartItems.length <= 0) {
      alert('購物車內無資料!!');
      return;
    }
    setLoading(true); // 開始加載
    axios.post(`${API_BASE}/api/${API_PATH}/order`, {
      data: {
        user: {
          name: data.name,
          email: data.email,
          tel: data.tel,
          address: data.address
        },
        message: data.message
      }
    })
    .then(response => {
      alert('訂單已送出');
      fetchCart(); // 更新購物車資訊
    })
    .catch(error => {
      console.error('Error submitting order:', error);
      alert('送出訂單失敗!!');
    })
    .finally(() => {
      setLoading(false); // 結束加載
    });
  };

  /**
   * 當表單驗證錯誤時觸發的回調函數
   * 
   * @param {Object} errors - 包含所有錯誤訊息的物件
   * @param {Object} errors.key - 錯誤訊息的鍵值對
   * @param {string} errors.key.message - 錯誤訊息的內容
   */
  const onError = (errors) => {
    Object.keys(errors).forEach(key => {
      console.log(errors[key].message);
    });
  };

  useEffect(() => {
    setLoading(true); // 開始加載
    axios.get(`${API_BASE}/api/${API_PATH}/products?page=${page}&category=${searchTerm}`)
      .then(response => {
        setProducts(response.data.products);
        setTotalPages(response.data.pagination.total_pages);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        alert('取得產品資料失敗!!');
      })
      .finally(() => {
        setLoading(false); // 結束加載
        fetchCart(); // 更新購物車資訊
      });
  }, [page, searchTerm]);

  /**
   * 處理頁面變更的函式
   * @param {number} newPage - 新的頁面號碼
   * @returns {void} 
   */
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  /**
   * 處理搜尋操作的函式
   * 當呼叫此函式時，會將頁面重置為第一頁，並設定搜尋關鍵字
   */
  const handleSearch = () => {
    setPage(1); // 重置頁面為第一頁
    setSearchTerm(searchCategoryRef.current.value); // 設定搜尋關鍵字
  };

  /**
   * 單一產品細節 API 呼叫
   * @param {string} productId - 產品ID
   * @returns {void}
   */
  const handleViewMore = (productId) => {
    setLoading(true); // 開始加載
    axios.get(`${API_BASE}/api/${API_PATH}/product/${productId}`)
      .then(response => {
        setSelectedProduct(response.data.product);  // 設定選擇的產品
        const productModal = new bootstrap.Modal(document.getElementById('productModal'), {
          backdrop: 'static'
        });
        productModal.show();
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        alert('取得產品細節失敗!!');
      })
      .finally(() => {
        setLoading(false); // 結束加載
      });
  };

  /**
   * 處理加到購物車 Modal 的函式
   * @param {string} productId - 產品ID
   * @returns {void}
   */
  const handleAddToCart = (productId) => {
    setLoading(true); // 開始加載
    axios.get(`${API_BASE}/api/${API_PATH}/product/${productId}`)
      .then(response => {
        setCartProduct(response.data.product);  // 設定加到購物車的產品
        setCartQty(1); // 重置數量為1
        setMode('add'); // 設定模式為新增
        const addToCartModal = new bootstrap.Modal(document.getElementById('addToCartModal'), {
          backdrop: 'static'
        });
        addToCartModal.show();
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        alert('取得產品細節失敗!!');
      })
      .finally(() => {
        setLoading(false); // 結束加載
      });
  };

  /**
   * 取得購物車列表 API 呼叫
   * @returns {void}
   */
  const fetchCart = () => {
    setLoading(true); // 開始加載
    axios.get(`${API_BASE}/api/${API_PATH}/cart`)
      .then(response => {
        setCartItems(response.data.data.carts);
        setCartTotal(response.data.data.total);
        setCartFinalTotal(response.data.data.final_total);
      })
      .catch(error => {
        console.error('Error fetching cart:', error);
        alert('取得購物車資料失敗!!');
      })
      .finally(() => {
        setLoading(false); // 結束加載
      });
  };

  /**
   * 處理加入購物車的 API 呼叫
   * @returns {void}
   */
  const handleConfirmAddToCart = () => {
    setLoading(true); // 開始加載
    axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
      data: {
        product_id: cartProduct.id,
        qty: cartQty
      }
    })
      .then(response => {
        alert('已加入購物車');
        const addToCartModal = bootstrap.Modal.getInstance(document.getElementById('addToCartModal'));
        addToCartModal.hide();
        fetchCart(); // 更新購物車資訊
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        alert('加入購物車失敗!!');
      })
      .finally(() => {
        setLoading(false); // 結束加載
      });
  };

  /**
   * 編輯購物車項目 Modal
   * 
   * @param {Object} cartItem - 購物車項目
   * @param {string} cartItem.id - 購物車項目的ID
   * @param {Object} cartItem.product - 購物車項目的產品
   * @param {number} cartItem.qty - 購物車項目的數量
   */
  const handleEditCart = (cartItem) => {
    setEditCartId(cartItem.id); // 設定編輯的購物車ID
    setCartProduct(cartItem.product);  // 設定加到購物車的產品
    setCartQty(cartItem.qty); // 設定數量
    setMode('edit'); // 設定模式為編輯
    const addToCartModal = new bootstrap.Modal(document.getElementById('addToCartModal'), {
      backdrop: 'static'
    });
    addToCartModal.show();
  };

  /**
   * 調整購物車產品數量 API 呼叫
   * 確認編輯購物車的處理函數
   * 
   * 此函數會發送一個 PUT 請求到 API 以更新購物車中的商品數量
   * 在請求發送前會設置加載狀態，請求成功後會顯示成功訊息並隱藏模態框，
   * 並重新獲取購物車資訊。若請求失敗，會顯示錯誤訊息
   * 
   * @function handleConfirmEditCart
   * @returns {void}
   */
  const handleConfirmEditCart = () => {
    setLoading(true); // 開始加載
    axios.put(`${API_BASE}/api/${API_PATH}/cart/${editCartId}`, {
      data: {
        product_id: cartProduct.id,
        qty: cartQty
      }
    })
      .then(response => {
        alert('已更新購物車');
        const addToCartModal = bootstrap.Modal.getInstance(document.getElementById('addToCartModal'));
        addToCartModal.hide();
        fetchCart(); // 更新購物車資訊
      })
      .catch(error => {
        console.error('Error updating cart:', error);
        alert('更新購物車失敗!!');
      })
      .finally(() => {
        setLoading(false); // 結束加載
      });
  };

  /**
   * 處理刪除購物車項目的函式 Modal
   * @param {Object} cartItem - 購物車項目
   */
  const handleRemoveCartItem = (cartItem) => {
    setRemoveCartItem(cartItem); // 設定要刪除的購物車項目
    const removeCartItemModal = new bootstrap.Modal(document.getElementById('removeCartItemModal'), {
      backdrop: 'static'
    });
    removeCartItemModal.show();
  };

  /**
   * 單一刪除購物車項目 API 呼叫
   * 確認刪除購物車項目的處理函數
   * @returns {void}
   */
  const handleConfirmRemoveCartItem = () => {
    setLoading(true); // 開始加載
    axios.delete(`${API_BASE}/api/${API_PATH}/cart/${removeCartItem.id}`)
      .then(response => {
        alert('已刪除購物車項目');
        const removeCartItemModal = bootstrap.Modal.getInstance(document.getElementById('removeCartItemModal'));
        removeCartItemModal.hide();
        fetchCart(); // 更新購物車資訊
      })
      .catch(error => {
        console.error('Error removing cart item:', error);
        alert('刪除購物車項目失敗!!');
      })
      .finally(() => {
        setLoading(false); // 結束加載
      });
  };

  /**
   * 顯示清空購物車的 Modal 視窗
   * 使用 Bootstrap 的 Modal 元件，並將 backdrop 設定為 'static'，
   * 以防止使用者點擊背景關閉模態視窗。
   */
  const handleClearCart = () => {
    const clearCartModal = new bootstrap.Modal(document.getElementById('clearCartModal'), {
      backdrop: 'static'
    });
    clearCartModal.show();
  };

  /**
   * 刪除購物車項目全部 API 呼叫
   * 清空購物車的處理函式
   * 當用戶確認清空購物車時，會發送請求至伺服器以刪除購物車中的所有項目
   * 在請求過程中會顯示加載狀態，並在請求完成後更新購物車資訊
   * 如果請求成功，會顯示成功訊息並關閉清空購物車的模態框
   * 如果請求失敗，會顯示錯誤訊息
   */
  const handleConfirmClearCart = () => {
    setLoading(true); // 開始加載
    axios.delete(`${API_BASE}/api/${API_PATH}/carts`)
      .then(response => {
        alert('已清空購物車');
        const clearCartModal = bootstrap.Modal.getInstance(document.getElementById('clearCartModal'));
        clearCartModal.hide();
        fetchCart(); // 更新購物車資訊
      })
      .catch(error => {
        console.error('Error clearing cart:', error);
        alert('清空購物車失敗!!');
      })
      .finally(() => {
        setLoading(false); // 結束加載
      });
  };

  return (
    <div id="app">
      {loading && <FullPageLoading />}
      <div className="container">
        <div className="mt-4">
          {/* 產品Modal */}
          <ProductModal selectedProduct={selectedProduct} />
          {/* 產品Modal */}
          {/* 加到購物車Modal */}
          <AddToCartModal 
            product={cartProduct} 
            qty={cartQty} 
            setQty={setCartQty} 
            onConfirm={mode === 'edit' ? handleConfirmEditCart : handleConfirmAddToCart} 
            mode={mode}
          />
          {/* 加到購物車Modal */}
          {/* 刪除購物車項目Modal */}
          <RemoveCartItemModal 
            cartItem={removeCartItem} 
            onConfirm={handleConfirmRemoveCartItem} 
          />
          {/* 刪除購物車項目Modal */}
          <ClearCartModal onConfirm={handleConfirmClearCart} />
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="searchCategory">分類：</label>
            </div>
            <div className="col-auto">
              <input id="searchCategory" ref={searchCategoryRef} className="form-control" type="search" placeholder="搜尋分類" aria-label="搜尋分類" name="searchCategory" autoComplete='off' />
            </div>
            <div className="col-auto">
              <button className="btn btn-outline-primary" type="button" onClick={handleSearch}>搜尋</button>
            </div>
          </div>
          <table className="table align-middle">
            <thead>
              <tr>
                <th>分類</th>
                <th>圖片</th>
                <th>商品名稱</th>
                <th>價格</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.category}</td>
                  <td style={{ width: '200px' }}>
                    <div style={{ height: '100px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <img src={product.imageUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </td>
                  <td>{product.title}</td>
                  <td>
                    <del className="h6">{product.origin_price}</del>
                    <div className="h5">{product.price}</div>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button type="button" className="btn btn-outline-secondary" onClick={() => handleViewMore(product.id)}>
                        <i className="fas fa-spinner fa-pulse"></i>
                        查看更多
                      </button>
                      <button type="button" className="btn btn-outline-danger" onClick={() => handleAddToCart(product.id)}>
                        <i className="fas fa-spinner fa-pulse"></i>
                        加到購物車
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          {
            totalPages > 1 && (
              <Pagination 
                totalPages={totalPages} 
                currentPage={page} 
                onPageChange={handlePageChange} 
              />
            )
          }
          {/* Pagination */}
          <div className="text-end">
            <button 
              type="button" 
              id="btnClearCart" 
              className="btn btn-outline-danger" 
              onClick={handleClearCart}
            >清空購物車</button>
          </div>
          <table className="table align-middle">
            <thead>
              <tr>
                <th style={{ width: '150px' }}></th>
                <th>品名</th>
                <th style={{ width: '150px' }}>數量/單位</th>
                <th>單價</th>
                <th style={{ width: '150px' }}></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>
                    <img src={item.product.imageUrl} alt={item.product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </td>
                  <td>{item.product.title}</td>
                  <td>{item.qty} / {item.product.unit}</td>
                  <td>{item.product.price}</td>
                  <td>
                    <button type="button" id={'btnEditCartItem' + item.id} className="btn btn-outline-secondary" onClick={() => handleEditCart(item)}>調整</button>
                    <button type="button" id={'btnRemoveCartItem' + item.id} className="btn btn-outline-danger" onClick={() => handleRemoveCartItem(item)}>移除</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-end">總計</td>
                <td className="text-end">{cartTotal}</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan="3" className="text-end text-success">折扣價</td>
                <td className="text-end text-success">{cartFinalTotal}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="my-5 row justify-content-center">
          <form className="col-md-6" onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                className="form-control" 
                placeholder="請輸入 Email" 
                {...register('email', { required: 'Email 是必填欄位', pattern: { value: /^\S+@\S+$/i, message: 'Email 格式不正確' } })}
              />
              {errors.email && <span className="text-danger">{errors.email.message}</span>}
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">收件人姓名</label>
              <input 
                id="name" 
                name="name" 
                type="text" 
                className="form-control" 
                placeholder="請輸入姓名" 
                {...register('name', { required: '姓名是必填欄位' })}
              />
              {errors.name && <span className="text-danger">{errors.name.message}</span>}
            </div>

            <div className="mb-3">
              <label htmlFor="tel" className="form-label">收件人電話</label>
              <input 
                id="tel" 
                name="tel" 
                type="tel" 
                className="form-control" 
                placeholder="請輸入電話" 
                {...register('tel', { required: '電話是必填欄位', minLength: { value: 8, message: '電話號碼需超過 8 碼' } })}
              />
              {errors.tel && <span className="text-danger">{errors.tel.message}</span>}
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">收件人地址</label>
              <input 
                id="address" 
                name="address" 
                type="text" 
                className="form-control" 
                placeholder="請輸入地址" 
                {...register('address', { required: '地址是必填欄位' })}
              />
              {errors.address && <span className="text-danger">{errors.address.message}</span>}
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">留言</label>
              <textarea 
                id="message" 
                className="form-control" 
                cols="30" 
                rows="10" 
                {...register('message')}
              ></textarea>
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-danger">送出訂單</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App
