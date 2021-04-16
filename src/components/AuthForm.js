import React, {useState}  from 'react';
import { authService } from 'fbase';

const AuthForm =()=> {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (e) => {
        const {target: {name, value},} = e;
        if(name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
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
    }
    const toggleAccount = () => setNewAccount((prev) => !prev);
    return (
         <>
            <form className="container" onSubmit={onSubmit}>
             <input className="authInput" onChange={onChange} name="email" type='text' placeholder="Email" required value={email}/>
             <input className="authInput" onChange={onChange} name="password" type='password' placeholder="Password" required value={password}/>
             <input className="authInput authSubmit" type='submit' value={newAccount ? "Create Account" : "Log In"}/>
             {error && <span className="authError">{error}</span>}
             </form>
             <span className="authSwitch" onClick={toggleAccount}>{newAccount ? "Log In" : "Create Account"}</span>
            </>            
    );

};

export default AuthForm;