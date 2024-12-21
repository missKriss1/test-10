import { IComment } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';
import { addNewComments, fetchCommentByNewsId } from './commentThunk.ts';
import { RootState } from '../../../app/store.ts';

export interface ICommentState {
  comments: IComment[];
  loading: boolean;
  addLoading: boolean;
}
 const initialState: ICommentState ={
  comments: [],
   loading: false,
   addLoading: false,
 }

export const selectComment = (state:RootState ) => state.comments.comments;
export const selectLoadingCom = (state:RootState ) => state.comments.loading;
export const selectAddCom = (state:RootState ) => state.comments.addLoading;


export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers:{},
  extraReducers: (builder) =>{
    builder
      .addCase(addNewComments.pending, (state) => {
      state.addLoading = true;
      })
      .addCase(addNewComments.fulfilled, (state) => {
      state.addLoading = false;
      })
      .addCase(addNewComments.rejected, (state) => {
      state.addLoading = false;
      })
      .addCase(fetchCommentByNewsId.pending, (state) => {
        state.loading = true;
        state.comments = [];
      })
      .addCase(fetchCommentByNewsId.fulfilled, (state, { payload: comments }) => {
        state.loading = false;
        state.comments = comments;
      })
      .addCase(fetchCommentByNewsId.rejected, (state) => {
        state.loading = false;
      });
  }
})

export const commentsReducer = commentSlice.reducer;