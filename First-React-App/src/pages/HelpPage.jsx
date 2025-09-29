import { Router, useNavigate } from "react-router-dom"

export default function HelpPage() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    }
    return (
        <>
            <h3>BAM</h3>
            <button className="my-link" onClick={() => goToHome("/")}>Home</button>
        </>
    );
}