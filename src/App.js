import Entry from "./app/pages/Entry";
import Login from "./app/pages/Login";
import Registar from "./app/pages/Registar";
import Home from "./app/pages/Home";
import NewGame from "./app/pages/NewGame";
import PlayGround from "./app/pages/PlayGround";

function App() {
  return (
    <div className="max-w-sm min-h-screen grid grid-cols-1 mx-auto p-4 border rounded-lg bg-white" >
      {/* <Entry /> */}
      {/* <Login /> */}
      {/* <Registar /> */}
      {/* <Home /> */}
      {/* <NewGame /> */}
      <PlayGround />

    </div>
  );
}

export default App;
