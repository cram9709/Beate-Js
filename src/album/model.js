const {Schema, model} = require("mongoose");

const albumSchema = new Schema(
  {
    artistName: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    coverUrl: {
      type: String
    },
    tracks: {
      type: [Schema.ObjectId],
      ref: "Track"
    },
    releaseDate: {
      type: Date,
    },
    createdDate: {
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
albumSchema.pre("save", function (next) {
  this.search = `${this.name}, ${this.name.normalize("NFD").replace(/[\u0300-\u0301]/gu, "")}`;
  next();
});

module.exports = model("Album", albumSchema);
