import styles from './Card.module.css';


function Card({ onClick }) {
    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.cardBack}>Back</div>
            <div className={styles.cardFront}>Front</div>
        </div>
    );
}

export default Card;