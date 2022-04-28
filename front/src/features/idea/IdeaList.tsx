import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Idea.module.sass'
import IdeaItem from './IdeaItem';
import Idea from './model/Idea.interface';
import {
    requestCreateIdea,
    selectError,
    selectIdeaList,
} from './ideaSlice';
import {AppDispatch} from '../../app/store';
import Navigation from './Navigation';

function IdeaList() {
        const ideaList: Idea[] = useSelector(selectIdeaList);
    const error: string = useSelector(selectError);

    const dispatch: AppDispatch = useDispatch();

    const onPressEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            const target = event.target as HTMLInputElement;
            dispatch(requestCreateIdea(target.value));
            target.value = '';
        }
    }

    return <section className={styles.container}>
        <div className={styles.header}>
            <input className={styles.header__input} type="text" placeholder="enter text..." onKeyDown={onPressEnter}/>
        </div>
        <ul className={styles.idea_list}>
            {
                ideaList ? ideaList.map(idea => <IdeaItem key={idea.id} item={idea} />): ''
            }
        </ul>
        <Navigation />
        <div className={styles.loading_error}>{error}</div>
    </section>;
}

export default IdeaList;