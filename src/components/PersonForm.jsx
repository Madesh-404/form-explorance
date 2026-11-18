import "../styles/PersonForm.css"
const PersonForm = ({
  formData,
  errors,
  isEditing,
  onChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{isEditing ? "Edit Person" : "Add Person"}</h2>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={onChange}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="family">Family</label>

            <input
              id="family"
              name="family"
              type="text"
              value={formData.family}
              onChange={onChange}
            />

            {errors.family && <p className="error-message">{errors.family}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="birthday">Birthday</label>

            <input
              id="birthday"
              name="birthday"
              type="date"
              value={formData.birthday}
              onChange={onChange}
            />

            {errors.birthday && (
              <p className="error-message">{errors.birthday}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="items">Items</label>

            <input
              id="items"
              name="items"
              type="number"
              min="0"
              value={formData.items}
              onChange={onChange}
            />

            {errors.items && <p className="error-message">{errors.items}</p>}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel}>
              Cancel
            </button>

            <button type="submit">{isEditing ? "Update" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonForm;
