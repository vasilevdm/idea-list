import React from 'react';
import styles from './Idea.module.sass'
import IdeaItem from './IdeaItem';
import Idea from './model/Idea.interface';
import {
    requestCreateIdea,
    selectError,
    ideaSelectors,
    selectLoading,
} from './ideaSlice';
import {AppDispatch} from '../../app/store';
import Navigation from './Navigation';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import IdeaLoader from './IdeaLoader';

function IdeaList() {
    const ideaList: Idea[] = useAppSelector(ideaSelectors.selectAll);
    const error: string = useAppSelector(selectError);
    const loading: boolean = useAppSelector(selectLoading);

    const dispatch: AppDispatch = useAppDispatch();

    const onPressEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            const target = event.target as HTMLInputElement;
            dispatch(requestCreateIdea(target.value));
            target.value = '';
        }
    }

    return <section className={styles.container}>
        <div className={styles.header}>
            <input
                className={styles.header__input}
                type="text"
                placeholder="enter text..."
                disabled={loading}
                onKeyDown={onPressEnter}
            />
        </div>
        {
            !ideaList.length && <IdeaLoader/>
        }
        <ul className={styles.idea_list}>
            {
                ideaList.map(idea => <IdeaItem key={idea.id} item={idea} />)
            }
        </ul>
        <Navigation />
        <div className={styles.loading_error}>{error}</div>
    </section>;
}

export default IdeaList;