import { createBrowserRouter } from "react-router-dom";
import NotFound from '../pages/NotFound.jsx';
import Home from '../pages/Home.jsx';
import AllReviews from '../pages/AllReviews.jsx';
import MyReviews from '../pages/MyReviews.jsx';
import AddReview from '../pages/AddReview.jsx';
import GameWatchList from '../pages/GameWatchList.jsx';
import Root from '../layout/Root.jsx';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SecureRoutes from "./SecureRoutes";
import PrivateRoute from "./PrivateRoute.jsx"  
import ReviewDetails from "../pages/ReviewDetails.jsx";
import UpdateReview from "../pages/UpdateReview.jsx"
import About from "../pages/About.jsx"

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          loader: () => fetch(`${VITE_BACKEND_URL}top-games`),
          element: <Home />,
        },
        {
          path: "/reviews",
          loader: () => fetch(`${VITE_BACKEND_URL}reviews`),
          element: <AllReviews />,
        },
        {
          path: "/about",
          loader: () => fetch(`${VITE_BACKEND_URL}reviews`),
          element: <About />,
        },
        {
          path: "/review/:id",
          loader: ({ params }) => fetch(`${VITE_BACKEND_URL}review/${params.id}`),
          element: <ReviewDetails />,
          
        },
        {
          path: "/my-reviews",
          element: <PrivateRoute><MyReviews /></PrivateRoute>,
        },
        {
          path: "/add-review",
          element: <PrivateRoute><AddReview /></PrivateRoute>,
        },
        {
          path: "/game-watchList",
          element: <PrivateRoute><GameWatchList /></PrivateRoute>,
        },
        {
          path: "/update-review/:id",
          loader: ({ params }) => fetch(`${VITE_BACKEND_URL}review/${params.id}`),
          element: <PrivateRoute><UpdateReview /></PrivateRoute>
        },
        {
          path: "/login",
          element: <SecureRoutes><Login /></SecureRoutes>,
        },
        {
          path: "/register",
          element: <SecureRoutes><Register /></SecureRoutes>,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

export default router;
