import React from 'react';

function ProductModal({ selectedProduct }) {
  return (
    <div
      id="productModal"
      className="modal fade"
      tabIndex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content border-0">
          <div className="modal-header bg-dark text-white">
            <h5 id="productModalLabel" className="modal-title">
              <span>商品資訊</span>
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-4">
                <div className="mb-2">
                  <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">
                      圖片
                    </label>
                    <img
                      className="img-fluid"
                      src={selectedProduct?.imageUrl || ""}
                      alt={selectedProduct?.title || ""}
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-8">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">標題</label>
                  <input
                    id="selectedProductTitle"
                    type="text"
                    className="form-control"
                    placeholder=""
                    defaultValue={selectedProduct?.title || ""}
                    disabled
                  />
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="category" className="form-label">分類</label>
                    <input
                      id="category"
                      type="text"
                      className="form-control"
                      placeholder=""
                      defaultValue={selectedProduct?.category || ""}
                      disabled
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="unit" className="form-label">單位</label>
                    <input
                      id="unit"
                      type="text"
                      className="form-control"
                      placeholder=""
                      defaultValue={selectedProduct?.unit || ""}
                      disabled
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="origin_price" className="form-label">原價</label>
                    <input
                      id="origin_price"
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder=""
                      defaultValue={selectedProduct?.origin_price || ""}
                      disabled
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="price" className="form-label">售價</label>
                    <input
                      id="price"
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder=""
                      defaultValue={selectedProduct?.price || ""}
                      disabled
                    />
                  </div>
                </div>
                <hr />

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">產品描述</label>
                  <textarea
                    id="description"
                    className="form-control"
                    placeholder=""
                    defaultValue={selectedProduct?.description || ""}
                    disabled
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">說明內容</label>
                  <textarea
                    id="content"
                    className="form-control"
                    placeholder=""
                    defaultValue={selectedProduct?.content || ""}
                    disabled
                  ></textarea>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      id="is_enabled"
                      className="form-check-input"
                      type="checkbox"
                      checked={selectedProduct?.is_enabled || false}
                      disabled
                    />
                    <label className="form-check-label" htmlFor="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
