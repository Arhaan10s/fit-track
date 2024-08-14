import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateChallenge from "./pages/Challenge";
import MainHeader from "./components/MainHeader";

function App() {
  
  
  return (
    <>
      <MainHeader />
      <Routes>
        <Route index element={<Home />} />  // index path is the default page loaded when we load our web page
        <Route path="/create" element={<CreateChallenge />} />
      </Routes>
    </>
  );
}

export default App;
