const express = require('express');
const app = require("./app.js")
app.use(express.json());
app.listen(3000, () => {
    console.log(`Server listening on port ${3000}`);
    console.log("\nhttp://localhost:3000/");
});
