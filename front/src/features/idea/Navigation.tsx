import React from 'react';
import {useDispatch} from 'react-redux';
import styles from './Idea.module.sass';
import {requestByPage} from './ideaSlice';
import {AppDispatch} from '../../app/store';

function Navigation({prevDisabled, nextDisabled, page}: {prevDisabled: boolean, nextDisabled: boolean, page: number}) {
    const dispatch: AppDispatch = useDispatch();
    
    return <nav className={styles.ideanav}>
        <button
            type="button"
            className={[
                styles.ideanav__button,
                prevDisabled ? styles.ideanav__button_disabled : ''
            ].join(' ')}
            disabled={prevDisabled}
            onClick={() => dispatch(requestByPage({page: page-1, perPage: 10}))}
        >&laquo; prev</button>

            <span>{ page }</span>

            <button
            type="button"
            className={[
                styles.ideanav__button,
                nextDisabled ? styles.ideanav__button_disabled : ''
            ].join(' ')}
            disabled={nextDisabled}
            onClick={() => dispatch(requestByPage({page: page+1, perPage: 10}))}
        >next &raquo;</button>
    </nav>;
}

export default Navigation;