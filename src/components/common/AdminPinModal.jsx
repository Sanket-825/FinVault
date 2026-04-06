import { useState } from "react";

function AdminPinModal({ onClose, onSuccess }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const ADMIN_PIN = "1234";

    if (pin === ADMIN_PIN) {
      onSuccess();
      setPin("");
      setError("");
    } else {
      setError("Incorrect PIN!! Please check the README FILE for PASSWORD");
      setPin("");
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        <div className="modal-title">Admin Authentication</div>

        <div className="form-row">
          <label className="form-label">Enter 4 digit PIN</label>

          <input
            className="form-input"
            type="password"
            maxLength={4}
            value={pin}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                setPin(e.target.value);
              }
            }}
            placeholder="****"
          />

          {error && <div className="pin-error">{error}</div>}
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn-save"
            disabled={pin.length !== 4}
            onClick={handleSubmit}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPinModal;
