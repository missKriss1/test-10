import express from "express";
import newsDb from "../newsDb";
import {IComment, ICommentMutation} from "../types";
import commentsDb from "../commentsDb";

const commentRouter = express.Router();

commentRouter.post('/', async (req, res) => {
    if(!req.body.newsId || !req.body.comment){
        res.status(404).send({'error': ' Comment and NewsId must be filled out'})
    }
    const newsIdByCheck = await newsDb.newsById(req.body.newsId);

    if(newsIdByCheck){
        let newComment: ICommentMutation ={
            newsId: req.body.newsId,
            author: req.body.author ? req.body.author : 'Anonymous',
            comment: req.body.comment,
        }
        newComment = await  commentsDb.addComments(newComment);
        res.send(newComment);
    }else{
        res.status(404).send({'error': ' NewsId not found'})
    }

    if(!newsIdByCheck){
        res.status(404).send({'error': ' News not found'})
    }

})

commentRouter.get("/", async (req, res) => {
    let comments : IComment[] = [];
    if(req.query.newsId){
        const comment = await  commentsDb.commentByNewsId(String(req.query.newsId));
        if(comment){
            res.send(comment)
        }else{
            res.status(40).send({'error': ' Comment not found'})
        }
    }else{
        comments = await commentsDb.getComments()
        res.send(comments)
    }
})

commentRouter.delete("/:id", async (req, res) => {
    if(!req.params.id){
        res.status(400).send({'error':' ID params must be in url'});
    }
    const comment = await  commentsDb.deleteComment(req.params.id);
    if(comment){
        res.send(comment)
    }else{
        res.status(404).send({'error':' Comment not found'})
    }
})

export default commentRouter