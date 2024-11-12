import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider, createMemoryRouter } from "react-router-dom";
import FileSystemView from "./views/FileSystemView";

const router = createMemoryRouter([
  {
    path: "/",
    element: <FileSystemView />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
