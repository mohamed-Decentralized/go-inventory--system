import { useEffect, useState } from "react";

const CORE_URL = "http://localhost:8000";

const initialValue = {
  id: "",
  name: "",
  price: "",
  stock: "",
};

function Inventory() {
  const [formValue, setFormValue] = useState(initialValue);
  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const formData = {
      ...formValue,
      [id]:
        id == "id" || id == "price" || id == "stock" ? Number(value) : value,
    };
    setFormValue(formData);
  };

  const fetchItems = async () => {
    const response = await fetch(CORE_URL + "/api/items");
    const data = await response.json();
    setItems(data);
  };

  const handleAddItem = async () => {
    await fetch(CORE_URL + "/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValue),
    });
    fetchItems();
    setFormValue(initialValue);
  };

  const handleRemoveItem = async (id) => {
    await fetch(CORE_URL + `/api/items/${id}`, { method: "DELETE" });
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>Inventory</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="number"
          placeholder="ID"
          id="id"
          value={formValue.id}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          placeholder="Name"
          value={formValue.name}
          id="name"
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="number"
          placeholder="Price"
          id="price"
          value={formValue.price}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="number"
          id="stock"
          placeholder="Stock"
          value={formValue.stock}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleAddItem}
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Add Item
        </button>
      </div>

      <ul style={{ listStyleType: "none", padding: "0" }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <span>
              {item.name} - ${item.price} ({item.stock} in stock)
            </span>
            <button
              onClick={() => handleRemoveItem(item.id)}
              style={{
                padding: "5px 10px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#f44336",
                color: "white",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inventory;
