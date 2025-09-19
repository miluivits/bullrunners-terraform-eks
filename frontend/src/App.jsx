import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import SignIn from "./components/Sign-in-up/SignIn";
import SignUp from "./components/Sign-in-up/SignUp";
import MyProfile from "./components/Navbar/MyProfile";
import ChosenToken from "./components/TokenInfo/ChosenToken";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />   
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/token/:id" element={<ChosenToken />} />
        <Route path="*" element={<Main />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
