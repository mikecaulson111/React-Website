import { useNavigate } from "react-router-dom"

import "./Help.css"

export default function HelpPage() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    }
    return (
        <>
            <h2>Help Page</h2>
            <p className="help-p">
                Currently there is not much to help with.
                At the bottom of the home page, you will notice a couple buttons.
                These buttons are used to show some of the different projects that I have
                coded. They range from very simple to more mathematically complex currently.
                Feel free to go back to the home page and mess around with them.
            </p>
            <button className="my-link" onClick={() => goToHome("/")}>Home</button>
        </>
    );
}