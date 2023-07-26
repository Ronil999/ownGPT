import React, { useState } from 'react'
import './Contact.css'

const Contact = () => {

    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleClick = async () => {

        if (!name || !subject || !email || !phone || !message) {
            alert('Please fill in all required fields');
            return;
        }

        else {
            let result = await fetch('http://localhost:8000/contact', {
                method: 'POST',

                body: JSON.stringify({ name, subject, email, phone, message }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            result = await result.json();
            if (result.success) {
                alert("Thank you for contacting us!");

                setName('');
                setSubject('');
                setEmail('');
                setPhone('');
                setMessage('');
            }
            else {
                alert("Something went Wrong")
            }
        }
    };

    return (
        <div>
            <section id="section-wrapper">
                <div className="box-wrapper">
                    <div className="info-wrap">
                        <h2 className="info-title">Contact Information</h2>
                        <h3 className="info-sub-title">Fill up the form and our Team will get back to you within 24 hours</h3>
                        <ul className="info-details">
                            <li>
                                <i className="fas fa-phone-alt"></i>
                                <span>Phone:</span> <a href="tel:+ 1235 2355 98">+ 1235 2355 98</a>
                            </li>
                            <li>
                                <i className="fas fa-paper-plane"></i>
                                <span>Email:</span> <a href="mailto:info@yoursite.com">info@gmail.com</a>
                            </li>
                            <li>
                                <i className="fas fa-globe"></i>
                                <span>Website:</span> <a href="#">yoursite.com</a>
                            </li>
                        </ul>
                        <ul className="social-icons">
                            <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                        </ul>
                    </div>
                    <div className="form-wrap">
                        {/* <form action="#" method="POST"> */}
                        <h2 className="form-title">Send us a message</h2>
                        <div className="form-fields">
                            <div className="form-group">
                                <input type="text" className="fname" value={name} onChange={(e) => setName(e.target.value)} placeholder=" Name" required />
                            </div>
                            <div className="form-group">
                                <input type="text" className="lname" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" required />
                            </div>
                            <div className="form-group">
                                <input type="email" className="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Mail" required />
                            </div>
                            <div className="form-group">
                                <input type="number" className="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required />
                            </div>
                            <div className="form-group">
                                <textarea name="message" id="" placeholder="Write your message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                            </div>
                        </div>
                        <input type="submit" value="Send Message" className="submit-button" onClick={handleClick} />
                        {/* </form> */}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact
