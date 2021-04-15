import { authService, firebaseInstance } from 'fbase';
import React, {useState} from 'react';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (e) => {
        const {target: {name, value},} = e;
        if(name === 'email') {
            setEmail(value);
        } else if (name === password) {
            setPassword(value);
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        let data;
        try{
        if (newAccount) {
            data = await authService.createUserWithEmailAndPassword(email, password);
        } else {
            data = await authService.signInWithEmailAndPassword(email, password);
        }   
        console.log(data);         
        } catch (error) {
            setError(error.message);
        }
    };

    const onSocialClick = async (e) => {
        const {target: {name}} = e;
        let provider;
        if(name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);
        };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    return (
         <div>
             <form onSubmit={onSubmit}>
             <input onChange={onChange} name="email" type='text' placeholder="Email" required value={email}/>
             <input onChange={onChange} name="password" type='password' placeholder="Password" required value={password}/>
             <input type='submit' value={newAccount ? "Create Account" : "Log In"}/>
             {error}
             </form>
             <span onClick={toggleAccount}>{newAccount ? "Log In" : "Create Account"}</span>
             <div>
                 <button onClick={onSocialClick} name="google">Continue with Google</button>
                 <button onClick={onSocialClick} name="github">Continue with Github</button>        
             </div>
         </div>
    );
}
export default Auth;