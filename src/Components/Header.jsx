import styles from "./Header.module.css";

const Header = (props) => {
  const { euroRates, usdRates } = props;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.rates}>
          <span>
            USD:&nbsp;
            <b>{usdRates}</b>&nbsp;/&nbsp;
          </span>
          <span>
            EUR:&nbsp;
            <b>{euroRates}</b>
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
