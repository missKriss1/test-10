import express from 'express';
import cors from "cors";
import fs = require("fs");
import newsRouter from "./routes/news";
import newsDb from "./newsDb";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/news', newsRouter);

const run = async () => {
    if (fs.existsSync('./news.json')) {
        await newsDb.init()
    } else {
        fs.writeFileSync('./news.json', JSON.stringify([]));
    }

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
};

run().catch(console.error);