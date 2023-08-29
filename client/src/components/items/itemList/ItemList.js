import "./ItemList.css";
import { addToPackedItems } from "/Users/ataur/Documents/technical-test-mypack-main/client/src/api/items.js";
import { removeFromPackedItems } from "/Users/ataur/Documents/technical-test-mypack-main/client/src/api/items.js";

import React, { useState } from "react";
import {
  MdOutlineList,
  MdOutlineSportsVolleyball,
  MdOutlineHiking,
  MdStars,
} from "react-icons/md";

function ItemList(props) {
  const [activeFilter, setActiveFilter] = useState("all");

  // Function to filter items based on the active filter
  const filteredItems = () => {
    if (activeFilter === "all") {
      return props.items;
    } else {
      return props.items.filter(item => item.tags.includes(activeFilter));
    }
  };

  return (
    <>
      <div className="item-list-filters">
        <button onClick={() => setActiveFilter("all")}>
          <MdOutlineList />
          All
        </button>
        <button onClick={() => setActiveFilter("essentials")}>
          <MdStars />
          Essentials
        </button>
        <button onClick={() => setActiveFilter("sports")}>
          <MdOutlineSportsVolleyball />
          Sports
        </button>
        <button onClick={() => setActiveFilter("hiking")}>
          <MdOutlineHiking /> Hiking
        </button>
      </div>
      <div className="item-list">
        {filteredItems().map((item) => (
          <div className="item" key={item.id}>
            <p>{item.title}</p>
            <button onClick={() => addToPackedItems(item.id)}>Add</button>
            <button onClick={() => removeFromPackedItems(item.id)}>Remove</button>
          </div>
        ))}

        {filteredItems().length === 0 && (
          <div className="empty">
            <p>No items</p>
          </div>
        )}
      </div>

    </>
  );
}

export default ItemList;


