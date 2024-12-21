export interface INews{
  id:string
  title: string;
  description: string;
  image: string | null;
  date: string;
}

export interface INewsMutation{
  title: string;
  description: string;
  image: File | null;
}

export interface IComment{
  id: string;
  newsId: string;
  author: string;
}

export interface ICommentMutation{
  newsId: string;
  author: string;
  comment: string;
}