import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { UserProvider } from "./context/UserContext"; // <-- fontos
import TokenDetails from "./pages/TokenInfo/TokenDetails/TokenDetails";


function App() {
  return (
    <UserProvider>  {/* 👈 itt körbetekerjük az egész appot */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tokendetails/:tokenId" element={<TokenDetails />} />
          <Route path="*" element={<Main />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
