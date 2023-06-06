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

        history(message, result);

    }



    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
    }

    const history = async (userInput, aiOutput) => {
        const userId = JSON.parse(localStorage.getItem('user'))._id;

        let result = await fetch('http://localhost:8000/history', {
            method: "POST",
            body: JSON.stringify({ userId, userInput, aiOutput }),
            headers: {
                "Content-Type": "application/json"
            },
        });
        result = await result.json();
    }

    return (
        <div>
            <div class="video">
                {/* <video width="320" height="240" muted loop autoplay>
                    <source src="/videos/textify-background.mp4" type="video/mp4" />
                    <source src="movie.ogg" type="video/ogg" />
                </video> */}
                <video src='/videos/textify-background.mp4' autoPlay loop muted />
            </div>


            <section class="my-ai-from">
                <div class="my-container">
                    <div class="my-form">
                        <p class="my-form-title">TEXTIFY</p>
                        <div class="my-main-label-1">
                            <label class="my-form-label"> Enter Your Prompt</label>
                            <div class="input-group main-group">
                                <input type="text" class="form-control" value={message} onChange={(e) => setMessage(e.target.value)} />
                                <button className='btn btn-primary sentbtn' onClick={handleClick} disabled={!message}><span class="text">SEND</span><span class="text"><i
                                    class="fa-solid fa-paper-plane"></i></span></button>
                            </div>
                        </div>
                        <div style={{ height: "50px" }}>{loading && <Spinner />}</div> 
                        <div class="my-main-label-2">
                            <label class="my-form-label">Your Answer</label>
                            <textarea class="form-control" value={text} rows="10" disabled></textarea>
                        </div>
                        <button class="copybtn" onClick={handleCopy} style={{borderRadius: "0px"}}disabled={!text}>{copied ? "Copied !!" : "Copy"}</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Textify
