import { useState } from "react";

export default function StockTracker() {
    const [ticker, setTicker] = useState('');
    const [stockData, setStockData] = useState(null);
    const [error, setError] = useState('');

    const alphaVantageApiKey = import.meta.env.VITE_ALPHA_VANTAGE_KEY;
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker.toUpperCase()}&apikey=${alphaVantageApiKey}`;

    const fetchStockPrice = async (e) => {
        e.preventDefault();
        setError('');
        setStockData(null);

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data["Global Quote"] && data["Global Quote"]["05. price"]) {
              setStockData({
                price: parseFloat(data["Global Quote"]["05. price"]).toFixed(2),
                changePercent: parseFloat(data["Global Quote"]["10. change percent"]).toFixed(2),
                change: parseFloat(data["Global Quote"]["09. change"]).toFixed(2),
              });
            } else {
                setError('Ticker not found or API limit reached.');
            }
        } catch (err) {
            setError("Failed to fetch data");
        }
    };

    return (
        <>
            <h3>Stock Tracker</h3>

            <div style={{padding: "20px", textAlign: "center"}}>
                <form onSubmit={fetchStockPrice}>
                    <input
                        type= "text"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                        placeholder= "Enter ticker (e.g., AAPL)"
                        style={{padding: "8px", marginRight: "10px"}}
                    />
                    <button type="submit" style={{padding: "8px 15px", color: "green", backgroundColor: "lightGreen"}}>Get Price</button>
                </form>

                {error && <p style={{color: "red"}}>{error}</p>}

                {stockData && (
                    <div style={{marginTop: "20px", fontSize: "20px"}}>
                        <strong>{ticker.toUpperCase()} Current Price:</strong> ${stockData.price}
                        <span style={{color: stockData.changePercent >= 0 ? "green" : "red", marginLeft: "10px"}}>
                            ({stockData.changePercent}%)
                            (${stockData.change})
                        </span>
                    </div>
                )}
            </div>
        </>
    );
}