// import { hasFormSubmit } from "@testing-library/user-event/dist/utils";
import { useState } from "react";

export default function App() {
  const [items, setItem] = useState([])

  function handleAddItems(item) {
    setItem((items) => [...items, item])
  }

  function handleDeleteItems(id) {
    setItem((items) => items.filter((item) => item.id !== id))
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} handleDeleteItems={handleDeleteItems} />
      <Stats />
    </div>
  )
}
function Logo() {
  return <h1>🌴 Far Away 💼</h1>
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);


  function HandleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() }
    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);

  }

  return <form className="add-form" onSubmit={HandleSubmit}>
    <h3 >What do you need for your 😊 trip?</h3>

    <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
      {Array.from({ length: 20 }, (_, i) => i + 1).map(
        (num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
    </select>
    <input type="text" placeholder="Item..." value={description} onChange={(e) =>
      setDescription(e.target.value)
    } />
    <button>Add</button>
  </form>
}

function PackingList({ items, handleDeleteItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) =>
          (<Item item={item} handleDeleteItems={handleDeleteItems} key={item.id} />)
        )}
      </ul>
    </div>)
}

function Item({ item, handleDeleteItems }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}  {item.description}
      </span>
      <button onClick={() => handleDeleteItems(item.id)}>❌</button>
    </li>
  )
}

function Stats() {
  return <footer className="stats">
    <em>👜 You have X items on your list, and you already packed X (X%)</em>
  </footer>
}
