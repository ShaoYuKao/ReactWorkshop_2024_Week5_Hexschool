import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as bootstrap from "bootstrap";
import './App.css';
import FullPageLoading from './components/FullPageLoading';
import ProductModal from './components/ProductModal';
import AddToCartModal from './components/AddToCartModal'; // 新增這行

const API_BASE = "https://ec-course-api.hexschool.io/v2";
const API_PATH = "202501-react-shaoyu";

function App() {
  const [products, setProducts] = useState([]); // 產品列表
  const [page, setPage] = useState(1);  // 當前頁數
  const [totalPages, setTotalPages] = useState(1); // 總頁數
  const [searchTerm, setSearchTerm] = useState(''); // 搜尋關鍵字
  const [loading, setLoading] = useState(false); // 加載狀態
  const searchCategoryRef = useRef(null); // 分類搜尋的參考
  const [selectedProduct, setSelectedProduct] = useState(null); // 選中的產品
  const [cartProduct, setCartProduct] = useState(null); // 新增這行
  const [cartQty, setCartQty] = useState(1); // 新增這行

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
      });
  }, [page, searchTerm]);

  /**
   * 處理頁面變更的函式。
   * @param {number} newPage - 新的頁面號碼。
   * @returns {void} 
   */
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  /**
   * 處理搜尋操作的函式。
   * 當呼叫此函式時，會將頁面重置為第一頁，並設定搜尋關鍵字。
   */
  const handleSearch = () => {
    setPage(1); // 重置頁面為第一頁
    setSearchTerm(searchCategoryRef.current.value); // 設定搜尋關鍵字
  };

  /**
   * 處理查看更多的函式。
   * @param {string} productId - 產品ID。
   * @returns {void}
   */
  const handleViewMore = (productId) => {
    setLoading(true); // 開始加載
    axios.get(`${API_BASE}/api/${API_PATH}/product/${productId}`)
      .then(response => {
        setSelectedProduct(response.data.product);
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
   * 處理加到購物車的函式。
   * @param {string} productId - 產品ID。
   * @returns {void}
   */
  const handleAddToCart = (productId) => {
    setLoading(true); // 開始加載
    axios.get(`${API_BASE}/api/${API_PATH}/product/${productId}`)
      .then(response => {
        setCartProduct(response.data.product);
        setCartQty(1); // 重置數量為1
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
   * 處理加入購物車的 API 呼叫。
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
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        alert('加入購物車失敗!!');
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
            onConfirm={handleConfirmAddToCart} 
          />
          {/* 加到購物車Modal */}
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
              <div className="d-flex justify-content-end">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(page - 1)} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li key={index} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                      </li>
                    ))}
                    <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(page + 1)} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )
          }
          {/* Pagination */}
          <div className="text-end">
            <button className="btn btn-outline-danger" type="button">清空購物車</button>
          </div>
          <table className="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style={{ width: '150px' }}>數量/單位</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
              {/* Cart rows here */}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-end">總計</td>
                <td className="text-end"></td>
              </tr>
              <tr>
                <td colSpan="3" className="text-end text-success">折扣價</td>
                <td className="text-end text-success"></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="my-5 row justify-content-center">
          <form className="col-md-6">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input id="email" name="email" type="email" className="form-control" placeholder="請輸入 Email" />
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">收件人姓名</label>
              <input id="name" name="姓名" type="text" className="form-control" placeholder="請輸入姓名" />
            </div>

            <div className="mb-3">
              <label htmlFor="tel" className="form-label">收件人電話</label>
              <input id="tel" name="電話" type="text" className="form-control" placeholder="請輸入電話" />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">收件人地址</label>
              <input id="address" name="地址" type="text" className="form-control" placeholder="請輸入地址" />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">留言</label>
              <textarea id="message" className="form-control" cols="30" rows="10"></textarea>
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
