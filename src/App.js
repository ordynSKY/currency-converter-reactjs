import "./App.css";
import CurrencyInput from "./CurrencyInput";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";

function App() {
    const [amount1, setAmount1] = useState(1);
    const [amount2, setAmount2] = useState(1);
    const [currency1, setCurrency1] = useState("USD");
    const [currency2, setCurrency2] = useState("UAH");
    const [rates, setRates] = useState([]);
    const [euroRates, setEuroRates] = useState([]);
    const [usdRates, setUsdRates] = useState([]);

    useEffect(() => {
        axios
            .get("https://api.apilayer.com/fixer/latest", {
                headers: {
                    apikey: "MzXs1VvPQ7jjZP2GEXx4H1udA9TjCEIg",
                },
            })
            .then((response) => {
                setRates(response.data.rates);
            })
            .catch((err) => console.log("error", err));

        axios
            .get(
                "https://api.apilayer.com/fixer/convert?to=UAH&from=EUR&amount=1",
                {
                    headers: {
                        apikey: "MzXs1VvPQ7jjZP2GEXx4H1udA9TjCEIg",
                    },
                }
            )
            .then((response) => {
                setEuroRates(response.data.result);
            })
            .catch((err) => console.log("error", err));

        axios
            .get(
                "https://api.apilayer.com/fixer/convert?to=UAH&from=USD&amount=1",
                {
                    headers: {
                        apikey: "MzXs1VvPQ7jjZP2GEXx4H1udA9TjCEIg",
                    },
                }
            )
            .then((response) => {
                setUsdRates(response.data.result);
            })
            .catch((err) => console.log("error", err));
    }, []);

    useEffect(() => {
        if (!!rates) {
            function init() {
                handleAmount1Change(1);
            }
            init();
        }
    }, [rates]);

    function roundUp(number) {
        return number.toFixed(4);
    }

    function handleAmount1Change(amount1) {
        setAmount2(roundUp((amount1 * rates[currency2]) / rates[currency1]));
        setAmount1(amount1);
    }

    function handleCurrency1Change(currency1) {
        setAmount2(roundUp((amount1 * rates[currency2]) / rates[currency1]));
        setCurrency1(currency1);
    }

    function handleAmount2Change(amount2) {
        setAmount1(roundUp((amount2 * rates[currency1]) / rates[currency2]));
        setAmount2(amount2);
    }

    function handleCurrency2Change(currency2) {
        setAmount1(roundUp((amount2 * rates[currency1]) / rates[currency2]));
        setCurrency2(currency2);
    }

    return (
        <>
            <Header euroRates={euroRates} usdRates={usdRates} />
            <section className="input-container">
                <div className="input-div">
                    <h1 className="currency-converter">Currency Converter</h1>
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
}

export default App;
