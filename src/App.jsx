import "./App.css";
import { useState } from "react";
import PersonForm from "./components/PersonForm";
import PersonTable from "./components/PersonTable";

const App = () => {
  const [records, setRecords] = useState([
    {
      id: 1,
      name: "Madesh",
      family: "Kumar",
      birthday: "2002-05-15",
      items: 5,
    },
    {
      id: 2,
      name: "Arun",
      family: "Raj",
      birthday: "2001-08-20",
      items: 3,
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    family: "",
    birthday: "",
    items: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleAdd = () => {
    setIsEditing(false);
    setEditingId(null);

    setFormData({
      name: "",
      family: "",
      birthday: "",
      items: "",
    });

    setErrors({});
    setIsFormOpen(true);
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    setEditingId(record.id);

    setFormData({
      name: record.name,
      family: record.family,
      birthday: record.birthday,
      items: record.items,
    });

    setErrors({});
    setIsFormOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousFormData) => {
      return {
        ...previousFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    if (isEditing) {
      setRecords((previousRecords) => {
        return previousRecords.map((record) => {
          if (record.id === editingId) {
            return {
              ...record,
              ...formData,
              items: Number(formData.items),
            };
          }

          return record;
        });
      });
    } else {
      const newRecord = {
        id: Date.now(),
        name: formData.name,
        family: formData.family,
        birthday: formData.birthday,
        items: Number(formData.items),
      };

      setRecords((previousRecords) => {
        return [newRecord, ...previousRecords];
      });
    }

    setIsFormOpen(false);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
  };

  const handleDelete = (id) => {
    setRecords((previousRecords) => {
      return previousRecords.filter((record) => record.id !== id);
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
    }

    if (formData.family.trim() === "") {
      newErrors.family = "Family is required";
    }

    if (formData.birthday === "") {
      newErrors.birthday = "Birthday is required";
    }

    if (formData.items === "") {
      newErrors.items = "Items is required";
    } else if (!Number.isInteger(Number(formData.items))) {
      newErrors.items = "Items must be an integer";
    } else if (Number(formData.items) < 0) {
      newErrors.items = "Items cannot be negative";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const filteredRecords = records.filter((record) => {
    return record.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="app">
      <div className="header">
       <img src="../../images/explorance.png"/>

        <button type="button" onClick={handleAdd}>
          Add Person
        </button>
      </div>

      <div className="search-container">
        <label htmlFor="search">Search by Name</label>

        <input
          id="search"
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <PersonTable
        records={filteredRecords}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <PersonForm
          formData={formData}
          isEditing={isEditing}
          onChange={handleChange}
          errors={errors}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default App;
