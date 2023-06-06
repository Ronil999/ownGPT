import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './signup.css';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    })

    
    const collectData = async () => {
        // Check if all fields are filled
        if (!name || !email || !password) {
            alert("All fields are mandatory");
        } else if (!validateEmail(email)) {
            alert("Please enter a valid email address");
        } else {
            let result = await fetch('https://owngpt-api.vercel.app/register', {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            result = await result.json();
            if (result === "Email already exists") {
                alert(result);
            } else {
                localStorage.setItem("user", JSON.stringify(result));
                navigate('/')
            }
        }
    }
    
    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    return (
        <div>
            <div class="LoginPageContainer">
                <div class="LoginPageInnerContainer">
                    <div class="ImageContianer">
                        <img src="images/loginimage.jpg"
                            class="" />
                    </div>
                    <div class="LoginFormContainer">
                        <div class="LoginFormInnerContainer">
                            <div class="LogoContainer">
                                <img src="" class="logo" />
                            </div>
                            <header class="header" style={{ color: "white" }}>Sign Up</header>

                            <div>
                                <div class="inputContainer">
                                    <label class="label" ><img src="images/user (1).png"
                                        class="labelIcon" /><span>User Name*</span></label>
                                    <input type="name" class="input" placeholder="Enter your User Name" value={name} onChange={(e) => setName(e.target.value)}/>
                                </div>
                                <div class="inputContainer">
                                    <label class="label" ><img src="images/email (1).png"
                                        class="labelIcon" /><span>Email
                                            Address*</span></label>
                                    <input type="email" class="input"  placeholder="Enter your Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div class="inputContainer">
                                    <label class="label" ><img src="images/reload.png"
                                        class="labelIcon" /><span>Password*</span></label>
                                    <input type="password" class="input"  placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                {/* <div class="OptionsContainer">
                           
                            <a href="#" class="ForgotPasswordLink">Forgot Password?</a>
                        </div> */}
                                <button class="buttologin" onClick={collectData}>
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
