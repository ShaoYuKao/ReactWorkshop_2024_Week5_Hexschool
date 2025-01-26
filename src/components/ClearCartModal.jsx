import React from 'react';

function ClearCartModal({ onConfirm }) {
  return (
    <div className="modal fade" id="clearCartModal" tabIndex="-1" aria-labelledby="clearCartModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold text-danger" id="clearCartModalLabel">確認清空購物車</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>您確定要清空購物車嗎？</p>
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

export default ClearCartModal;
