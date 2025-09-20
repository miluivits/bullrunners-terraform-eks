import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ChosenToken from "./pages/ChosenToken";
import { UserProvider } from "./context/UserContext"; // <-- fontos

function App() {
  return (
    <UserProvider>  {/* 👈 itt körbetekerjük az egész appot */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/token/:id" element={<ChosenToken />} />
          <Route path="*" element={<Main />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
