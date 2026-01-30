import { useState, useEffect } from "react";
import "./GitHubModule.css";

const filterLastWeek = (events, dayOfWeek) => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7 - dayOfWeek);

    return events.filter(event => {
        const eventDate = new Date(event.created_at);
        return eventDate > lastWeek;
    })
}

const getCountForEachDay = (events, dayOfWeek) => {
    var lastDate = new Date();
    var oneWeekBack = new Date();
    oneWeekBack.setDate(oneWeekBack.getDate() - 7);
    var nums = [];
    var tempNums = [];
    lastDate.setDate(lastDate.getDate() - 7 - dayOfWeek);
    // for (var i = 0; i <= (7+dayOfWeek); i++) {
    for (var i = 0; i < 14; i++) {
        if (tempNums.length >= 7) {
            nums.push({id: new Date().getMilliseconds(), vals: tempNums});
            tempNums = [];
        }
        // if (lastDate.toDateString() < oneWeekBack.toDateString() ||
        //     lastDate.toDateString() > new Date().toDateString()) {
        //     tempNums.push(-1);
        // }
        var numEvents = events.filter(event => {
            const eventDate = new Date(event.created_at).toDateString();
            return eventDate === lastDate.toDateString();
        })
        tempNums.push([lastDate.getMonth()+1 + "/" + lastDate.getDate(), numEvents.length]);
        lastDate.setDate(lastDate.getDate() + 1);
    }
    nums.push({id: new Date().getMilliseconds, vals: tempNums});


    return nums;
}

export default function GitHubModule() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dayOfWeek, setDayOfWeek] = useState(0);
    const [fully, setFully] = useState([]);
    var username = "mikecaulson111";

    const tableStyle = {
        borderCollapse: "collapse",
        width: "10%",
        marginTop: "20px",
        fontSize: "24px",
        textAlign: "center",
    };

    const cellStyle = {
        width: "360px",
        height: "180px",
        border: "1px solid #dddddd"
    }

    const cardStyle = {
        ...cellStyle,
        backgroundColor: "#f2f2f2",
    }

    const containerStyle = {
        position: 'relative',
        display: 'inline-block',
        width: '50px',
        height: '25px',
        cursor: 'pointer'
    };

    useEffect(() => {
        fetch(`https://api.github.com/users/${username}/events`)
            .then(res => res.json())
            .then(data => {
                const today = new Date().getDay();
                const filtered = filterLastWeek(data, today);
                setEvents(filtered);
                setDayOfWeek(today);
                const processedData = getCountForEachDay(filtered, today);
                setFully(processedData);
                setLoading(false);
            })
            .catch(err => console.error("GitHub API failed", err));
    }, [username]);

  if (loading) return <div>Loading GitHub Activity...</div>;

  return (
    <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        width: "100%" 
    }}>
      <h2>Github events from me over the last week or so</h2>
      <p>To my personal account, not including my work account</p>
      <h3>legend</h3>
      <p className="light-grey-block">0 Contributions   </p>
      <p className="light-green-block">1-3 Contributions</p>
      <p className="dark-green-block">3+ Contributions  </p>
      <table style={tableStyle}>
        <thead>
            <tr>
                <th style={{...cellStyle, width: 'auto', height: 'auto'}}>Sun</th>
                <th style={{...cellStyle, width: 'auto', height: 'auto'}}>Mon</th>
                <th style={{...cellStyle, width: 'auto', height: 'auto'}}>Tue</th>
                <th style={{...cellStyle, width: 'auto', height: 'auto'}}>Wed</th>
                <th style={{...cellStyle, width: 'auto', height: 'auto'}}>Thu</th>
                <th style={{...cellStyle, width: 'auto', height: 'auto'}}>Fri</th>
                <th style={{...cellStyle, width: 'auto', height: 'auto'}}>Sat</th>
            </tr>
        </thead>
        <tbody>
            {events && fully.map((week) => (
                <tr key={week.id}>
                    {week?.vals?.map((day) => (
                        <td key={day[0]} className={day[1] === 0 ? "light-grey-block" : day[1] < 4 ? "light-green-block" : "dark-green-block"}>
                            <p>{day[0]}</p>
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
      </table>
    </div>
);
}