import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateChallenge from "./pages/Challenge";
import MainHeader from "./components/MainHeader";
import ViewChallenge from "./pages/ViewChallenge";

function App() {
  
  
  return (
    <>
      <MainHeader />
      <Routes>
        <Route index element={<Home />} />  // index path is the default page loaded when we load our web page
        <Route path="/create" element={<CreateChallenge />} />
        <Route path="/view/:id" element={<ViewChallenge />} />
      </Routes>
    </>
  );
}

export default App;
