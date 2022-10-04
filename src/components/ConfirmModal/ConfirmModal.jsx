import React from "react";
import "./ConfirmModal.modules.css";

const ConfirmModal = ({
  id,
  title,
  body,
  handleConfirm,
  confirmText,
  cancelText,
  confirmVariant,
  cancelVariant,
}) => {
  return (
    // Modal
    <div
      className="modal fade"
      id={id}
      tabindex="-1"
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>
              {title}
            </h5>
            <button
              className="btn-close"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{body}</div>
          <div className="modal-footer">
            <button
              type="button"
              className={`btn btn-${cancelVariant}`}
              data-bs-dismiss="modal"
            >
              {cancelText}
            </button>
            <button
              type="button"
              className={`btn btn-${confirmVariant}`}
              onClick={handleConfirm}
              data-bs-dismiss="modal"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
