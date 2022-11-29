import styles from "./Converter.module.css";
import { useState, useEffect, useCallback } from "react";
import CurrencyInput from "../Components/CurrencyInput.jsx";
import Header from "../Components/Header.jsx";
import runFetch from "../data/api";

const Converter = () => {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("UAH");
  const [rates, setRates] = useState([]);
  const [euroRates, setEuroRates] = useState([]);
  const [usdRates, setUsdRates] = useState([]);

  const getRates = async () => {
    try {
      const getRes = await runFetch(`/latest`, {});
      setRates(getRes.rates || []);
    } catch (error) {
      console.error(error);
    }
  };

  const getCurRates = async (from, to) => {
    try {
      const getRes = await runFetch(`/convert`, {
        to,
        from,
        amount: 1
      });
      return getRes.result || 0;
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  const roundUp = (number) => {
    return number?.toFixed(4) || 0;
  };

  const handleAmount1Change = useCallback(
    (amount1) => {
      setAmount2(roundUp((amount1 * rates[currency2]) / rates[currency1]));
      setAmount1(amount1);
    },
    [rates, currency2, currency1]
  );

  const handleCurrency1Change = (currency1) => {
    setAmount2(roundUp((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  };

  const handleAmount2Change = (amount2) => {
    setAmount1(roundUp((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  };

  const handleCurrency2Change = (currency2) => {
    setAmount1(roundUp((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  };

  useEffect(() => {
    getRates();
    const getDefaultRates = async () => {
      setUsdRates(await getCurRates("USD", "UAH"));
      setEuroRates(await getCurRates("EUR", "UAH"));
    };
    getDefaultRates();
  }, []);

  useEffect(() => {
    if (!!rates) {
      const init = () => {
        handleAmount1Change(1);
      };
      init();
    }
  }, [rates, handleAmount1Change]);

  return (
    <>
      <Header euroRates={euroRates} usdRates={usdRates} />
      <section className={styles.inputcontainer}>
        <div className={styles.inputdiv}>
          <h1 className={styles.currencyconverter}>Currency Converter</h1>
          <CurrencyInput
            onAmountChange={handleAmount1Change}
            onCurrencyChange={handleCurrency1Change}
            currencies={Object.keys(rates)}
            amount={amount1}
            currency={currency1}
          />
          <CurrencyInput
            onAmountChange={handleAmount2Change}
            onCurrencyChange={handleCurrency2Change}
            currencies={Object.keys(rates)}
            amount={amount2}
            currency={currency2}
          />
        </div>
      </section>
    </>
  );
};
export default Converter;
