import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSearchParams} from 'react-router-dom';
import styles from './Idea.module.sass';
import {requestById, requestByPage, selectFetch, selectLoading, selectPage} from './ideaSlice';
import {AppDispatch} from '../../app/store';
import FetchDirection from './model/fetchDirection.enum';

function Navigation() {
    const dispatch: AppDispatch = useDispatch();

    const loading: boolean = useSelector(selectLoading);
    const page: number = useSelector(selectPage);
    const fetch = useSelector(selectFetch);

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
    }, [page])

    const prevDisabled = useMemo(() => page === 1 || loading, [page, loading]);
    const nextDisabled = loading;

    const handlePage = (ideaId: number, direction: FetchDirection) => {
        dispatch(requestById({ideaId, direction, perPage: 10}));
    }
    
    return <nav className={styles.ideanav}>
        <button
            type="button"
            className={[
                styles.ideanav__button,
                prevDisabled ? styles.ideanav__button_disabled : ''
            ].join(' ')}
            disabled={prevDisabled}
            onClick={() => handlePage(fetch.prevId, FetchDirection.PREV)}
        >&laquo; prev</button>

            <span>{ page }</span>

            <button
            type="button"
            className={[
                styles.ideanav__button,
                nextDisabled ? styles.ideanav__button_disabled : ''
            ].join(' ')}
            disabled={nextDisabled}
            onClick={() => handlePage(fetch.nextId, FetchDirection.NEXT)}
        >next &raquo;</button>
    </nav>;
}

export default Navigation;