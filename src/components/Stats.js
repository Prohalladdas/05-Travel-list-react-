export default function Stats({ items }) {

    if (!items.length) {
        return <p className="stats">
            <em>
                Let start adding some items to your item list 🚀
            </em>
        </p>;
    }

    const numItem = items.length;
    const numPackedItem = items.filter((item) => item.packed).length;
    const Percentage = Math.round(numPackedItem / numItem * 100);
    return (
        <footer className="stats">
            <em>
                {Percentage === 100 ?
                    "You got everything! ready to go ✈️" :
                    `👜 You have ${numItem} items on your list, and you already packed ${numPackedItem} (${Percentage}%)`}
            </em>
        </footer>);
}
