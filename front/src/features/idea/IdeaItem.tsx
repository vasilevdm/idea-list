import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import styles from './Idea.module.sass'
import Idea from './model/Idea.interface';
import {requestUpdateIdea} from './ideaSlice';
import {AppDispatch} from '../../app/store';

function IdeaItem({item} : {item: Idea}) {
    const dispatch: AppDispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

    const onPressEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            const target = event.target as HTMLInputElement;
            dispatch(requestUpdateIdea({...item, title: target.value}));
            setIsEdit(false);
        }
    }

    const onCheck = (): void => {
        dispatch(requestUpdateIdea({...item, completed: !item.completed}));
    };

    return <li className={[styles.idea, item.completed ? styles.idea_active : ''].join(' ')}>
        <div className={styles.idea__check}>
            <input
                type="checkbox"
                onClick={onCheck}
            />
        </div>
        <div className={styles.idea__text}>
            {
                isEdit
                    ? <input
                        type="text"
                        autoFocus
                        defaultValue={item.title}
                        onBlur={() => setIsEdit(false)}
                        onKeyDown={onPressEnter}
                    />
                    : <span
                        onDoubleClick={() => setIsEdit(true)}
                    >{ item.title }</span>
            }
        </div>
    </li>;
}

export default IdeaItem;