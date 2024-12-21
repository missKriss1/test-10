import {IComment, INews, INewsMutation} from "./types";
import {promises as fs} from 'fs';
import commentsDb from "./commentsDb";

const filename = './news.json';
let data: INews[] =[];

const newsDb ={
    async init(){
        try {
            const fileContents = await fs.readFile(filename);
            data = JSON.parse(fileContents.toString());
        }catch (e){
            data = []
        }
    },
    async getNews (){
        return data;
    },
    async addNews (news: INewsMutation){
        const id = crypto.randomUUID();
        const date = new Date().toISOString();
        const newNews = {id, ...news, date};
        data.push(newNews);
        await this.save();
        return newNews;
    },
    async newsById (id: string){
        const news = data.find(n => n.id === id);
        if(news){
            return news;
        }else{
            return null
        }
    },
    async deleteNews (id: string){
        if(data.length > 0 && id){
            let news = await  this.newsById(id);

            if(news){
                let comments: IComment[] = await commentsDb.getComments()
                comments = comments.filter(comment => comment.newsId !== id);
                await commentsDb.save();

                data = data.filter(n => n.id !== id);
                await this.save();
                return 'News delete';
            }
        }
    },
    async save() {
        return fs.writeFile(filename, JSON.stringify(data, null, 2));
    }

}

export default newsDb;