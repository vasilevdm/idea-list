import React, {useState, useRef, RefObject, useEffect} from 'react';
import styles from './Idea.module.sass'
import Idea from './model/Idea.interface';
import {requestRemoveIdea, requestUpdateIdea, selectLoading} from './ideaSlice';
import {AppDispatch} from '../../app/store';
import {useAppDispatch, useAppSelector} from '../../app/hooks';

function IdeaItem({item} : {item: Idea}) {
    const dispatch: AppDispatch = useAppDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const loading = useAppSelector(selectLoading);
    const inputRef = useRef() as RefObject<HTMLInputElement>;

    const onPressEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            const target = event.target as HTMLInputElement;
            if (target.value !== item.title) {
                dispatch(requestUpdateIdea({...item, title: target.value}));
            }
            setIsEdit(false);
        }
    };

    const onCheck = (): void => {
        dispatch(requestUpdateIdea({...item, completed: !item.completed}));
    };

    const onDelete = (): void => {
        dispatch(requestRemoveIdea(item.id));
    };

    const onDoubleClick = (): void => {
        setIsEdit(true);
    };
    useEffect(() => {
        inputRef.current?.focus();
    }, [isEdit])

    const onBlur = (): void => {
        setIsEdit(false);
    }

    return <li className={[styles.idea, item.completed ? styles.idea_active : ''].join(' ')}>
        <div className={styles.idea__check}>
            <input
                type="checkbox"
                disabled={loading}
                onClick={onCheck}
            />
        </div>
        <div className={styles.idea__text}>
            {
                isEdit
                    ? <input
                        type="text"
                        defaultValue={item.title}
                        onBlur={onBlur}
                        onKeyDown={onPressEnter}
                        ref={inputRef}
                    />
                    : <span
                        onDoubleClick={onDoubleClick}
                    >{ item.title }</span>
            }
        </div>
        <button type="button" className={styles.idea__delete} onClick={onDelete} disabled={loading}>❌</button>
    </li>;
}

export default IdeaItem;