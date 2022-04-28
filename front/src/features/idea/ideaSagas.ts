import {call, put, takeEvery, takeLatest, select} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {fetchById, fetchByPage, addIdea, patchIdea, deleteIdea} from './ideaAPI';
import FetchByPageRequest from './model/fetchByPageRequest.interface';
import FetchByIdRequest from './model/fetchByIdRequest.interface';
import FetchDirection from './model/fetchDirection.enum';
import {
    decrementPage, FetchState,
    incrementPage,
    loadingComplete,
    loadingFailed,
    requestById,
    requestByPage,
    requestCreateIdea,
    requestRemoveIdea,
    requestUpdateIdea,
    selectFetch,
    setPage
} from './ideaSlice';
import ListResponse from './model/ListResponse.interface';
import Idea from './model/Idea.interface';
import UpdateIdeaRequest from './model/UpdateIdeaRequest.interface';

function* fetchIdeasByPage(action: PayloadAction<FetchByPageRequest>): Generator<any> {
    try {
        const listResponse = (yield call(fetchByPage, action.payload)) as AxiosResponse<ListResponse<Idea>>;
        yield put(loadingComplete(listResponse.data));
        yield put(setPage(action.payload.page));
    } catch (e) {
        yield put(loadingFailed('fetchIdeasByPage error'));
    }
}

function* fetchIdeasById(action: PayloadAction<FetchByIdRequest>): Generator<any> {
    try {
        const listResponse = (yield call(fetchById, action.payload)) as AxiosResponse<ListResponse<Idea>>;
        yield put(loadingComplete(listResponse.data));

        switch (action.payload.direction) {
            case FetchDirection.NEXT:
                yield put(incrementPage());
                break;
            case FetchDirection.PREV:
                yield put(decrementPage());
                break;
            default:
        }
    } catch (e) {
        yield put(loadingFailed('fetchIdeasById error'));
    }
}

function* createIdea(action: PayloadAction<string>): Generator<any> {
    try {
        yield call(addIdea, action.payload);
        yield put(requestByPage({page: 1, perPage: 10}));
    } catch (e) {
        yield put(loadingFailed('createIdea error'));
    }
}

function* updateIdea(action: PayloadAction<UpdateIdeaRequest>): Generator<any> {
    try {
        yield call(patchIdea, action.payload);
    } catch (e) {
        yield put(loadingFailed('updateIdea error'));
    }
}

function* removeIdea(action: PayloadAction<number>): Generator<any> {
    try {
        yield call(deleteIdea, action.payload);
        const fetch = (yield select(selectFetch)) as FetchState;
        const listResponse = (yield call(fetchById, {ideaId: fetch.prevId+1, direction: FetchDirection.NEXT, perPage: 10})) as AxiosResponse<ListResponse<Idea>>;
        yield put(loadingComplete(listResponse.data));
    } catch (e) {
        yield put(loadingFailed('updateIdea error'));
    }
}

export function* fetchIdeasByPageSaga(): Generator<any> {
    yield takeLatest(requestByPage.type, fetchIdeasByPage);
}

export function* fetchIdeasByIdSaga(): Generator<any> {
    yield takeLatest(requestById.type, fetchIdeasById);
}

export function* createIdeaSaga(): Generator<any> {
    yield takeLatest(requestCreateIdea.type, createIdea);
}

export function* updateIdeaSaga(): Generator<any> {
    yield takeEvery(requestUpdateIdea.type, updateIdea);
}

export function* removeIdeaSaga(): Generator<any> {
    yield takeLatest(requestRemoveIdea.type, removeIdea);
}