import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Idea from './model/Idea.interface';
import {RootState} from '../../app/store';
import ListResponse from './model/ListResponse.interface';
import FetchByPageRequest from './model/fetchByPageRequest.interface';

export interface IdeaState {
    loading: boolean;
    ideaList: Idea[];
    page: number
}

const initialState: IdeaState = {
    loading: false,
    ideaList: [],
    page: 0
};

export const ideaSlice = createSlice({
    name: 'idea',
    initialState,
    reducers: {
        requestByPage: (state, action: PayloadAction<FetchByPageRequest>) => ({...state, loading: true}),
        setPage: (state, action: PayloadAction<number>) => ({
                ...state,
                page: action.payload
            }),
        loadingComplete: (state, action: PayloadAction<ListResponse<Idea>>) => ({
                ...state,
                loading: false,
                ideaList: action.payload.items
            }),
        loadingFailed: state => ({...state, loading: true})
    }
});

export const { requestByPage, setPage, loadingComplete, loadingFailed } = ideaSlice.actions;

export const selectLoading = (state: RootState) => state.idea.loading;
export const selectIdeaList = (state: RootState) => state.idea.ideaList;
export const selectPage = (state: RootState) => state.idea.page;

export default ideaSlice.reducer;