import {call, put, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {fetchByPage} from './ideaAPI';
import FetchByPageRequest from './model/fetchByPageRequest.interface';
import {
    loadingComplete,
    loadingFailed,
    requestByPage,
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

export function* fetchIdeasByPageSaga(): Generator<any> {
    yield takeLatest(requestByPage.type, fetchIdeasByPage);
}