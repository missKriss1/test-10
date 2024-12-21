import express from "express";

const commentRouter = express.Router();

commentRouter.post('/', async (req, res) => {
    if(!req.body.newsId || req.body.comment){
        res.status(404).send({'error': ' Comment and NewsId must be filled out'})
    }

})