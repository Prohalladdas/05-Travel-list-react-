import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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

  function handleclearBtn() {
    const conformed = window.confirm("Are you sure to delete your all items")
    if (conformed) setItem([])
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        handleDeleteItems={handleDeleteItems}
        onToggleItems={handleToggleItems}
        handleclearBtn={handleclearBtn}
      />
      <Stats items={items} />
    </div>
  )
}



