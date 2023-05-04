import React from 'react';
import '../Login.css';

function Login(){
  return (
<div class="LoginPageContainer">
    <div class="LoginPageInnerContainer">
        <div class="ImageContianer">
            <img src="https://i.imgur.com/MYZd7of.png" class="GroupImage" alt='img'/>
        </div>
        <div class="LoginFormContainer">
            <div class="LoginFormInnerContainer">
                <header class="header">Log in</header>
                <form>
                    <div class="inputContainer">
                        <label class="label" for="username"><img src="https://i.imgur.com/Hn13wvm.png" class="labelIcon" alt='username' /><span>Username</span></label>
                        <input type="email" class="input" id="Username" placeholder="Enter your Username" />
                    </div>
                    <div class="inputContainer">
                        <label class="label" for="emailAddress"><img src="https://i.imgur.com/g5SvdfG.png" class="labelIcon" alt='password'/><span>Password</span></label>
                        <input type="password" class="input" id="Password" placeholder="Enter your Password" />
                    </div>

                    <button class="LoginButton" type='submit'>Login</button>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default Login