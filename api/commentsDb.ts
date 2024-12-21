import {IComment, ICommentMutation} from "./types";
import {promises as fs} from 'fs';

const filename = './comments.json';
let data: IComment[] = [];

const commentsDb = {
    async init () {
        try {
            const fileContent = await fs.readFile(filename);
            data = JSON.parse(fileContent.toString());
        }catch (e){
            data = []
        }
    },
    async getComments () {
        return data
    },
    async addComments (comment: ICommentMutation){
        const id = crypto.randomUUID();
        const newComment = {...comment, id};

        data.push(newComment);
        await this.save();
        return newComment;

    },
    async commentById (id: string) {
        const comment = data.find(com => com.id === id);
        if(comment){
            return comment;
        }else{
            return null
        }
    },

    async commentByNewsId (id: string) {
        if (data.length > 0 && id){
            let comment : IComment[] = [];

            data.forEach(com =>{
                if(com.newsId === id){
                    comment.push(com);
                }
            })
            return comment.reverse();
        }
    },
    async deleteComment (id: string) {
        if(data.length > 0 && id){
            const comment = await  this.commentById(id);

            if(comment === null){
                return 'Comment not found';
            }

            if(comment){
                data = data.filter(comment => comment.id !== id);
                await this.save();
                return 'Comment delete';
            }
        }
    },
    async save() {
        return fs.writeFile(filename, JSON.stringify(data, null, 2));
    }
}
export default commentsDb