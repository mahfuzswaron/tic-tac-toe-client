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
import Modal from "./app/components/Modal";
import 'animate.css';
import CheckOnline from "./app/components/CheckOnline";
const clickSound = new Audio("/buttonClick.wav");

function App() {
  const [loggedIn, setLoggedIn] = useState(auth?.currentUser?.uid)
  const [signOut, signOutLoading] = useSignOut(auth);
  const [sound, setSound] = useState(true);
  const [openModal, setOpenModal] = useState(true)
  const [modal, setModal] = useState({});
  useEffect(() => {
    setSound(localStorage.getItem("sound") === "true");
    const root = window.document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(localStorage.theme);
  }, [])
  if (signOutLoading) return <Loader message={"Logging out..."} />

  return (
    <div className=" w-screen md:max-w-sm min-h-screen grid grid-cols-1 mx-auto p-4 rounded-lg bg-white dark:bg-semiBlack dark:text-gray">
      <CheckOnline>
        <Routes>
          <Route path="/" element={<AuthWall>
            <Home sound={sound} clickSound={clickSound} />
          </AuthWall>} />
          <Route path="/home" element={<AuthWall>
            <Home sound={sound} clickSound={clickSound} />
          </AuthWall>} />
          <Route path="/entry" element={<Entry sound={sound} clickSound={clickSound} />} />

          <Route path="/login" element={<Login sound={sound} clickSound={clickSound} setLoggedIn={setLoggedIn} />} />
          <Route path="/register" element={<Register clickSound={clickSound} setLoggedIn={setLoggedIn} />} />
          <Route path="/new-game/:user" element={<AuthWall>
            <NewGame sound={sound} clickSound={clickSound} setModal={setModal} setOpenModal={setOpenModal} />
          </AuthWall>} />
          <Route path="/play-ground/:gameParam" element={<AuthWall>
            <PlayGround sound={sound} clickSound={clickSound} setSound={setSound} setModal={setModal} setOpenModal={setOpenModal} />
          </AuthWall>} />

          <Route path="*" element={<NotFound sound={sound} clickSound={clickSound} />} />
        </Routes>

        {
          openModal && modal.message && <Modal modal={modal} />
        }

        <button className={`mt-[10%] h-min max-w-min mx-auto ${loggedIn ? "opacity-100" : "opacity-0"} `} disabled={!loggedIn} onClick={() => {
          setModal({
            message: "Are you sure to log out?",
            buttons: [
              {
                type: "secondary", text: "Yes", onClick: () => {
                  setLoggedIn(false)
                  signOut()
                  setOpenModal(false)
                }
              },
              { type: "primary", text: "No", onClick: () => setOpenModal(false) }
            ]
          })
          setOpenModal(true);
        }} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 mx-auto stroke-darkGray">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
          </svg>
        </button>
      </CheckOnline>
    </div>
  );
}

export default App;
