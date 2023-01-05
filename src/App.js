import Entry from "./app/pages/Entry";
import Login from "./app/pages/Login";
import Register from "./app/pages/Register";
import Home from "./app/pages/Home";
import NewGame from "./app/pages/NewGame";
import PlayGround from "./app/pages/PlayGround";
import { Routes, Route } from "react-router-dom";
import NotFound from "./app/pages/NotFound";
import auth from "./firebase.init";
import AuthWall from "./app/pages/AuthWall";
import { useSignOut } from 'react-firebase-hooks/auth';
import Loader from "./app/components/Loader/Loader";

function App() {
  const [signOut, signOutLoading] = useSignOut(auth);

  if (signOutLoading) return <Loader message={"Logging out..."} />

  return (
    <div className="max-w-sm min-h-screen grid grid-cols-1 mx-auto p-4 border rounded-lg bg-white" >
      <Routes>
        <Route path="/" element={<AuthWall>
          <Home />
        </AuthWall>} />
        <Route path="/home" element={<AuthWall>
          <Home />
        </AuthWall>} />
        <Route path="/entry" element={<Entry />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-game" element={<AuthWall>
          <NewGame />
        </AuthWall>} />
        <Route path="/play-ground/:id" element={<AuthWall>
          <PlayGround />
        </AuthWall>} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <button className="mt-10" onClick={async () => {
        const success = await signOut();
        if (success) {
          alert('You are sign out');
        }
      }} > log-out</button>
    </div>
  );
}

export default App;
