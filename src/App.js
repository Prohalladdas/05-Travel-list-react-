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

  function handleToggleItems(id) {
    setItem((items) => items.map((item) => item.id === id ? { ...item, packed: !item.packed } : item))
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        handleDeleteItems={handleDeleteItems}
        onToggleItems={handleToggleItems}
      />
      <Stats items={items} />
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

function PackingList({ items, handleDeleteItems, onToggleItems }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "decription") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) =>
          (<Item item={item} handleDeleteItems={handleDeleteItems} onToggleItems={onToggleItems} key={item.id} />)
        )}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="decription">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>)
}

function Item({ item, handleDeleteItems, onToggleItems }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItems(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}  {item.description}
      </span>
      <button onClick={() => handleDeleteItems(item.id)}>❌</button>
    </li>
  )
}

function Stats({ items }) {

  if (!items.length) {
    return <p className="stats">
      <em>
        Let start adding some items to your item list 🚀
      </em>
    </p>
  }

  const numItem = items.length;
  const numPackedItem = items.filter((item) => item.packed).length;
  const Percentage = Math.round(numPackedItem / numItem * 100)
  return (
    <footer className="stats">
      <em>
        {Percentage === 100 ?
          "You got everything! ready to go ✈️" :
          `👜 You have ${numItem} items on your list, and you already packed ${numPackedItem} (${Percentage}%)`
        }
      </em>
    </footer>)
}
