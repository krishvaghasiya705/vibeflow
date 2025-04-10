import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./defaultLayout";
import Home from "../module/home";
import Artistsongdetailedpage from "../module/artistsongdetailed";
import Songdetailedpage from "../module/songdetailed";
import SearchResults from "../component/searchresults";

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
                path: "/search",
                element: <SearchResults />
            },
            {
                path: "/artisdetailedpage/:id",
                element: <Artistsongdetailedpage />
            },
            {
                path: "/songdetailedpage/:id",
                element: <Songdetailedpage />
            }
        ]
    }
])

export default router