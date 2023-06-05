import React, { useState,useEffect } from 'react'
import './signup.css';
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    })

    const handleLogin = async () => {
        // console.log( email, password);

        let result = await fetch('https://owngpt-api.vercel.app/login', {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            },
        });
        result = await result.json();
        localStorage.setItem("user",JSON.stringify(result));
        // console.log(result)
        navigate('/')
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
                            <header class="header" style={{ color: "white" }}>Login</header>

                            <div>
                                <div class="inputContainer">
                                    <label class="label" ><img src="images/email (1).png"
                                        class="labelIcon" /><span>Email
                                            Address*</span></label>
                                    <input type="email" class="input" placeholder="Enter your Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div class="inputContainer">
                                    <label class="label" ><img src="images/reload.png"
                                        class="labelIcon" /><span>Password*</span></label>
                                    <input type="password" class="input" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div class="OptionsContainer">

                                    <Link href="#" class="ForgotPasswordLink">Forgot Password?</Link>
                                </div>
                                <button class="buttologin" onClick={handleLogin}>
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
