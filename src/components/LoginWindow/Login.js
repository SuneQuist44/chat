import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../Firebase';

export default function Login() {

    const history = useHistory();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    function validate(e) {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
            .then(doc => history.push('/'))
            .catch(error => console.log('Error: ', error))
    }

    return (
        <form onSubmit={validate}>
            <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign In</button>
        </form>
    )
}
