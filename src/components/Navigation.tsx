import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Building2, BookOpen, Users, Info, ArrowRight } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation = ({ activeSection, setActiveSection }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "edukasi", label: "Edukasi", icon: BookOpen },
    { id: "alur", label: "Alur Penanganan", icon: ArrowRight },
    { id: "komunitas", label: "Komunitas", icon: Users },
    { id: "informasi", label: "Informasi", icon: Info },
  ];

  return (
    <nav className="bg-card shadow-card sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <img src={"satgas.png"} alt="" />
            </div>
            <div className="hidden lg:block">
              <h1 className="text-lg font-bold text-primary">
                Satgas Pencegahan & Penanganan Kekerasan
              </h1>
              <p className="text-sm text-muted-foreground">Universitas Siliwangi</p>
            </div>
            <div className="lg:hidden">
              <h1 className="text-base font-bold text-primary">Satgas PPKS</h1>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveSection(item.id)}
                  className="transition-smooth"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start transition-smooth"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;