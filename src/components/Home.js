import React, { useState, useEffect } from 'react';
import { auth, db } from './Firebase';

export default function Home() {

    const [user, setUser] = useState();
    const [logoutDisplay, setLogoutDisplay] = useState()
    const [loginDisplay, setLoginDisplay] = useState()

    const [post, setPost] = useState();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) { setLoginDisplay("none"); getAccount(user.uid); getPosts() }
            else { setLogoutDisplay("none") }
        })
    }, []);

    function logout() { auth.signOut(); };

    function getAccount(user) {
        db.collection('accounts').doc(user).get()
            .then(doc => setUser(doc.data()))
    }

    function messagePost(e) {
        e.preventDefault()
        const userId = auth.currentUser.uid;
        db.collection('posts').add({
            createdAt: new Date(),
            post: post,
            user: {
                username: user.accData.username,
                profilePic: user.profilePic
            },
            userId: userId
        })
    }

    function getPosts() {
        db.collection('posts').orderBy('createdAt', 'desc').get()
            .then(doc => setPosts(doc.docs.map(doc => doc.data())))
    }

    return (
        <>
            <ul>
                <li><a href="/login" style={{ display: loginDisplay }}>Login</a></li>
                <li><a href="/register" style={{ display: loginDisplay }}>Register</a></li>
                <li><a href="/" onClick={logout} style={{ display: logoutDisplay }}> Logout</a></li>
            </ul>
            <form onSubmit={messagePost}>
                <input type="text" placeholder="message" onChange={(e) => setPost(e.target.value)} />
                <button type="submit" onClick={getPosts}>Post</button>
            </form>
            <div>
                {posts.map((data, id) => (
                    <ul key={id}>
                        <li>{data.post}</li>
                    </ul>
                ))}
            </div>
        </>
    )
}
