// Importing necessary components from Material UI
import styles from "./Card.module.scss";

//Card component with children and cardClass
const Card = ({ children, cardClass }) => {
  return <div className={`${styles.card} ${cardClass}`}>{children}</div>;
};

export default Card;
