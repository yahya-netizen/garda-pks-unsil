import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes } from "react-router";
import Navigation from "./components/Navigation.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { AblyProvider } from "ably/react";
import * as Ably from "ably";

const realtimeClient = new Ably.Realtime({
  key: "jtlb0A.LAsGkg:jSKEE3APCsqOI1AOFyt47ywZ0lmTdcPZuzjPF6A5Z3A",
  // clientId: "ppks-client"
});

createRoot(document.getElementById("root")!).render(
  <AblyProvider client={realtimeClient}>
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <App />
      </BrowserRouter>
    </AuthProvider>
  </AblyProvider>
);
