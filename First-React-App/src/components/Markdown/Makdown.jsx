import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import "./Markdown.css"


export default function Markdown() {
    const [markdownText, setMarkdownText] = useState("# Hello!");

    return (
        <>
            <h3>
                Type in Markdown in text box below and see it come to life!
            </h3>
            <textarea
                className="markdown-textarea"
                value={markdownText}
                onChange={(e) => setMarkdownText(e.target.value)}
            />
            <ReactMarkdown>
                {markdownText}
            </ReactMarkdown>
        </>
    );
}