import { useLocation, NavLink } from "react-router";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen gradient-hero">
      {/* Navigation placeholder for consistency */}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center max-w-2xl mx-auto">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-8">
            <ShieldAlert className="w-12 h-12 text-primary" />
          </div>

          {/* 404 Number */}
          <h1 className="text-8xl md:text-9xl font-black text-gradient mb-4">
            404
          </h1>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Halaman Tidak Ditemukan
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            Maaf, halaman yang Anda cari tidak tersedia atau mungkin telah
            dipindahkan ke alamat lain.
          </p>

          {/* Path Info */}
          <div className="bg-card p-4 rounded-xl shadow-card mb-8 inline-block">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Search className="w-4 h-4" />
              <span>Halaman yang dicari:</span>
              <code className="px-2 py-1 bg-primary/10 rounded text-primary font-mono">
                {location.pathname}
              </code>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NavLink to="/">
              <Button
                size="lg"
                className="transition-smooth shadow-card hover:shadow-elevated"
              >
                <Home className="w-5 h-5 mr-2" />
                Kembali ke Beranda
              </Button>
            </NavLink>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
              className="transition-smooth"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Halaman Sebelumnya
            </Button>
          </div>

          {/* Help Section */}
          <div className="mt-12 p-6 bg-primary/5 rounded-xl border border-primary/20">
            <p className="text-muted-foreground mb-2">
              Butuh bantuan? Hubungi kami melalui:
            </p>
            <NavLink to="/informasi">
              <Button variant="link" className="text-primary">
                Halaman Informasi & Kontak
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
