import React, { useState } from 'react';
import Spinner from './Spinner';
import './textify.css';

const Imaginex = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);

    const handleClick = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:8000/imaginex/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: message }),
        });
        const data = await response.json();
        setLoading(false);
        setImageUrls(data.data.map((item) => item.url));
    };

    return (
        <div>
            <div class="video">
                <video src="/videos/imaginex-background.mp4" autoPlay loop muted />
            </div>

            <section class="my-ai-from">
                <div class="my-container">
                    <div class="my-form">
                        <p class="my-form-title">IMAGINEX</p>
                        <div class="my-main-label-1">
                            <label class="my-form-label"> Enter Your Prompt</label>
                            <div class="input-group main-group">
                                <input
                                    type="text"
                                    class="form-control"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />

                                <button
                                    className="btn btn-primary sentbtn"
                                    onClick={handleClick}
                                    disabled={!message}
                                >
                                    <span class="text">SEND</span>
                                    <span class="text">
                                        <i class="fa-solid fa-paper-plane"></i>
                                    </span>
                                </button>
                            </div>
                            <div style={{ height: '50px' }}>{loading && <Spinner />}</div>
                            {imageUrls.length > 0 ? (
                                <div class="main-imagespart">
                                    {imageUrls.map((url, index) => (
                                        <div class="image-1">
                                            <img
                                                key={index}
                                                src={url}
                                                alt={`Generated Image ${index + 1}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div class="main-imagespart">
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
