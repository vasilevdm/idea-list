import {call, put, takeEvery, takeLatest, select, SagaReturnType, CallEffect, PutEffect, SelectEffect, ForkEffect} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
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
    setPage,
    updatingComplete
} from './ideaSlice';
import UpdateIdeaRequest from './model/UpdateIdeaRequest.interface';

function* fetchIdeasByPage(action: PayloadAction<FetchByPageRequest>): Generator<CallEffect<SagaReturnType<typeof fetchByPage>> | PutEffect, void, SagaReturnType<typeof fetchByPage>> {
    try {
        const listResponse: SagaReturnType<typeof fetchByPage> = yield call(fetchByPage, action.payload);
        yield put(loadingComplete(listResponse));
        yield put(setPage(action.payload.page));
    } catch (e) {
        yield put(loadingFailed('fetchIdeasByPage error'));
    }
}

function* fetchIdeasById(action: PayloadAction<FetchByIdRequest>): Generator<CallEffect<SagaReturnType<typeof fetchById>> | PutEffect, void, SagaReturnType<typeof fetchById>> {
    try {
        const listResponse: SagaReturnType<typeof fetchById> = yield call(fetchById, action.payload);
        yield put(loadingComplete(listResponse));

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

function* createIdea(action: PayloadAction<string>): Generator<CallEffect<SagaReturnType<typeof addIdea>> | PutEffect, void, SagaReturnType<typeof addIdea>> {
    try {
        yield call(addIdea, action.payload);
        yield put(requestByPage({page: 1, perPage: 10}));
    } catch (e) {
        yield put(loadingFailed('createIdea error'));
    }
}

function* updateIdea(action: PayloadAction<UpdateIdeaRequest>): Generator<CallEffect<SagaReturnType<typeof patchIdea>> | PutEffect, void, SagaReturnType<typeof patchIdea>> {
    try {
        yield call(patchIdea, action.payload)
        yield put(updatingComplete(action.payload));
    } catch (e) {
        yield put(loadingFailed('updateIdea error'));
    }
}

function* removeIdea(action: PayloadAction<number>): Generator<CallEffect<SagaReturnType<typeof deleteIdea> | SagaReturnType<typeof fetchById>> | SelectEffect | PutEffect, void, FetchState | SagaReturnType<typeof fetchById>> {
    try {
        yield call(deleteIdea, action.payload);
        const fetch = (yield select(selectFetch)) as SagaReturnType<typeof selectFetch>;
        const listResponse = (yield call(fetchById, {ideaId: fetch.prevId+1, direction: FetchDirection.NEXT, perPage: 10})) as SagaReturnType<typeof fetchById>;
        yield put(loadingComplete(listResponse));
    } catch (e) {
        yield put(loadingFailed('updateIdea error'));
    }
}

export function* fetchIdeasByPageSaga(): Generator<ForkEffect> {
    yield takeLatest(requestByPage.type, fetchIdeasByPage);
}

export function* fetchIdeasByIdSaga(): Generator<ForkEffect> {
    yield takeLatest(requestById.type, fetchIdeasById);
}

export function* createIdeaSaga(): Generator<ForkEffect> {
    yield takeLatest(requestCreateIdea.type, createIdea);
}

export function* updateIdeaSaga(): Generator<ForkEffect> {
    yield takeEvery(requestUpdateIdea.type, updateIdea);
}

export function* removeIdeaSaga(): Generator<ForkEffect> {
    yield takeLatest(requestRemoveIdea.type, removeIdea);
}