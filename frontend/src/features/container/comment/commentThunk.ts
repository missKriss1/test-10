import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICommentMutation } from '../../../types';
import axiosApi from '../../../axiosApi.ts';

export const addNewComments = createAsyncThunk<void, ICommentMutation>(
  'comments/addNewComments',
  async (comment: ICommentMutation) =>{
    await axiosApi.post('/comments', comment);
  }
)

export const fetchCommentByNewsId = createAsyncThunk(
  'comments/fetchCommentByNews',
  async (id:string) =>{
    const {data: comment} = await axiosApi.get(`/comments?newsId=${id} `)
    return comment;
  }
)

export const deleteOneComment = createAsyncThunk<void, string>(
  'comments/deleteOneComment',
  async (id: string) =>{
    await axiosApi.delete(`/comments/${id}`);
  }
)