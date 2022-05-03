import React, {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import styles from './Idea.module.sass';
import {requestById, requestByPage, selectFetch, selectLoading, selectPage} from './ideaSlice';
import {AppDispatch} from '../../app/store';
import FetchDirection from './model/fetchDirection.enum';
import {useAppDispatch, useAppSelector} from '../../app/hooks';

function Navigation() {
    const dispatch: AppDispatch = useAppDispatch();

    const loading: boolean = useAppSelector(selectLoading);
    const page: number = useAppSelector(selectPage);
    const fetch = useAppSelector(selectFetch);

    const [searchParams, setSearchParams] = useSearchParams();
    const queryPage = Number(searchParams.get('page')) || 1;
    useEffect(() => {
        if (!page || page !== queryPage) {
            dispatch(requestByPage({
                page: queryPage,
                perPage: 10
            }));
        }
    }, []);
    useEffect(() => {
        if (page) {
            searchParams.set('page', page.toString());
            setSearchParams(searchParams);
        }
    }, [page]);

    const navigatePrev = (): void => {
        dispatch(requestById({ideaId: fetch.prevId, direction: FetchDirection.PREV, perPage: 10}));
    }
    const navigateNext = (): void => {
        dispatch(requestById({ideaId: fetch.nextId, direction: FetchDirection.NEXT, perPage: 10}));
    }

    const prevDisabled = page === 1 || loading;
    const nextDisabled = loading;
    
    return <nav className={styles.ideanav}>
        <button
            type="button"
            className={[
                styles.ideanav__button,
                prevDisabled ? styles.ideanav__button_disabled : ''
            ].join(' ')}
            disabled={prevDisabled}
            onClick={navigatePrev}
        >&laquo; prev</button>

            <span>{ page }</span>

            <button
            type="button"
            className={[
                styles.ideanav__button,
                nextDisabled ? styles.ideanav__button_disabled : ''
            ].join(' ')}
            disabled={nextDisabled}
            onClick={navigateNext}
        >next &raquo;</button>
    </nav>;
}

export default Navigation;