import Links from "../../components/Links/Links.jsx"

import "./Help.css"

export default function HelpPage() {

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
            <p className="help-p">
                You can also click on the "About Me" link below to get to know me a little better!
            </p>
            <Links pageName="Help" />
        </>
    );
}