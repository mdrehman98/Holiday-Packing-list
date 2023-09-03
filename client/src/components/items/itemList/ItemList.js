import "./ItemList.css";



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
      <button className={activeFilter === "all" ? "active" : ""} onClick={() => setActiveFilter("all")} >
          <MdOutlineList />
          All
        </button>
        <button className={activeFilter === "essentials" ? "active" : ""} onClick={() => setActiveFilter("essentials")}>
          <MdStars />
          Essentials
        </button>
        <button className={activeFilter === "sports" ? "active" : ""} onClick={() => setActiveFilter("sports")}>
          <MdOutlineSportsVolleyball />
          Sports
        </button>
        <button className={activeFilter === "hiking" ? "active" : ""} onClick={() => setActiveFilter("hiking")}>
          <MdOutlineHiking /> Hiking
        </button>
      </div>
      <div className="item-list">
        {filteredItems().map((item) => (
          <div className="item" key={item.id}>
            <p>{item.title}</p>
 {props.type?<button onClick={() => props.updateFunction(item.id)}>Add</button>:
            <button onClick={() => props.removeFunction(item.id)}>Remove</button>}
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


