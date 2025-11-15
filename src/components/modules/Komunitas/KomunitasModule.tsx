import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  MessageSquare,
  Send, 
  Star,
  Calendar,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { API } from "@/lib/api";
import { services } from "@/lib/services";
import { toast } from "sonner"
import { Message } from "@/lib/types/Message";
import { AxiosError } from "axios";
import { ChannelProvider } from 'ably/react';
import { ConnectionState } from "../Ably/ConnectionState";
import MessageList from "./MessageList";


const KomunitasModule = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Mock data for community members and messages
  const communityStats = [
    { label: "Anggota Aktif", value: "156", icon: Users },
    { label: "Diskusi Bulan Ini", value: "23", icon: MessageSquare },
    { label: "Event Terlaksana", value: "8", icon: Calendar },
    { label: "Rating Komunitas", value: "4.9", icon: Star },
  ];

  const fetchMessages = async () => {
    setIsLoading(true);
    const { url, method } = services.komunitas.getMessage("0");

    await API({
      url,
      method,
    }).then((res) => {
      const { data: data } = res.data;
      setMessages(data);
    }).catch((err) => {
      if(err instanceof AxiosError){
        toast.error(err.response?.data.message || "Gagal memuat pesan.");
      }
      console.error(err);
    }).finally(() => {
      setIsLoading(false);
    });
  };


  const handleSendMessage = async () => {
    setIsLoading(true);
    if (newMessage.trim()) {
      const { url, method } = services.komunitas.sendMessage();
      await API({
        url,
        method,
        data: {content: newMessage}
      }).then((res) => {
        console.log(res.data)
        const {data: data} = res;
        toast.success("Pesan terkirim");
        setMessages([
          ...messages,
          data
        ]);
        setNewMessage("");
      }).catch((err) => {
        if(err instanceof AxiosError){
          toast.error(err.response?.data.message || "Gagal mengirim pesan.");
        }
        console.error(err);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  };
  

  useEffect(() => {
    fetchMessages();
  }, []);


  return (
    <ChannelProvider channelName='ppks-public-chat'>
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
                    <ConnectionState />

                  </div>
                </CardHeader>
                
                {/* Messages Area */}
                <div className="pb-10 h-full">
                <CardContent className="flex-1 flex flex-col h-full bg-white rounded-lg shadow">
                 <MessageList messages={messages} setMessages={setMessages}/>

                  <div className="border-t pt-4">
                  {user ? (
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
                        disabled={isLoading}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  ): (null)}
                
              
                  </div>
                </CardContent>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Join Community Card */}
              {/* <Card className="shadow-card">
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
              </Card> */}

              {/* Upcoming Events */}
              {/* <Card className="shadow-card">
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
              </Card> */}

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
    </ChannelProvider>
  );
};

export default KomunitasModule;