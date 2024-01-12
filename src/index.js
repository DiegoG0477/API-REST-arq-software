require("dotenv").config();
require("./configs/db.config");
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require('express-fileupload');
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT;
const usersRouter = require("./routes/users.routes");
const authRouter = require("./routes/auth.routes");
const materialsRouter = require("./routes/materials.routes");

app.use(cookieParser());

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "./tmp",
    })
);
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/v3/auth", authRouter);
app.use("/v3/users", usersRouter);
app.use("/v3/materials", materialsRouter);

app.listen(PORT, () => {
    console.log("corriendo en el puerto " + PORT);
});