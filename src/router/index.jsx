import { createBrowserRouter } from "react-router-dom";
import App from "../components/App.jsx";
import Notice from "../components/Notice.jsx";
import Contact from "../components/Contact.jsx";
import Apropos from "../components/Apropos.jsx";
import Video from "../components/Video.jsx";

export default createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/playing",
    element: <Video/>,
  },
  {
    path: "/notice",
    element: <Notice/>,
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