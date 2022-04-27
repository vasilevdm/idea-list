import React from "react";
import styles from "./Idea.module.sass"
import Idea from "./model/Idea.interface";

function IdeaItem({item} : {item: Idea}) {
    return <li className={[styles.idea, item.completed ? styles.idea_active : ''].join(' ')}>
        <div className={styles.idea__check}>
            <input type="checkbox"/>
        </div>
        <div className={styles.idea__text}>
            <span>{ item.title }</span>
        </div>
    </li>;
}

export default IdeaItem;