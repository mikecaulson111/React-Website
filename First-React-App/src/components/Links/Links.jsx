import { useNavigate } from "react-router-dom"

export default function Links( props ) {
    const navigate = useNavigate();

    const handleGoToHome = () => {
        navigate("/");
    }

    const handleGoToAboutMe = () => {
        navigate("/about-me");
    }

    const handleGoToHelp = () => {
        navigate("/help");
    }

    const pages = ["Home", "Help", "About Me"];
    const handles = [handleGoToHome, handleGoToHelp, handleGoToAboutMe];

    return (
        <div className="button-menu">
            {pages.map((page, i) => (
                page !== props.pageName ? <button key={page} className="my-link" onClick={handles[i]}>{page}</button> : ""
            ))}
        </div>
    );
}