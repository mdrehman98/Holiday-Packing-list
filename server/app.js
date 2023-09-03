const express = require("express");
const {
  initialise_db,
  get_items,
  get_item_by_id,
  get_trip,
  update_trip,
  get_packed_items,
  add_packed_item,
} = require("./db.js");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

initialise_db();

// Trip

app.get("/trip", (req, res) => {
  const trip = get_trip();
  res.status(200);
  res.json(trip);
});

app.patch("/trip", (req, res) => {
  const trip = req.body;
  update_trip(trip);
  res.status(200);
  res.json(trip);
});

// Items

app.get("/items", (req, res) => {
  const trip = get_trip(); // Get the user's trip data
  const items = get_items();

  // Filter items based on weather conditions
  const filteredItems = items.filter(item =>
    item.appropriateWeather.includes(trip.weatherConditions)
  );

  res.status(200);
  res.json(filteredItems);
});

app.get("/items/:id", (req, res) => {
  const id = req.params.id;
  const item = get_item_by_id(id);
  if (item === undefined) {
    res.status(404);
    res.json({ error: "Item not found" });
    return;
  }

  res.status(200);
  res.json(item);
});

// Packed Items

app.get("/packed-items", (req, res) => {
  const items = get_packed_items();
  res.status(200);
  res.json(items);
});

app.post("/add-packed-item/:itemId", (req, res) => {
  const itemId = req.params.itemId;
  const item = get_item_by_id(itemId);

  if (!item) {
    res.status(404);
    res.json({ error: "Item not found" });
    return;
  }
  add_packed_item(item)

  res.status(201);
  res.json({ message: "Item added to packedItems" });
});

app.delete("/remove-packed-item/:itemId", (req, res) => {
  const itemId = req.params.itemId;
  const item = get_item_by_id(itemId);

  if (!item) {
    res.status(404);
    res.json({ error: "Item not found" });
    return;
  }

  const packedItems = get_packed_items();
  const index = packedItems.findIndex((packedItem) => packedItem.id === item.id);

  if (index !== -1) {
    packedItems.splice(index, 1);
    res.status(200);
    res.json({ message: "Item removed from packedItems" });
  } else {
    res.status(404);
    res.json({ error: "Item not found in packedItems" });
  }
});

app.listen(PORT, (error) => {
  if (!error) console.log("Server is running. Listening on port " + PORT);
  else console.log("Error occurred, server can't start", error);
});
