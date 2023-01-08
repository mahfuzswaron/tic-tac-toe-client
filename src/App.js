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
import { useEffect, useState } from "react";
// import ThemeSwitcher from "./app/components/ThemeSwitcher";
const clickSound = new Audio("/buttonClick.wav");

function App() {
  const [signOut, signOutLoading] = useSignOut(auth);
  const [sound, setSound] = useState(true);
  useEffect(() => {
    setSound(localStorage.getItem("sound") === "true");
  }, [])

  if (signOutLoading) return <Loader message={"Logging out..."} />

  return (
    <div className="max-w-sm min-h-screen grid grid-cols-1 mx-auto p-4 rounded-lg bg-white dark:bg-semiBlack dark:text-gray" >
      <Routes>
        <Route path="/" element={<AuthWall>
          <Home sound={sound} clickSound={clickSound} />
        </AuthWall>} />
        <Route path="/home" element={<AuthWall>
          <Home sound={sound} clickSound={clickSound} />
        </AuthWall>} />
        <Route path="/entry" element={<Entry sound={sound} clickSound={clickSound} />} />

        <Route path="/login" element={<Login sound={sound} clickSound={clickSound} />} />
        <Route path="/register" element={<Register clickSound={clickSound} />} />
        <Route path="/new-game" element={<AuthWall>
          <NewGame sound={sound} clickSound={clickSound} />
        </AuthWall>} />
        <Route path="/play-ground/:id" element={<AuthWall>
          <PlayGround sound={sound} clickSound={clickSound} setSound={setSound} />
        </AuthWall>} />

        <Route path="*" element={<NotFound sound={sound} clickSound={clickSound} />} />
      </Routes>

      <button className="mt-10" onClick={async () => {
        const sure = window.confirm("Are you sure to log out?");
        if (sure) {
          const success = await signOut();
          if (success) {
            alert('You are sign out');
          }
        }
      }} > log-out</button>
      {/* <ThemeSwitcher /> */}
    </div>
  );
}

export default App;
