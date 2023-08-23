const express = require("express");
const router = express.Router();

const Items = require("../models/items");

router.get("/", async (req, res) => {
  const { purchased, priority } = req.query;
  let filter = {};

  if (priority || purchased) {
    if (priority) {
      filter.priority = priority;
    }
    if (purchased) {
      filter.purchased = purchased;
    }
    // filter.purchased = true;
  }
  res.send(await Items.find(filter));
});

router.get("/:id", async (req, res) => {
  const itemsdata = await Items.findOne({ _id: req.params.id });
  res.send(itemsdata);
});

/* create new shopping route */
router.post("/", async (req, res) => {
  const newitems = new Items({
    name: req.body.name,
    quantity: req.body.quantity,
    unit: req.body.unit,
    priority: req.body.priority,
    purchased: req.body.purchased,
  });
  await newitems.save();
  res.send(newitems);
});

/* update a shopping */
router.put("/:id", async (req, res) => {
  const items_id = req.params.id;
  const updatedItems = await Items.findByIdAndUpdate(items_id, req.body, {
    // runValidators: true,
    new: true, // return the modified data
  });
  res.send(updatedItems);
});

router.put("/:id/purchased", async (req, res) => {
  const items_id = req.params.id;
  const result = await Items.findByIdAndUpdate(
    items_id,
    { purchased: true },
    {
      new: true, // return the modified data
    }
  );

  res.send(result);
});

/* delete a shopping */
router.delete("/:id", async (req, res) => {
  const items_id = req.params.id;
  const deletedItems = await Items.findByIdAndDelete(items_id);
  res.send(deletedItems);
});

module.exports = router;
