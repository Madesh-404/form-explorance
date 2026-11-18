import "../styles/PersonTable.css"
const PersonTable = ({ records, onEdit, onDelete }) => {
  if (records.length === 0) {
    return (
      <div className="empty-state">
        <h3>No records found</h3>
        <p>There are currently no records to display.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Family</th>
            <th>Birthday</th>
            <th>Items</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.name}</td>
              <td>{record.family}</td>
              <td>{record.birthday}</td>
              <td>{record.items}</td>

              <td>
                <button type="button" onClick={() => onEdit(record)}>
                  Edit
                </button>

                <button type="button" onClick={() => onDelete(record.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonTable;
