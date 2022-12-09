import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Spinner from "./Components/Spinner";
import FetchContextProvider from "./Context/FetchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FetchContextProvider>
    <Suspense
      fallback={
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      }
    >
      <App />
    </Suspense>
  </FetchContextProvider>
);
