import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import EdukasiModule from "@/components/modules/EdukasiModule";
import AlurModule from "@/components/modules/AlurModule";
import KomunitasModule from "@/components/modules/KomunitasModule";
import InformasiModule from "@/components/modules/InformasiModule";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "edukasi":
        return <EdukasiModule />;
      case "alur":
        return <AlurModule />;
      case "komunitas":
        return <KomunitasModule />;
      case "informasi":
        return <InformasiModule />;
      default:
        return <Hero setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        {renderActiveSection()}
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
