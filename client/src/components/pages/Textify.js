import React, { useState } from 'react';
import Spinner from './Spinner'
import './textify.css'

const Textify = () => {

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [copied, setCopied] = useState(false);

    const handleClick = async (e) => {
        setLoading(true);
        const response = await fetch('https://owngpt-api.vercel.app/textify/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: message })
        });
        const data = await response.json();
        setLoading(false);
        let result = data.choices[0].text.trimStart();
        setText(result);
    
        // Store history
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const historyData = {
            userId,
            app: 'Textify',
            userInput: message,
            aiOutput: result,
        };
        await fetch('https://owngpt-api.vercel.app/history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(historyData),
        });
    }
    

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
    }

    return (
        <div>
            <div className="video">
                {/* <video width="320" height="240" muted loop autoplay>
                    <source src="/videos/textify-background.mp4" type="video/mp4" />
                    <source src="movie.ogg" type="video/ogg" />
                </video> */}
                <video src='/videos/textify-background.mp4' autoPlay loop muted />
            </div>


            <section className="my-ai-from">
                <div className="my-container">
                    <div className="my-form">
                        <p className="my-form-title">TEXTIFY</p>
                        <div className="my-main-label-1">
                            <label className="my-form-label"> Enter Your Prompt</label>
                            <div className="input-group main-group">
                                <input type="text" className="form-control" value={message} onChange={(e) => setMessage(e.target.value)} />
                                <button className='btn btn-primary sentbtn' onClick={handleClick} disabled={!message}><span className="text">SEND</span><span className="text"><i
                                    className="fa-solid fa-paper-plane"></i></span></button>
                            </div>
                        </div>
                        <div style={{ height: "50px" }}>{loading && <Spinner />}</div> 
                        <div className="my-main-label-2">
                            <label className="my-form-label">Your Answer</label>
                            <textarea className="form-control" value={text} rows="10" disabled></textarea>
                        </div>
                        <button className="copybtn" onClick={handleCopy} style={{borderRadius: "0px"}}disabled={!text}>{copied ? "Copied !!" : "Copy"}</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Textify
