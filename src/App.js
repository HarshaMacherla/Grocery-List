import Header from "./components/Header";
import AddItem from "./components/AddItem";
import SearchItem from "./components/SearchItem";
import Content from "./components/Content";
import Footer from "./components/Footer";
import { useState } from "react";

const App = () => {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("groceries")) || []
  );
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");

  const handleSaveAndStore = (items) => {
    setItems(items);
    localStorage.setItem("groceries", JSON.stringify(items));
  };

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    handleSaveAndStore(listItems);
  };

  const handleCheck = async (itemId) => {
    const listItems = items.map((item) =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    handleSaveAndStore(listItems);
  };

  const handleDelete = async (itemId) => {
    const listItems = items.filter((item) => item.id !== itemId);
    handleSaveAndStore(listItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />

      <main>
        <Content
          items={items.filter((item) =>
            item.item.toLowerCase().includes(search.toLowerCase())
          )}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      </main>

      <Footer length={items ? items.length : 0} />
    </div>
  );
};

export default App;
