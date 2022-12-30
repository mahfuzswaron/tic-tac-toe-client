import Entry from "./app/pages/Entry";
import Login from "./app/pages/Login";
import Register from "./app/pages/Register";
import Home from "./app/pages/Home";
import NewGame from "./app/pages/NewGame";
import PlayGround from "./app/pages/PlayGround";
import { Routes, Route } from "react-router-dom";
import NotFound from "./app/pages/NotFound";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./firebase.init";
import { useEffect, useState } from "react";

function App() {
  const [user, loading] = useAuthState(auth);
  const [mongoUser, setMongoUser] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/userinfo?email=${user?.email}`).then(res => res.json()).then(data => setMongoUser(data.user))
  }, [user, loading]);

  if (loading || !mongoUser) {
    // console.log()
    return <p>loading...</p>
  }


  return (
    <div className="max-w-sm min-h-screen grid grid-cols-1 mx-auto p-4 border rounded-lg bg-white" >
      <Routes>
        <Route path="/" element={<Home user={mongoUser} />} />
        <Route path="/home" element={<Home user={mongoUser} />} />
        <Route path="/entry" element={<Entry user={mongoUser} />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-game" element={<NewGame user={mongoUser} />} />
        <Route path="/play-ground/:id" element={<PlayGround user={mongoUser} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
