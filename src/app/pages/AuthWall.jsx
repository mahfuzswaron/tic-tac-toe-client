import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Entry from './Entry';

const AuthWall = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    if (loading) {
        return <p> auth loading...</p>
    }
    else if (!user) {
        // console.log(user)
        return <Entry />

    }
    else {
        // console.log("user :", user)[]
        return children
    }
};

export default AuthWall;