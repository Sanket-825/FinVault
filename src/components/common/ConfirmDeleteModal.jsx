function ConfirmDeleteModal({ onClose, onConfirm }) {

  return (

    <div
      className="modal-overlay"
      onClick={(e)=>e.target===e.currentTarget && onClose()}
    >

      <div className="modal">

        <div className="modal-title">
          Confirm Delete
        </div>

        <div style={{
          marginTop:10,
          color:"var(--text2)"
        }}>

          Are you sure you want to delete this transaction?

        </div>

        <div className="modal-actions">

          <button
            className="btn-cancel"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn-save"
            style={{
              background:"#ef4444"
            }}
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );

}

export default ConfirmDeleteModal;