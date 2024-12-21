import { createAsyncThunk } from '@reduxjs/toolkit';
import { INews, INewsMutation } from '../types';
import axiosApi from '../axiosApi.ts';

export const addNews = createAsyncThunk<void, INewsMutation>(
  'news/addNews',
  async (news) => {
    const data = new FormData();
    data.append("title", news.title);
    data.append("description", news.description);

    if (news.image) {
      data.append("image", news.image);
    }

    try {
      await axiosApi.post('/news', data);
    } catch (error) {
      console.error('Failed to add news:', error);
      throw error;
    }
  }
);


export const fetchAllNews = createAsyncThunk<INews[]>(
  'news/fetchAllNews',
  async () =>{
    const {data: news} = await  axiosApi.get<INews[]>('/news');
    return news;
  }
)

export const deleteOneNews = createAsyncThunk<void, string> (
  'news/deleteOneNews',
  async (id: string) =>{
    await axiosApi.delete(`/news/${id}`);
  }
)

export const fetchOneNew = createAsyncThunk<INews, string>(
  'news/fetchOneNew',
  async (id) =>{
    const{data: news} = await axiosApi.get<INews>(`/news/${id}`);
    return news;
  }
)