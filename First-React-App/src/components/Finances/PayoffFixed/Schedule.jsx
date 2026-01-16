
export default function Schedule({months, balances, interest, monthlyPayments}) {
    const tableData = months?.map((month, i) => ({
        month: month,
        balance: balances[i] || 0,
        interest: interest[i] || 0,
        paid: balances[i] > 0 ? monthlyPayments * (i + 1) : (monthlyPayments * i) + (balances[i - 1] || 0)
    }));

    const tableStyle = {
        borderCollapse: "collapse",
        width: "80%",
        marginTop: "20px",
        fontSize: "18px",
        textAlign: "left"
    };

    const cellStyle = {
        border: "1px solid #dddddd",
        padding: "12px",
    };

    const headerStyle = {
        ...cellStyle,
        backgroundColor: "#f2f2f2",
        fontWeight: "bold"
    }

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
            width: "100%"
        }}>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={headerStyle}>Month</th>
                        <th style={headerStyle}>Balance</th>
                        <th style={headerStyle}>Accrued Interest</th>
                        <th style={headerStyle}>Paid amount</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td style={cellStyle}>{row.month}</td>
                            <td style={cellStyle}>${row.balance.toFixed(2)}</td>
                            <td style={cellStyle}>${row.interest.toFixed(2)}</td>
                            <td style={cellStyle}>${row.paid.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}