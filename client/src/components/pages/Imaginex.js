import React, { useState } from 'react';
import Spinner from './Spinner';
import './textify.css';

const Imaginex = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);

    const handleClick = async () => {
        setLoading(true);
        const response = await fetch('https://owngpt-api.vercel.app/imaginex/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: message }),
        });
        const data = await response.json();
        setLoading(false);
        setImageUrls(data.data.map((item) => item.url));
    
        // Store history
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const historyData = {
            userId,
            app: 'Imaginex',
            userInput: message,
            aiOutput: data.data.map((item) => item.url),
        };
        await fetch('https://owngpt-api.vercel.app/history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(historyData),
        });
    };
    

    return (
        <div>
            <div className="video">
                <video src="/videos/imaginex-background.mp4" autoPlay loop muted />
            </div>

            <section className="my-ai-from">
                <div className="my-container">
                    <div className="my-form">
                        <p className="my-form-title">IMAGINEX</p>
                        <div className="my-main-label-1">
                            <label className="my-form-label"> Enter Your Prompt</label>
                            <div className="input-group main-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />

                                <button
                                    className="btn btn-primary sentbtn"
                                    onClick={handleClick}
                                    disabled={!message}
                                >
                                    <span className="text">Generate</span>
                                    <span className="text">
                                        <i className="fa-solid fa-paper-plane"></i>
                                    </span>
                                </button>
                            </div>
                            <div style={{ height: '50px' }}>{loading && <Spinner />}</div>
                            {imageUrls.length > 0 ? (
                                <><label className="my-form-label"> Your Generated Images</label><div className="main-imagespart">
                                    {imageUrls.map((url, index) => (
                                        <div className="image-1" key={index}>
                                            <img
                                                src={url}
                                                height={"218.5px"}
                                                alt={`Generated Image ${index + 1}`} />
                                        </div>
                                    ))}
                                </div></>
                            ) : (
                                <div className="main-imagespart">
                                    <p className="imagebox"></p>
                                    <p className="imagebox"></p>
                                    <p className="imagebox"></p>
                                    <p className="imagebox"></p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Imaginex;
