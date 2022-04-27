import React from "react";
import styles from "./Idea.module.sass"
import IdeaItem from "./IdeaItem";
import {useState} from "react";
import Idea from "./model/Idea.interface";

function IdeaList() {
    const data: Idea[] = [
        {
            id: 1,
            title: 'idea 1',
            completed: false
        },
        {
            id: 2,
            title: 'idea 2',
            completed: true
        }
    ];

    const [ideas, setIdeas] = useState(data);

    const onPressEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            const target = event.target as HTMLInputElement;
            setIdeas([{id:Math.random(), title:target.value, completed:false},...ideas]);
            target.value = '';
        }
    }

    return <section className={styles.container}>
        <div className={styles.header}>
            <input className={styles.header__input} type="text" placeholder="enter text..." onKeyDown={onPressEnter}/>
        </div>
        <ul className={styles.idea_list}>
            {
                ideas.map(idea => <IdeaItem key={idea.id} item={idea} />)
            }
        </ul>
        <nav>
            <button>&laquo; prev</button>
            <button className={styles.active}>next &raquo;</button>
        </nav>
    </section>;
}

export default IdeaList;