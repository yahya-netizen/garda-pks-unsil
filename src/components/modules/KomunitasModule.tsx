import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  MessageSquare, 
  UserPlus, 
  Send, 
  Shield, 
  Heart,
  Star,
  Calendar,
  Globe,
  Lock
} from "lucide-react";

const KomunitasModule = () => {
  const [newMessage, setNewMessage] = useState("");
  const [showRegistration, setShowRegistration] = useState(false);

  // Mock data for community members and messages
  const communityStats = [
    { label: "Anggota Aktif", value: "156", icon: Users },
    { label: "Diskusi Bulan Ini", value: "23", icon: MessageSquare },
    { label: "Event Terlaksana", value: "8", icon: Calendar },
    { label: "Rating Komunitas", value: "4.9", icon: Star },
  ];

  const mockMessages = [
    {
      id: 1,
      user: "Sarah K.",
      time: "10 menit lalu",
      message: "Bagaimana cara kita bisa lebih proaktif dalam mencegah kekerasan di lingkungan kampus?",
      isAnonymous: false,
      replies: 3
    },
    {
      id: 2,
      user: "Anonymous",
      time: "25 menit lalu",
      message: "Terima kasih untuk webinar kemarin tentang 'Membangun Lingkungan Kampus yang Aman'. Sangat informatif!",
      isAnonymous: true,
      replies: 7
    },
    {
      id: 3,
      user: "Ahmad R.",
      time: "1 jam lalu",
      message: "Apakah ada rencana untuk workshop peer counseling? Saya tertarik untuk bergabung sebagai volunteer.",
      isAnonymous: false,
      replies: 12
    }
  ];

  const upcomingEvents = [
    {
      title: "Workshop Komunikasi Efektif",
      date: "15 Oktober 2024",
      time: "14:00 WIB",
      participants: 45,
      status: "Buka"
    },
    {
      title: "Diskusi Panel: Budaya Kampus Inklusif",
      date: "22 Oktober 2024", 
      time: "16:00 WIB",
      participants: 23,
      status: "Buka"
    },
    {
      title: "Pelatihan Peer Support",
      date: "29 Oktober 2024",
      time: "13:00 WIB",
      participants: 30,
      status: "Penuh"
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Placeholder for sending message functionality
      alert("Fitur chat realtime memerlukan integrasi backend untuk menyimpan dan menampilkan pesan secara langsung.");
      setNewMessage("");
    }
  };

  const handleJoinCommunity = () => {
    alert("Fitur registrasi komunitas memerlukan integrasi backend untuk menyimpan data anggota dan autentikasi.");
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Komunitas</span> Anti Kekerasan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Bergabunglah dengan komunitas yang peduli menciptakan lingkungan kampus yang aman. 
            Berbagi pengalaman, diskusi, dan saling mendukung dalam misi pencegahan kekerasan.
          </p>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {communityStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-card p-4 rounded-xl shadow-card">
                  <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-card h-[600px] flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      Forum Diskusi Komunitas
                    </CardTitle>
                    <CardDescription>Berbagi dan berdiskusi dengan anggota komunitas</CardDescription>
                  </div>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    156 Online
                  </Badge>
                </div>
              </CardHeader>
              
              {/* Messages Area */}
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
                  {mockMessages.map((message) => (
                    <div key={message.id} className="border-l-4 border-primary/20 pl-4 py-2">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {message.isAnonymous ? (
                            <Lock className="w-3 h-3 text-muted-foreground" />
                          ) : null}
                          <span className="font-medium text-sm">{message.user}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                        <Badge variant="outline" className="text-xs">
                          {message.replies} balasan
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{message.message}</p>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Balas
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="border-t pt-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Bagikan pemikiran atau pertanyaan Anda..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 min-h-[80px]"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="self-end"
                      disabled={!newMessage.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    💡 Anda dapat mengirim pesan secara anonim dengan mencentang opsi "Mode Anonim"
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Join Community Card */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <UserPlus className="w-5 h-5 text-primary" />
                  Bergabung dengan Komunitas
                </CardTitle>
                <CardDescription>
                  Daftar menjadi bagian dari gerakan anti-kekerasan di kampus
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Lingkungan aman & terpercaya</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>Dukungan emosional dari sesama</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Event & workshop eksklusif</span>
                  </div>
                </div>
                <Button 
                  className="w-full transition-smooth"
                  onClick={handleJoinCommunity}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Daftar Sekarang
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                  Event Mendatang
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="border rounded-lg p-3 space-y-2">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{event.date}</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={event.status === "Buka" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {event.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {event.participants} peserta
                      </span>
                    </div>
                    {event.status === "Buka" && (
                      <Button size="sm" variant="outline" className="w-full text-xs">
                        Daftar Event
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Pedoman Komunitas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>✅ Hormati semua anggota komunitas</p>
                <p>✅ Jaga kerahasiaan informasi pribadi</p>
                <p>✅ Gunakan bahasa yang sopan dan konstruktif</p>
                <p>❌ Dilarang melakukan harassment</p>
                <p>❌ Tidak menyebarkan informasi palsu</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KomunitasModule;