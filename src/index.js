const express = require("express");
const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");

const app = express();
app.use(express.json());

const port = 3000;

const Movie = mongoose.model("Movie", {
  title: String,
  description: String,
  image_url: String,
  trailer_url: String,
});

//List Method
app.get("/", async (req, res) => {
  const filmes = await Movie.find();
  res.send(filmes);
});

// Create Method
app.post("/", async (req, res) => {
  const movies = new Movie({
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url,
  });
  await movies.save();
  res.send(movies);
});

//Delete Method
app.delete("/:id", async (req, res) => {
  const film = await Movie.findByIdAndDelete(req.params.id);
  return res.send(film);
});

//Update Method
app.put("/:id", async (req, res) => {
  const film = await Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    //Posso passar todos os campos que desejo que sejam editados
  });
  return res.send(film);
});

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
  mongoose.connect(
    "mongodb+srv://joaofpsilva98:N2XdX6cbGVqbjczc@starwarsapi.x0iwbpo.mongodb.net/?retryWrites=true&w=majority&appName=StarWarsAPI"
  );
});
