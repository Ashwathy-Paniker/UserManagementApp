import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Viewusers from "./Components/Users/Viewusers";

const Addusers = lazy(() => import("./Components/Users/Addusers"));
const Topbar = lazy(() => import("./Components/Navbar/Topbar"));
const Footer = lazy(() => import("./Components/Footer/footer"));
function App() {
  return (
    <div>
      <Suspense 
        fallback={
          <div  className="App">
            <br />
            <img src="./images/loading.gif" alt="Loading..." />
            <h1>Please wait ...</h1>
          </div>
        }
      >
        <Topbar />
        <Router>
          <Routes>
            <Route path="/add" element={<Addusers />} />
            <Route path="/" element={<Viewusers />} />
            <Route path="*" element={<img width="100%" height="657px" src="./images/notfound1.gif" alt="not found"/>}/>
          </Routes>
        </Router>
      </Suspense>

      <Footer />
    </div>
  );
}

export default App;

/*
Library required:
- npm install react-router-dom@6
- npm install react-bootstrap bootstrap
- npm install react-icons --save
- 
-
-
*/
