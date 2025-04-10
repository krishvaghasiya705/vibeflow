import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { AudioPlayerProvider } from "./context/AudioPlayerContext";
import "./styles/global.scss"

function App() {
  return (
    <AudioPlayerProvider>
      <RouterProvider router={router} />
    </AudioPlayerProvider>
  );
}

export default App;
