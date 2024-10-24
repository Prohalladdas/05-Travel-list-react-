export default function Item({ item, handleDeleteItems, onToggleItems }) {
    return (
        <li>
            <input type="checkbox" value={item.packed} onChange={() => onToggleItems(item.id)} />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity}  {item.description}
            </span>
            <button onClick={() => handleDeleteItems(item.id)}>❌</button>
        </li>
    );
}
