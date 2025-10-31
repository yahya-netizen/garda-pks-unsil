import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import EdukasiModule from "@/components/modules/EdukasiModule";
import AlurModule from "@/components/modules/AlurModule";
import KomunitasModule from "@/components/modules/KomunitasModule";
import InformasiModule from "@/components/modules/InformasiModule";
import NotFound from "./pages/NotFound";
import LivechatModule from "./components/modules/LivechatModule";
import RegisterModule from "./components/modules/RegisterModule";
import LoginModule from "./components/modules/LoginModule";

const App = () => (
    <TooltipProvider>
      <Toaster />
      <Sonner />
        <Routes>
          <Route path="/" element={ <Hero  />} />
          <Route path="/edukasi" element={<EdukasiModule />} />
          <Route path="/alur" element={<AlurModule />} />
          <Route path="/komunitas" element={<KomunitasModule />} />
          <Route path="/informasi" element={<InformasiModule />} />
          <Route path="/live-chat" element={<LivechatModule />} />
          <Route path="/login" element={<LoginModule />} />
          <Route path="/register" element={<RegisterModule />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </TooltipProvider>
);

export default App;
