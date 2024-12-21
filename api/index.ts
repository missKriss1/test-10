import express from 'express';
import cors from "cors";
import fs = require("fs");
import newsRouter from "./routes/news";
import newsDb from "./newsDb";
import commentRouter from "./routes/comments";
import commentsDb from "./commentsDb";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/news', newsRouter);
app.use('/comments', commentRouter)

const run = async () => {
    if (fs.existsSync('./news.json')) {
        await newsDb.init()
    } else {
        fs.writeFileSync('./comments.json', JSON.stringify([]));
    }
    if (fs.existsSync('./comments.json')) {
        await commentsDb.init()
    } else {
        fs.writeFileSync('./news.json', JSON.stringify([]));
    }


    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
};

run().catch(console.error);