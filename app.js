const express = require("express");

const app = express();

const port = 3000;

app.use(express.json());

const posts = [
	{
		title: "pirmas_pavadinimas",
		id: 1,
		body: "Cia yra pirmo pavadinimo ir pirmo aidy vidinis bodis",
	},
	{
		title: "antras_pavadinimas",
		id: 2,
		body: "Kazkoks stringas antram irasui sukurti",
	},
	{
		title: "trecias_pavadinimas",
		id: 3,
		body: "Ir galiausias pats paskutinis irasas kad veiktu ir paskutinio posto id su numeriu 3",
	},
];

app.get("/posts", (req, res) => {
	res.send(posts);
});

app.get("/posts/:id", (req, res) => {
	res.send(posts.find((post) => post.id === parseInt(req.params.id)));
});

app.get("/posts", (req, res) => {
	// kaip pakeist kad veiktu ir siaip be query vertes?
	const { title } = req.query;
	const postByTitle = posts.filter((post) => post.title.includes(title));
	res.send(postByTitle);
});

app.post("/posts", (req, res) => {
	posts.push(req.body);
	res.send(`${req.body.title} post has been added`);
});

app.put("/posts/:id", (req, res) => {
	const postId = parseInt(req.params.id);
	const { title, body } = req.body;

	const postIndex = posts.findIndex((post) => post.id === postId);

	if (postIndex !== -1) {
		posts[postIndex] = { id: title, postId, body };
		res.send(`post was replaced successfully.`);
	} else {
		res.status(404).send(`Post not found`);
	}
});

app.delete("/posts/:id", (req, res) => {
	const postId = parseInt(req.params.id);
	const postIndex = posts.findIndex((post) => post.id === postId);

	if (postIndex !== -1) {
		posts.splice(postIndex, 1);
		res.send(`Post with number ${postId} id was deleted successfully`);
	} else {
		res
			.status(404)
			.send(`Post with number ${postId} was not found in the database`);
	}
});

app.listen(port, () => console.log(`DA PORT IS RUNNING ON ZE NUMBER ${port}`));
