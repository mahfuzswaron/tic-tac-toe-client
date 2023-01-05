import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loader from '../components/Loader/Loader';
import Entry from './Entry';

const AuthWall = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    if (loading) {
        return <Loader message={"Authenticating..."} />
    }
    else if (!user) {
        return <Entry />

    }
    else {
        return children
    }
};

export default AuthWall;