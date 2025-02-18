import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Components
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/login" 
                element={<AuthGuard><Login /></AuthGuard>} 
              />
              <Route 
                path="/register" 
                element={<AuthGuard><Register /></AuthGuard>} 
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};

const AuthGuard = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default App;
