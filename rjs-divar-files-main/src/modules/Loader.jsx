import styles from "../modules/Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default Loader;
