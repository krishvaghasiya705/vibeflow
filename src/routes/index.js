import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./defaultLayout";
import Home from "../module/home";
import Artistsongdetailedpage from "../module/artistsongdetailed";
import Songdetailedpage from "../module/songdetailed";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/artisdetailedpage",
                element: <Artistsongdetailedpage />
            },
            {
                path: "/songdetailedpage",
                element: <Songdetailedpage />
            },
        ]
    }
])

export default router