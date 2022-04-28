import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Idea.module.sass'
import IdeaItem from './IdeaItem';
import Idea from './model/Idea.interface';
import {requestByPage, selectIdeaList, selectLoading, selectPage} from './ideaSlice';
import {AppDispatch} from '../../app/store';
import Navigation from './Navigation';

function IdeaList() {
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(requestByPage({
            page: 1,
            perPage: 10
        }));
    }, []);

    const loading: boolean = useSelector(selectLoading);
    const ideaList: Idea[] = useSelector(selectIdeaList);
    const page: number = useSelector(selectPage);

    const prevDisabled = page === 1 || loading;
    const nextDisabled = loading;

    return <section className={styles.container}>
        <div className={styles.header}>
            <input className={styles.header__input} type="text" placeholder="enter text..."/>
        </div>
        <ul className={styles.idea_list}>
            {
                ideaList ? ideaList.map(idea => <IdeaItem key={idea.id} item={idea} />): ''
            }
        </ul>
        <Navigation prevDisabled={prevDisabled} nextDisabled={nextDisabled} page={page} />
    </section>;
}

export default IdeaList;