const mongoose = require("mongoose");

const filmsSchema = {
  name: { type: String, required: true },
  posterImage: { type: String, required: true }
};

const filmsModel = new mongoose.model(
  "Films",
  new mongoose.Schema(filmsSchema)
);

module.exports = filmsModel;
