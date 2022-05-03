import {createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit';
import Idea from './model/Idea.interface';
import {RootState} from '../../app/store';
import ListResponse from './model/ListResponse.interface';
import FetchByPageRequest from './model/fetchByPageRequest.interface';
import FetchByIdRequest from './model/fetchByIdRequest.interface';
import UpdateIdeaRequest from './model/UpdateIdeaRequest.interface';

export interface FetchState {
    prevId: number,
    nextId: number,
    maxId: number
}

const ideasAdapter = createEntityAdapter<Idea>();
const initialState = ideasAdapter.getInitialState({
    loading: true,
    page: 0,
    error: '',
    fetch: {
        nextId: 0,
        prevId: 0,
        maxId: 0
    }
});

export const ideaSlice = createSlice({
    name: 'idea',
    initialState,
    reducers: {
        requestByPage: (state, action: PayloadAction<FetchByPageRequest>) => {
            state.loading = true;
            state.error = '';
        },
        requestById: (state, action: PayloadAction<FetchByIdRequest>) => {
            state.loading = true;
            state.error = '';
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        incrementPage: state => {
            state.page += 1;
        },
        decrementPage: state => {
            state.page -= 1;
        },
        loadingComplete: (state, action: PayloadAction<ListResponse<Idea>>) => {
            ideasAdapter.setAll(state, action.payload.items);
            const nextId = Number(state.ids.slice(-1)[0]);
            const prevId = Number(state.ids[0]);
            state.fetch = {
                nextId,
                prevId,
                maxId: Math.max(state.fetch.maxId, prevId)
            }
            state.loading = false;
        },
        loadingFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        requestCreateIdea: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.error = '';
        },
        requestUpdateIdea: (state, action: PayloadAction<UpdateIdeaRequest>) => {
            state.loading = true;
            state.error = '';
        },
        updatingComplete: (state, action: PayloadAction<Idea>) => {
            ideasAdapter.upsertOne(state, action.payload)
            state.loading = false;
        },
        requestRemoveIdea: (state, action: PayloadAction<number>) => {
            state.loading = true;
            state.error = '';
        }
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
    requestCreateIdea,
    requestUpdateIdea,
    updatingComplete,
    requestRemoveIdea } = ideaSlice.actions;

export const selectLoading = (state: RootState) => state.idea.loading;
export const ideaSelectors = ideasAdapter.getSelectors<RootState>(state => state.idea);
export const selectPage = (state: RootState) => state.idea.page;
export const selectError = (state: RootState) => state.idea.error;
export const selectFetch = (state: RootState) => state.idea.fetch;

export default ideaSlice.reducer;