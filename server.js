const app = require("./server/app");

// server running
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("server listening " + PORT));
