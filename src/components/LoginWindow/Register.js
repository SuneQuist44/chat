import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../Firebase';

export default function Register() {

    const history = useHistory();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    function validate(e) {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password)
            .then(doc => {
                db.collection('accounts').doc(doc.user.uid).set({
                    createdAt: new Date(),
                    profilePic: 'https://api.adorable.io/avatars/285/abott@adorable.png',
                    accData: {
                        username: username,
                        email: email,
                        password: password
                    }
                })
                    .then(doc => history.push('/login'))
            })
    }

    return (
        <form onSubmit={validate}>
            <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign Up</button>
        </form>
    )
}
