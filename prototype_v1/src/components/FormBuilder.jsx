import React, { useState } from "react";

const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("text");

  const addFormField = () => {
    if (fieldName.trim() === "") {
      alert("Enter a field name");
      return;
    }

    const newField = {
      name: fieldName,
      type: fieldType,
    };

    setFormFields([...formFields, newField]);
    setFieldName("");
  };

  const removeFormField = (index) => {
    const updatedFormFields = [...formFields];
    updatedFormFields.splice(index, 1);
    setFormFields(updatedFormFields);
  };

  const renderFormFields = () => {
    return formFields.map((field, index) => (
      <div key={index}>
        <span>{field.name} ({field.type})</span>
        <button onClick={() => removeFormField(index)}>Remove</button>
      </div>
    ));
  };

  return (
    <div>
      <h2>Form Builder</h2>
      <div>
        <label htmlFor="fieldName">Field Name:</label>
        <input
          type="text"
          id="fieldName"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="fieldType">Field Type:</label>
        <select
          id="fieldType"
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="checkbox">Checkbox</option>
        </select>
      </div>
      <button onClick={addFormField}>Add Field</button>
      {formFields.length > 0 && (
        <div>
          <h3>Form Fields:</h3>
          {renderFormFields()}
        </div>
      )}
    </div>
  );
};

export default FormBuilder;
