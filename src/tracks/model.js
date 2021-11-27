const {Schema, model} = require("mongoose");
const profileModel = require("../profile/profile.model");

const trackSchema = new Schema(
  {
    artistName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
    },
    search: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Crear un valor de busqueda sin tildes y acentos
trackSchema.pre("save", function (next) {
  this.search = `${this.name}, ${this.name.normalize("NFD").replace(/[\u0300-\u0301]/gu, "")}`;
  next();
});

module.exports = model("Track", trackSchema);
