import React from 'react';

function RemoveCartItemModal({ cartItem, onConfirm }) {
  return (
    <div className="modal fade" id="removeCartItemModal" tabIndex="-1" aria-labelledby="removeCartItemModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold text-danger" id="removeCartItemModalLabel">確認刪除</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {cartItem && (
              <>
                <img src={cartItem.product.imageUrl} alt={cartItem.product.title} style={{ width: '40%', height: '40%', objectFit: 'cover' }} />
                <p className='mt-2'>您確定要刪除 <strong className='text-danger'>{cartItem.product.title}</strong> 嗎？</p>
              </>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>確定</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RemoveCartItemModal;
