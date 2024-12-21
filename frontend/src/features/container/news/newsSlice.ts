import { INews } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../../app/store.ts';
import { addNews, deleteOneNews, fetchAllNews, fetchOneNew } from './newsThunk.ts';

export interface NewsState {
  news: INews [];
  new: INews | null;
  newsFetching: boolean;
  isCreating: boolean;
  isDeleting: boolean;
  oneNewsFetching: boolean;
}

const initialState: NewsState = {
  news: [],
  new: null,
  newsFetching: false,
  isCreating: false,
  isDeleting: false,
  oneNewsFetching: false,
}
export const selectNews = (state:RootState ) => state.news.news;
export const selectNew = (state:RootState ) => state.news.new;
export const selectNewsFetch = (state:RootState ) => state.news.newsFetching;
export const selectNewsCreat= (state:RootState ) => state.news.isCreating;
export const selectNewsDelete= (state:RootState ) => state.news.isDeleting;
export const selectNewsFetchOne = (state:RootState ) => state.news.oneNewsFetching;

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(addNews.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(addNews.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(addNews.rejected, (state) => {
        state.isCreating = false;
      })
      .addCase(fetchAllNews.pending, (state) => {
        state.newsFetching = true;
      })
      .addCase(fetchAllNews.fulfilled, (state, { payload: news }) => {
        state.news = news;
        state.newsFetching = false;
      })
      .addCase(fetchAllNews.rejected, (state) => {
        state.newsFetching = false;
      })
      .addCase(deleteOneNews.pending, (state) => {
      state.isDeleting = true;
      })
      .addCase(deleteOneNews.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteOneNews.rejected, (state) => {
        state.isDeleting = false;
      })
      .addCase(fetchOneNew.pending, (state) => {
        state.oneNewsFetching = true;
      })
      .addCase(fetchOneNew.fulfilled, (state, { payload: post }) => {
          state.new = post;
          state.oneNewsFetching = false;
        },
      )
      .addCase(fetchOneNew.rejected, (state) => {
        state.oneNewsFetching = false;
      })
  },
})

export const newsReducer = newsSlice.reducer;