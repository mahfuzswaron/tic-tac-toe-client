import Entry from "./app/pages/Entry";
import Login from "./app/pages/Login";
import Register from "./app/pages/Register";
import Home from "./app/pages/Home";
import NewGame from "./app/pages/NewGame";
import PlayGround from "./app/pages/PlayGround";
import { Routes, Route } from "react-router-dom";
import NotFound from "./app/pages/NotFound";

function App() {
  return (
    <div className="max-w-sm min-h-screen grid grid-cols-1 mx-auto p-4 border rounded-lg bg-white" >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/entry" element={<Entry />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-game" element={<NewGame />} />
        <Route path="/play-ground/:id" element={<PlayGround />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
