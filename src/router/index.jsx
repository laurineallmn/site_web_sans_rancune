import { createBrowserRouter } from "react-router-dom";
import App from "../components/App.jsx";
import Contact from "../components/Contact.jsx";
import Apropos from "../components/Apropos.jsx";
import Video from "../components/Video.jsx";

export default createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/play",
    element: <Video/>,
  },
  {
    path: "/contact",
    element: <Contact/>,
  },
  {
    path: "/a-propos",
    element: <Apropos/>,
  },
]);