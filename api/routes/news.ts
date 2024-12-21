import express from "express";
import {imagesUpload} from "../multer";
import {INewsMutation} from "../types";
import newsDb from "../newsDb";

const newsRouter = express.Router();

newsRouter.post("/" ,imagesUpload.single('image'), async (req, res) => {
    if(!req.body.title || !req.body.description) {
        res.status(404).send({'error': 'The title and description are mandatory'});
    }

    let postTheNews: INewsMutation ={
        title: req.body.title,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
    }

    const newNews = await newsDb.addNews(postTheNews);
    res.send(newNews);

})

newsRouter.get("/", async (req, res) => {
    const news = await  newsDb.getNews()
    res.send(news)
})

newsRouter.get("/:id", async (req, res) => {
    if(!req.params.id){
        res.status(400).send({'error':' ID params must be in url'});
    }

    const news = await  newsDb.newsById(req.params.id);

    if(news !== null){
        res.send(news)
    }else{
        res.status(404).send({'error':'News not found'});
    }
})

newsRouter.delete("/:id", async (req, res) => {
    if(!req.params.id){
        res.status(400).send({'error':' ID params must be in url'});
    }
    const news = await  newsDb.deleteNews(req.params.id);

    if(news !== null){
        res.send(news)
    }else{
        res.status(404).send({'error':'News not found'});
    }

})

export default newsRouter