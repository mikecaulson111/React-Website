import { useState } from "react";
import KanbanBox from "../../components/KanbanBox/KanbanBox.jsx";
import KanbanAddItem from "./KanbanAddItem.jsx";
import Links from "../../components/Links/Links.jsx";

export default function KanbanBoard() {
    const [inProgress, setInProgress] = useState([
        // {title: "Changes to signal protector Popups", description: "", id: 1},
        // {title: "Parental controls bug fix", description: "fix parental controls bug", id: 2},
    ]);
    const [codeReview, setCodeReview] = useState([
        // {title: "Follow up for 015 rework", description: "", id: 3},
    ]);
    const [done, setDone] = useState([
        // {title: "investigate implementing popup changes", description: "", id: 4},
        // {title: "NATV popup changes", description: "popup changes for NATV", id: 5},
        // {title: "get categories working properly", description: "", id: 6},
    ]);

    const [maxId, setMaxId] = useState(7);

    const [showDescriptions, setShowDescriptions] = useState(true);
    const [addNewItem, setAddNewItem] = useState(false);

    const [activeItem, setActiveItem] = useState(null);

    const [isOverProgress, setIsOverProgress] = useState(false);
    const [isOverCode, setIsOverCode] = useState(false);
    const [isOverDone, setIsOverDone] = useState(false);

    function callbackAddItem(object, listToAddTo) {
        if (listToAddTo === -1) {
            return;
        }

        object.id = maxId;
        setMaxId(maxId + 1);
        if (listToAddTo === "0") {
            setInProgress([...inProgress, object]);
        } else if (listToAddTo === "1") {
            setCodeReview([...codeReview, object]);
        } else {
            setDone([...done, object]);
        }
    } 

    function handleToggle() {
        setShowDescriptions(!showDescriptions);
    }

    function commonCallbackFunctionSet(id) {
        setActiveItem(id);
    }

    function commonCallbackFunctionUnset() {
        setActiveItem(null);
    }

    const handleDragEnterP = (e) => {
        e.preventDefault();
        setIsOverProgress(true);
    }
    
    const handleDragLeaveP = (e) => {
        e.preventDefault();
        setIsOverProgress(false);
    }

    const handleDragEnterC = (e) => {
        e.preventDefault();
        setIsOverCode(true);
    }
    const handleDragLeaveC = (e) => {
        e.preventDefault();
        setIsOverCode(false);
    }

    const handleDragEnterD = (e) => {
        e.preventDefault();
        setIsOverDone(true);
    }
    const handleDragLeaveD = (e) => {
        e.preventDefault();
        setIsOverDone(false);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDropP = (e) => {
        e.preventDefault();
        var tempInProgress = [...inProgress];
        var tempCodeReview = [...codeReview];
        var tempDone = [...done];
        setIsOverProgress(false);
        for (var i = 0; i < tempCodeReview.length; i++) {
            if (tempCodeReview[i].id === activeItem) {
                tempInProgress.push(tempCodeReview[i]);
                tempCodeReview.splice(i, 1);
                setCodeReview(tempCodeReview);
                setInProgress(tempInProgress);
                return;
            }
        }
        for (var i = 0; i < tempDone.length; i++) {
            if (tempDone[i].id === activeItem) {
                tempInProgress.push(tempDone[i]);
                tempDone.splice(i, 1);
                setDone(tempDone);
                setInProgress(tempInProgress);
                return;
            }
        }
    }

    const handleDropC = (e) => {
        e.preventDefault();
        var tempInProgress = [...inProgress];
        var tempCodeReview = [...codeReview];
        var tempDone = [...done];
        setIsOverCode(false);
        for (var i = 0; i < tempInProgress.length; i++) {
            if (tempInProgress[i].id === activeItem) {
                tempCodeReview.push(tempInProgress[i]);
                tempInProgress.splice(i, 1);
                setCodeReview(tempCodeReview);
                setInProgress(tempInProgress);
                return;
            }
        }
        for (var i = 0; i < tempDone.length; i++) {
            if (tempDone[i].id === activeItem) {
                tempCodeReview.push(tempDone[i]);
                tempDone.splice(i, 1);
                setDone(tempDone);
                setCodeReview(tempCodeReview);
                return;
            }
        }
    }

    const handleDropD = (e) => {
        e.preventDefault();
        var tempInProgress = [...inProgress];
        var tempCodeReview = [...codeReview];
        var tempDone = [...done];
        setIsOverDone(false);
        for (var i = 0; i < tempInProgress.length; i++) {
            if (tempInProgress[i].id === activeItem) {
                tempDone.push(tempInProgress[i]);
                tempInProgress.splice(i, 1);
                setDone(tempDone);
                setInProgress(tempInProgress);
                return;
            }
        }
        for (var i = 0; i < tempCodeReview.length; i++) {
            if (tempCodeReview[i].id === activeItem) {
                tempDone.push(tempCodeReview[i]);
                tempCodeReview.splice(i, 1);
                setDone(tempDone);
                setCodeReview(tempCodeReview);
                return;
            }
        }
    }


    const tableStyle = {
        borderCollapse: "collapse",
        width: "80%",
        marginTop: "20px",
        fontSize: "24px",
        textAlign: "center"
    };

    const cellStyle = {
        width: "360px",
        height: "180px",
        border: "1px solid #dddddd"
    }

    const headerStyle = {
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

    const sliderStyle = (isOn) => ({
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: isOn ? '#4CAF50' : '#ccc', // Green when on, grey when off
        borderRadius: '25px',
        transition: '0.4s'
    });

    const circleStyle = (isOn) => ({
        position: 'absolute',
        height: '19px',
        width: '19px',
        left: '3px',
        bottom: '3px',
        backgroundColor: 'white',
        borderRadius: '50%',
        transition: '0.4s',
        // Move the circle to the right when "on"
        transform: isOn ? 'translateX(25px)' : 'translateX(0)'
    });
    
    return (
        <>
            <KanbanAddItem callback={callbackAddItem} />
            <p>Note tasks can only be dropped on the name of the categories, not in them (i.e. has to be dragged and dropped on "In Progress")</p>
            <div style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "20px"
            }}>
            <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                <span>{showDescriptions ? "Showing Descriptions" : "Not Showing Descriptions"}</span>
                <label style={containerStyle}>
                    <input
                        type="checkbox"
                        checked={showDescriptions}
                        onChange={handleToggle}
                        style={{display: "none"}}
                    />
                    <span style={sliderStyle(showDescriptions)}>
                        <span style={circleStyle(showDescriptions)} />
                    </span>
                </label>
            </div>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
                width: "100%"
            }}>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={headerStyle} onDragEnter={handleDragEnterP} onDragLeave={handleDragLeaveP} onDragOver={handleDragOver} onDrop={handleDropP}>
                                In Progress
                            </th>
                            <th style={headerStyle} onDragEnter={handleDragEnterC} onDragLeave={handleDragLeaveC} onDragOver={handleDragOver} onDrop={handleDropC}>
                                Code Review
                            </th>
                            <th style={headerStyle} onDragEnter={handleDragEnterD} onDragLeave={handleDragLeaveD} onDragOver={handleDragOver} onDrop={handleDropD}>
                                Done
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{verticalAlign: "top"}}>
                                <table>
                                    <tbody>
                                        {inProgress.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <div
                                                        draggable
                                                        onDragStart={() => commonCallbackFunctionSet(item.id)}
                                                        onDragEnd={commonCallbackFunctionUnset}
                                                    >
                                                        <KanbanBox title={item.title} description={showDescriptions ? item.description : ""} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                            <td style={{verticalAlign: "top"}}>
                                <table>
                                    <tbody>
                                        {codeReview.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <div
                                                        draggable
                                                        onDragStart={() => commonCallbackFunctionSet(item.id)}
                                                        onDragEnd={commonCallbackFunctionUnset}
                                                    >
                                                        <KanbanBox title={item.title} description={showDescriptions ? item.description : ""} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                            <td style={{verticalAlign: "top"}}>
                                <table>
                                    <tbody>
                                        {done.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <div
                                                        draggable
                                                        onDragStart={() => commonCallbackFunctionSet(item.id)}
                                                        onDragEnd={commonCallbackFunctionUnset}
                                                    >
                                                        <KanbanBox title={item.title} description={showDescriptions ? item.description : ""} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Links />
        </>
    );
}
