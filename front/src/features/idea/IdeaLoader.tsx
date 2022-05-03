import React from 'react';
import styles from './Idea.module.sass';

function IdeaLoader() {
    return <div className={styles.loader}><div className={styles.loader__spinner} /></div>;
}

export default IdeaLoader;