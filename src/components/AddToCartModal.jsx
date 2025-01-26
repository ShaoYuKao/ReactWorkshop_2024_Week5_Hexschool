import React from 'react';

function AddToCartModal({ product, qty, setQty, onConfirm }) {
  if (!product) return null;

  return (
    <div 
      id="addToCartModal" 
      className="modal fade" 
      tabIndex="-1" 
      aria-labelledby="addToCartModalLabel" 
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addToCartModalLabel">加到購物車</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="text-center">
              <img src={product.imageUrl} alt={product.title} style={{ width: '100%', height: 'auto' }} />
              <h5 className="mt-3">{product.title}</h5>
              <p className="text-muted">{product.price} 元</p>
            </div>
            <div className="mb-3">
              <label htmlFor="cartQty" className="form-label">數量</label>
              <input 
                type="number" 
                className="form-control" 
                id="cartQty" 
                value={qty} 
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value)))} 
                min="1" 
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" className="btn btn-primary" onClick={onConfirm}>確定</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCartModal;
