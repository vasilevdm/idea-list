import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Idea from './model/Idea.interface';
import {RootState} from '../../app/store';
import ListResponse from './model/ListResponse.interface';
import FetchByPageRequest from './model/fetchByPageRequest.interface';

export interface IdeaState {
    loading: boolean;
    ideaList: Idea[];
    page: number,
    error: string
}

const initialState: IdeaState = {
    loading: false,
    ideaList: [],
    page: 0,
    error: ''
};

export const ideaSlice = createSlice({
    name: 'idea',
    initialState,
    reducers: {
        requestByPage: (state, action: PayloadAction<FetchByPageRequest>) => ({...state, loading: true, error: ''}),
        setPage: (state, action: PayloadAction<number>) => ({
                ...state,
                page: action.payload
            }),
        loadingComplete: (state, action: PayloadAction<ListResponse<Idea>>) => ({
                ...state,
                loading: false,
                ideaList: action.payload.items
            }),
        loadingFailed: (state, action: PayloadAction<string>) => ({...state, loading: true, error: action.payload})
    }
});

export const { requestByPage, setPage, loadingComplete, loadingFailed } = ideaSlice.actions;

export const selectLoading = (state: RootState) => state.idea.loading;
export const selectIdeaList = (state: RootState) => state.idea.ideaList;
export const selectPage = (state: RootState) => state.idea.page;
export const selectError = (state: RootState) => state.idea.error;

export default ideaSlice.reducer;