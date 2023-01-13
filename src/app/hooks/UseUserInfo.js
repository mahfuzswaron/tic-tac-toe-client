import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const UseUserInfo = () => {
    const [firebaseUser, firebaseLoading] = useAuthState(auth);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const url = `https://tic-tac-toe-server-tqsm.onrender.com/userinfo?email=${firebaseUser?.email}`;
        setLoading(true)
        fetch(url).then(res => res.json()).then(data => {
            setUser(data.user)
            return setLoading(false)
        })
    }, [firebaseUser]);

    return [user, loading, firebaseLoading]
}

export default UseUserInfo;