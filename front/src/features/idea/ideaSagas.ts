import {call, put, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {fetchById, fetchByPage} from './ideaAPI';
import FetchByPageRequest from './model/fetchByPageRequest.interface';
import FetchByIdRequest from './model/fetchByIdRequest.interface';
import FetchDirection from './model/fetchDirection.enum';
import {
    decrementPage,
    incrementPage,
    loadingComplete,
    loadingFailed,
    requestByPage,
    requestById,
    setPage
} from './ideaSlice';
import ListResponse from './model/ListResponse.interface';
import Idea from './model/Idea.interface';

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

export function* fetchIdeasByPageSaga(): Generator<any> {
    yield takeLatest(requestByPage.type, fetchIdeasByPage);
}

export function* fetchIdeasByIdSaga(): Generator<any> {
    yield takeLatest(requestById.type, fetchIdeasById);
}