import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router";
import Hero from "@/components/Hero";
import EdukasiModule from "@/components/modules/Kuis/EdukasiModule";
import AlurModule from "@/components/modules/Alur/AlurModule";
import KomunitasModule from "@/components/modules/Komunitas/KomunitasModule";
import InformasiModule from "@/components/modules/Informasi/InformasiModule";
import NotFound from "./pages/NotFound";
import LivechatModule from "./components/modules/Komunitas/LivechatModule";
import RegisterModule from "./components/modules/Auth/RegisterModule";
import LoginModule from "./components/modules/Auth/LoginModule";
import BeritaModule from "./components/modules/Berita/BeritaModule";
import { Protected } from "./Protected";
import DetailBeritaModule from "./components/modules/Berita/DetailBeritaModule";
import ProfileModule from "./components/modules/Auth/ProfileModule";
import SoalKuis from "./components/modules/Kuis/SoalKuis";
import ResultKuisModule from "./components/modules/Kuis/ResultKuisModule";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner position="top-center" richColors={true} />
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/login" element={<LoginModule />} />
      <Route path="/register" element={<RegisterModule />} />
      <Route path="/alur" element={<AlurModule />} />
      <Route path="/informasi" element={<InformasiModule />} />
      <Route path="/berita" element={<BeritaModule />} />
      <Route path="/berita/:slug" element={<DetailBeritaModule />} />
      <Route path="/komunitas" element={<KomunitasModule />} />
      <Route
        path="/edukasi"
        element={
          <Protected>
            <EdukasiModule />
          </Protected>
        }
      />
      <Route
        path="/live-chat"
        element={
          <Protected>
            <LivechatModule />
          </Protected>
        }
      />
      <Route
        path="/profile"
        element={
          <Protected>
            <ProfileModule />
          </Protected>
        }
      />
      <Route
        path="/edukasi/kuis/:kuisId"
        element={
          <Protected>
            <SoalKuis />
          </Protected>
        }
      />
      <Route
        path="/edukasi/kuis-result/:kuisId"
        element={
          <Protected>
            <ResultKuisModule />
          </Protected>
        }
      />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </TooltipProvider>
);

export default App;
