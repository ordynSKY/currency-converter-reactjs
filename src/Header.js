import React from "react";

const Header = (props) => {
    const { euroRates, usdRates } = props;

    console.log("usd", usdRates);

    return (
        <>
            <div
                style={{
                    height: "100px",
                    backgroundColor: "#92001A",
                    color: "white",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "40px",
                    }}
                >
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
