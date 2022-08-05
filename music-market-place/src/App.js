import React from "react";
import { Route, Routes } from "react-router-dom";
import TopNav from "./components/TopNav/TopNav";
import { UserProvider } from "./context/UserContext";
import MainPage from "./pages/MainPage/MainPage";
import MinterPage from "./pages/MinterPage/MinterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  return (
   <UserProvider>
     <div>
      <TopNav />
      <Routes>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/minter" element={<MinterPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
    </div>
   </UserProvider>
  );
}

export default App;
