import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSearchParams} from 'react-router-dom';
import styles from './Idea.module.sass';
import {requestById, selectFetch} from './ideaSlice';
import {AppDispatch} from '../../app/store';
import FetchDirection from './model/fetchDirection.enum';

function Navigation({prevDisabled, nextDisabled, page}: {prevDisabled: boolean, nextDisabled: boolean, page: number}) {
    const dispatch: AppDispatch = useDispatch();

    const fetch = useSelector(selectFetch);
    const [searchParams, setSearchParams] = useSearchParams();

    const handlePage = (ideaId: number, direction: FetchDirection) => {
        dispatch(requestById({ideaId, direction, perPage: 10}));
    }

    useEffect(() => {
        searchParams.set('page', page.toString());
        setSearchParams(searchParams);
    }, [page])
    
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