import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSearchParams} from 'react-router-dom';
import styles from './Idea.module.sass'
import IdeaItem from './IdeaItem';
import Idea from './model/Idea.interface';
import {requestByPage, selectIdeaList, selectLoading, selectPage} from './ideaSlice';
import {AppDispatch} from '../../app/store';
import Navigation from './Navigation';

function IdeaList() {
    const [searchParams] = useSearchParams();
    const queryPage = Number(searchParams.get('page')) || 1;

    const loading: boolean = useSelector(selectLoading);
    const ideaList: Idea[] = useSelector(selectIdeaList);
    const page: number = useSelector(selectPage);

    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        if (!page) {
            dispatch(requestByPage({
                page: queryPage,
                perPage: 10
            }));
        }
    }, []);

    const prevDisabled = useMemo(() => page === 1 || loading, [page, loading]);
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