import "./KanbanBox.css";

export default function KanbanBox({title, description, id, setFunction, unsetFunction}) {
    return (
        <>
            <div
                className="kanban-box"
            >
                <h3>{title}</h3>
                <p>{description ? description : ""}</p>
            </div>
        </>
    )
}
