import { useState } from "react";
import KanbanBox from "../../components/KanbanBox/KanbanBox";

export default function KanbanBoard() {
    const [inProgress, setInProgress] = useState([
        {title: "Changes to signal protector Popups", description: "", id: 1},
        {title: "Parental controls bug fix", description: "fix parental controls bug", id: 2},
    ]);
    const [codeReview, setCodeReview] = useState([
        {title: "Follow up for 015 rework", description: "", id: 3},
    ]);
    const [done, setDone] = useState([
        {title: "investigate implementing popup changes", description: "", id: 4},
        {title: "NATV popup changes", description: "popup changes for NATV", id: 5},
        {title: "get categories working properly", description: "", id: 6},
    ]);

    // this attempt will try with items that are objects that contain the place it should be (in progress, done, etc) as well as the description
    const [allItems, setAllItems] = useState([]);
    const [activeItem, setActiveItem] = useState(null);

    const [isOverProgress, setIsOverProgress] = useState(false);
    const [isOverCode, setIsOverCode] = useState(false);
    const [isOverDone, setIsOverDone] = useState(false);

    function commonCallbackFunctionSet(id) {
        setActiveItem(id);
        console.log("Setting:", id);
    }

    function commonCallbackFunctionUnset() {
        setActiveItem(null);
        console.log("Unsetting");
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
        console.error("Dropped in progress:", activeItem);
        var tempInProgress = [...inProgress];
        var tempCodeReview = [...codeReview];
        var tempDone = [...done];
        setIsOverProgress(false);
        for (var i = 0; i < tempCodeReview.length; i++) {
            if (tempCodeReview[i].id === activeItem) {
                console.log("Dropped from code review");
                tempInProgress.push(tempCodeReview[i]);
                tempCodeReview.splice(i, 1);
                setCodeReview(tempCodeReview);
                setInProgress(tempInProgress);
                return;
            }
        }
        for (var i = 0; i < tempDone.length; i++) {
            if (tempDone[i].id === activeItem) {
                console.log("dropped from done");
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


    
    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
                width: "100%"
            }}>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={headerStyle}>
                                <div onDragEnter={handleDragEnterP} onDragLeave={handleDragLeaveP} onDragOver={handleDragOver} onDrop={handleDropP}>
                                    In Progress
                                </div>
                            </th>
                            <th style={headerStyle}>
                                <div onDragEnter={handleDragEnterC} onDragLeave={handleDragLeaveC} onDragOver={handleDragOver} onDrop={handleDropC}>
                                    Code Review
                                </div>
                            </th>
                            <th style={headerStyle}>
                                <div onDragEnter={handleDragEnterD} onDragLeave={handleDragLeaveD} onDragOver={handleDragOver} onDrop={handleDropD}>
                                    Done
                                </div>
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
                                                        <KanbanBox title={item.title} description={item.description} />
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
                                                        <KanbanBox title={item.title} description={item.description} />
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
                                                        <KanbanBox title={item.title} description={item.description} />
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
        </>
    );
}