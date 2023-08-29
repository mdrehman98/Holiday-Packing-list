const getItems = async () => {
  const res = await fetch("http://localhost:3001/items");
  const items = await res.json();
  return items;
};


// api/items.js
const API_URL = "http://localhost:3001"; // Change this to your server URL

const addToPackedItems = async (itemId) => {
  try {
    const response = await fetch(`${API_URL}/add-packed-item/${itemId}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to add item to packedItems");
    }

    return response;
  } catch (error) {
    throw error;
  }
};

const removeFromPackedItems = async (itemId) => {
  try {
    const response = await fetch(`${API_URL}/remove-packed-item/${itemId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to remove item from packedItems");
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export { getItems };
export { addToPackedItems };
export { removeFromPackedItems };

//module.exports = {
//  getItems,
//  addToPackedItems
//};
