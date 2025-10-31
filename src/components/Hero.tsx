import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Phone, MessageCircle } from "lucide-react";

interface HeroProps {
  setActiveSection?: (section: string) => void;
}

const Hero = ({ setActiveSection }: HeroProps) => {
  return (
    <section className="gradient-hero py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Shield Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 shadow-elevated">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-gradient">Satuan Tugas Pencegahan</span>
            <br />
            <span className="text-primary">& Penanganan Kekerasan</span>
            <br />
            <span className="text-foreground">Universitas Siliwangi</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Bersama menciptakan lingkungan kampus yang aman, nyaman, dan bebas dari segala bentuk kekerasan 
            untuk seluruh civitas akademika Universitas Siliwangi.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              onClick={() => setActiveSection("edukasi")}
              className="transition-smooth shadow-card hover:shadow-elevated"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Mulai Edukasi
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setActiveSection("informasi")}
              className="transition-smooth"
            >
              <Phone className="w-5 h-5 mr-2" />
              Hotline Pengaduan
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-card p-6 rounded-xl shadow-card transition-smooth hover:shadow-elevated">
              <div className="text-2xl font-bold text-primary mb-2">10</div>
              <div className="text-sm text-muted-foreground">Tingkat Edukasi</div>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-card transition-smooth hover:shadow-elevated">
              <div className="text-2xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Layanan Hotline</div>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-card transition-smooth hover:shadow-elevated">
              <div className="text-2xl font-bold text-primary mb-2">Aman</div>
              <div className="text-sm text-muted-foreground">Pelaporan Terjamin</div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mt-12 p-6 bg-primary/5 rounded-xl border border-primary/20">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-primary">
                <MessageCircle className="w-5 h-5" />
                <span className="font-semibold">Butuh Bantuan Segera?</span>
              </div>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => setActiveSection("informasi")}
              >
                Hubungi Hotline
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;