import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router";
import Hero from "@/components/Hero";
import EdukasiModule from "@/components/modules/EdukasiModule";
import AlurModule from "@/components/modules/AlurModule";
import KomunitasModule from "@/components/modules/KomunitasModule";
import InformasiModule from "@/components/modules/InformasiModule";
import NotFound from "./pages/NotFound";
import LivechatModule from "./components/modules/LivechatModule";
import RegisterModule from "./components/modules/RegisterModule";
import LoginModule from "./components/modules/LoginModule";
import BeritaModule from "./components/modules/BeritaModule";
import { Protected } from "./Protected";
import DetailBeritaModule from "./components/modules/DetailBeritaModule";
import ProfileModule from "./components/modules/ProfileModule";

const App = () => (
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" richColors={true}/>
        <Routes>
          <Route path="/" element={ <Hero  />} />
          <Route path="/login" element={<LoginModule />} />
          <Route path="/register" element={<RegisterModule />} />
          <Route path="/alur" element={<AlurModule />} />
          <Route path="/informasi" element={<InformasiModule />} />
          <Route path="/berita" element={<BeritaModule />} />
          <Route path="/berita/:slug" element={<DetailBeritaModule />} />
          <Route path="/komunitas" element={<Protected><KomunitasModule /></Protected>} />
          <Route path="/edukasi" element={<Protected><EdukasiModule /></Protected>} />
          <Route path="/live-chat" element={<Protected><LivechatModule /></Protected>} />
          <Route path="/profile" element={<Protected><ProfileModule /></Protected>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </TooltipProvider>  
);

export default App;
