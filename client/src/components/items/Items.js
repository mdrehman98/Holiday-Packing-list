import "./Items.css";
import ItemList from "./itemList/ItemList";

import { getItems } from "../../api/items";
import { getPackedItems } from "../../api/packedItems";
import { addToPackedItems,removeFromPackedItems } from "../../api/items";
//import { removeFromPackedItems } from "../../api/items";

import { useState, useEffect } from "react";

function Items() {
  const [allItems, setAllItems] = useState([]);
  const [packedItems, setPackedItems] = useState([]);

  const fetchAllItems = async () => {
    const items = await getItems();
    setAllItems(items);
  };

  const fetchPackedItems = async () => {
    const items = await getPackedItems();
    setPackedItems(items);
  };

  useEffect(() => {
    fetchAllItems();
    fetchPackedItems();
  }, []);

  const addToPackedItemsList = async (itemId) => {
    try {
      const response = await addToPackedItems(itemId);
      fetchPackedItems(); // Fetch the packed items again to update the list
    } catch (error) {
      console.error("Error adding item to packedItems:", error);
    }
  };

  const removefromPackedItemsList = async (itemId) => {
    try {
      const response = await removeFromPackedItems(itemId);
      fetchPackedItems(); 
    } catch (error) {
      console.error("Error adding item to packedItems:", error);
    }
  };

// In calling child ItemList, we are sending allitems list, type which acts as a flag for what buttons to show, updateFunction to add and remove function to remove

  return (
    <div className="items">
      <div>
        <h4>Suggested Items</h4>
        <ItemList items={allItems} type={1} updateFunction={addToPackedItemsList} removeFunction={removefromPackedItemsList} />
      </div>

      <div>
        <h4>Your Suitcase</h4>
        <ItemList items={packedItems} type={0} removeFunction={removefromPackedItemsList}/>
      </div>
    </div>
  );
}

export default Items;



