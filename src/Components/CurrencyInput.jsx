import styles from "./CurrencyInput.module.css";

const CurrencyInput = (props) => {
  const {
    onAmountChange,
    onCurrencyChange,
    currencies,
    currency,
    amount
  } = props;
  return (
    <div className={styles.currencyInput}>
      <input
        type="text"
        value={amount}
        onChange={(event) => onAmountChange(event.target.value)}
      />
      <select
        value={currency}
        onChange={(event) => onCurrencyChange(event.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};
export default CurrencyInput;
