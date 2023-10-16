import React, { useState } from 'react';

export default function Table({ data, onDelete, onSave, onDeleteSelected }) {
  const [editState, setEditState] = useState({});
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  function handleEdit(id) {
    setEditState({ [id]: true });
    const itemToEdit = data.find((item) => item.id === id);
    if (itemToEdit) {
      setEditName(itemToEdit.name);
      setEditEmail(itemToEdit.email);
      setEditRole(itemToEdit.role);
    }
  }
  function handleCheckbox(id) {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  }

  function handleCancel(id) {
    setEditState({ [id]: false });
  }

  function handleSave(id) {
    const updatedName = editName;
    const updatedEmail = editEmail;
    const updatedRole = editRole;
    onSave(id, { name: updatedName, email: updatedEmail, role: updatedRole });
    setEditState({ [id]: false });
  }
  function handleDelete(id) {
    onDelete(id);
  }
  function handleSelectAll(event) {
    if (event.target.checked) {
      const allRowIds = data.map((row) => row.id);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  }
  function handleDeleteSelected() {
    onDeleteSelected(selectedRows);
    setSelectedRows([]);
  }
  return (
    <div className="table-responsive-sm">
      <table id="adminTable" className="table">
        <thead>
          <tr className="table-dark">
            <th scope="col">
              <input
                className="form-check-input"
                type="checkbox"
                checked={selectedRows.length === data.length}
                id="flexCheckDefault"
                onChange={handleSelectAll}
              />
            </th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className={
                selectedRows.includes(item.id)
                  ? 'table-secondary'
                  : 'table-light'
              }
            >
              <td className="col-2">
                <input
                  className="form-check-input"
                  style={editState[item.id] ? { marginTop: '0.7rem' } : {}}
                  type="checkbox"
                  checked={selectedRows.includes(item.id)}
                  id={item.id}
                  onChange={() => handleCheckbox(item.id)}
                />
              </td>

              {editState[item.id] ? (
                <React.Fragment>
                  <td className="col-3">
                    <input
                      className="form-control"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </td>
                  <td className="col-3">
                    <input
                      className="form-control"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                    />
                  </td>
                  <td className="col-2">
                    <input
                      className="form-control"
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                    />
                  </td>
                  <td className="col-2">
                    <div className="row" style={{ marginTop: '0.4rem' }}>
                      <div id={item.id}>
                        <i
                          className="fa fa-floppy-o"
                          onClick={() => handleSave(item.id)}
                          aria-hidden="true"
                        />
                        <i
                          className="fa fa-times"
                          onClick={() => handleCancel(item.id)}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </td>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <td className="col-3">{item.name}</td>
                  <td className="col-3">{item.email}</td>
                  <td className="col-2">{item.role}</td>
                  <td className="col-2">
                    <div className="row">
                      <div id={item.id}>
                        <i
                          className="fa fa-pencil-square-o"
                          onClick={() => handleEdit(item.id)}
                        />
                        <i
                          className="fa fa-trash"
                          onClick={() => handleDelete(item.id)}
                        ></i>
                      </div>
                    </div>
                  </td>
                </React.Fragment>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="row" style={{ marginTop: '3rem' }}>
        <div className="col-2">
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteSelected()}
          >
            Delete Selected
          </button>
        </div>
        <div className="col-10"></div>
      </div>
    </div>
  );
}
