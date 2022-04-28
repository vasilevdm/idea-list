import React from 'react';
import {useDispatch} from 'react-redux';
import {useSearchParams} from 'react-router-dom';
import styles from './Idea.module.sass';
import {requestByPage} from './ideaSlice';
import {AppDispatch} from '../../app/store';

function Navigation({prevDisabled, nextDisabled, page}: {prevDisabled: boolean, nextDisabled: boolean, page: number}) {
    const dispatch: AppDispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const handlePage = (pageNumber: number) => {
        dispatch(requestByPage({page: pageNumber, perPage: 10}));
        searchParams.set('page', pageNumber.toString());
        setSearchParams(searchParams);
    }
    
    return <nav className={styles.ideanav}>
        <button
            type="button"
            className={[
                styles.ideanav__button,
                prevDisabled ? styles.ideanav__button_disabled : ''
            ].join(' ')}
            disabled={prevDisabled}
            onClick={() => handlePage(page-1)}
        >&laquo; prev</button>

            <span>{ page }</span>

            <button
            type="button"
            className={[
                styles.ideanav__button,
                nextDisabled ? styles.ideanav__button_disabled : ''
            ].join(' ')}
            disabled={nextDisabled}
            onClick={() => handlePage(page+1)}
        >next &raquo;</button>
    </nav>;
}

export default Navigation;