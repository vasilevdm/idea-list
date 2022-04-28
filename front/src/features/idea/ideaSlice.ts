import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Idea from './model/Idea.interface';
import {RootState} from '../../app/store';
import ListResponse from './model/ListResponse.interface';
import FetchByPageRequest from './model/fetchByPageRequest.interface';
import FetchByIdRequest from './model/fetchByIdRequest.interface';

export interface IdeaState {
    loading: boolean;
    ideaList: Idea[];
    page: number,
    error: string,
    fetch: FetchState
}

export interface FetchState {
    prevId: number,
    nextId: number,
    maxId: number
}

const initialState: IdeaState = {
    loading: false,
    ideaList: [],
    page: 0,
    error: '',
    fetch: {
        nextId: 0,
        prevId: 0,
        maxId: 0
    }
};

export const ideaSlice = createSlice({
    name: 'idea',
    initialState,
    reducers: {
        requestByPage: (state, action: PayloadAction<FetchByPageRequest>) => ({...state, loading: true, error: ''}),
        requestById: (state, action: PayloadAction<FetchByIdRequest>) => ({...state, loading: true, error: ''}),
        setPage: (state, action: PayloadAction<number>) => ({
                ...state,
                page: action.payload
            }),
        incrementPage: state => ({...state, page: state.page + 1}),
        decrementPage: state => ({...state, page: state.page - 1}),
        loadingComplete: (state, action: PayloadAction<ListResponse<Idea>>) => {
            const nextId = action.payload.items.slice(-1)[0].id;
            const prevId = action.payload.items[0].id;
            return {
                ...state,
                loading: false,
                ideaList: action.payload.items,
                fetch: {
                    nextId,
                    prevId,
                    maxId: Math.max(state.fetch.maxId, prevId)
                }
            }
        },
        loadingFailed: (state, action: PayloadAction<string>) => ({...state, loading: false, error: action.payload}),
        requestCreateIdea: (state, action: PayloadAction<string>) => ({...state})
    }
});

export const {
    requestByPage,
    requestById,
    setPage,
    incrementPage,
    decrementPage,
    loadingComplete,
    loadingFailed,
    requestCreateIdea } = ideaSlice.actions;

export const selectLoading = (state: RootState) => state.idea.loading;
export const selectIdeaList = (state: RootState) => state.idea.ideaList;
export const selectPage = (state: RootState) => state.idea.page;
export const selectError = (state: RootState) => state.idea.error;
export const selectFetch = (state: RootState) => state.idea.fetch;

export default ideaSlice.reducer;