import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Users, 
  Calendar,
  ExternalLink,
  Shield,
  MessageCircle,
  Globe,
  Download,
  Award,
  AlertTriangle
} from "lucide-react";

const InformasiModule = () => {
  const hotlineInfo = [
    {
      type: "Hotline Darurat",
      number: "0823-1020-2930",
      availability: "24/7",
      description: "Untuk laporan kasus darurat dan konsultasi mendesak"
    },
    {
      type: "Whatsapp Konseling",
      number: "0823-1020-2930", 
      availability: "Senin-Jumat 08:00-20:00",
      description: "Konseling psikologis dan dukungan emosional",
      href: "https://wa.me//+6282310202930"
    },
    {
      type: "Email Resmi",
      contact: "satgasppkpt@unsil.ac.id",
      availability: "Direspon dalam 24 jam",
      description: "Untuk pertanyaan resmi dan konsultasi tertulis",
      href: "mailto:satgasppkpt@unsil.ac.id"
    }
  ];

  const jalurPengaduan = [
    {
      channel: "Portal Online",
      description: "Laporan melalui website resmi dengan sistem enkripsi",
      features: ["Anonim", "Secure", "24/7"],
      icon: Globe
    },
    {
      channel: "Hotline Telepon", 
      description: "Laporan langsung melalui telepon dengan konselor terlatih",
      features: ["Real-time", "Confidential", "Emergency"],
      icon: Phone
    },
    {
      channel: "Email Terenkripsi",
      description: "Laporan tertulis dengan keamanan tingkat tinggi", 
      features: ["Documentation", "Secure", "Follow-up"],
      icon: Mail
    },
    {
      channel: "Tatap Muka",
      description: "Konsultasi langsung di Gd. Pengembangan Karakter Kampus 1, Jl. Siliwangi No.24",
      features: ["Personal", "Counseling", "Support"],
      icon: MapPin
    }
  ];

  const satgasMembers = [
    {
      name: "Irani Hoeronis, S.Si., M.T.",
      position: "Ketua Satgas PPKPT",
      department: "Pendidik",
      expertise: ""
    },
    {
      name: "Wiwi Widiastuti, S.Pd., M.Pd.",
      position: "Sekretaris Satgas PPKPT",
      department: "Pendidik",
      expertise: ""
    },
    {
      name: "RINO SUNDAWA PUTRA, S.IP., M.Si.",
      position: "Anggota",
      department: "Pendidik",
      expertise: ""
    },
    {
      name: "Santi Suryani, S.H., M.H.",
      position: "Anggota",
      department: "Pendidik",
      expertise: ""
    },
    {
      name: "Sandra Leoni Prakasa Yaqub, S.H., M.H.",
      position: "Anggota",
      department: "Pendidik",
      expertise: ""
    },
    {
      name: "Dadan Ramdani. S.H., M.H.",
      position: "Anggota",
      department: "Pendidik",
      expertise: ""
    },
    {
      name: "Ir. Heni Sulastri, M.T.",
      position: "Anggota",
      department: "Pendidik",
      expertise: ""
    },
    {
      name: "Dedi Hartadi, S.Kom.",
      position: "Anggota",
      department: "Pendidik",
      expertise: ""
    },
    {
      name: "Sasy Tasya Kierana",
      position: "Anggota",
      department: "Mahasiswa",
      expertise: ""
    },
    {
      name: "Eliza Rahmawati",
      position: "Anggota",
      department: "Mahasiswa",
      expertise: ""
    },
    {
      name: "Dahlia",
      position: "Anggota",
      department: "Mahasiswa",
      expertise: ""
    },
    {
      name: "Silvia Meilani",
      position: "Anggota",
      department: "Mahasiswa",
      expertise: ""
    },
    {
      name: "Sipa Nurul Azizah",
      position: "Anggota",
      department: "Mahasiswa",
      expertise: ""
    },
    {
      name: "Rina Natalia",
      position: "Anggota",
      department: "Mahasiswa",
      expertise: ""
    },
    {
      name: "Fadhila Hendani",
      position: "Anggota",
      department: "Mahasiswa",
      expertise: ""
    },
    {
      name: "Mohamad Yahya Al-Fadil",
      position: "Anggota",
      department: "Mahasiswa",
      expertise: ""
    },
    {
      name: "Adam Malik Rizkiansyah",
      position: "Anggota",
      department: "Mahasiswa",
      expertise: ""
    }
  ];

  const recentActivities = [
    {
      date: "1 Okt 2025",
      title: "Penerbitan Buku Pedoman Satgas PPKPT Terbaru",
      participants: "Seluruh Sivitas Akademika",
      status: "Baru"
    },
    {
      date: "20 Sept 2025",
      title: "Workshop 'Mencegah Kekerasan di Lingkungan Kampus'",
      participants: "120 mahasiswa dan staff",
      status: "Selesai"
    },
    {
      date: "15 Sept 2025", 
      title: "Sosialisasi PPKPT untuk Mahasiswa Baru",
      participants: "800+ mahasiswa baru",
      status: "Selesai"
    },
    {
      date: "10 Sept 2025",
      title: "Pelatihan Peer Counselor",
      participants: "25 mahasiswa volunteer",
      status: "Selesai"
    }
  ];

  const continueConsult = (href: string) => {
    if(confirm("Apakah anda ingin melanjutkan konsultasi?")){
      window.location.href = href;
    }
  }

  const downloadGuide = () => {
    window.open("/Buku-Pedoman-Satgas-PPKPT-Unsil.pdf", "_blank");
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Informasi</span> Satgas PPKPT
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Informasi lengkap mengenai kontak, layanan, struktur organisasi, dan kegiatan 
            Satuan Tugas Pencegahan dan Penanganan Kekerasan di Lingkungan Perguruan Tinggi (Satgas PPKPT) Universitas Siliwangi.
          </p>
        </div>

        <div className="space-y-12">
          {/* Hotline & Contact Information */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Phone className="w-6 h-6 text-primary" />
              Kontak Hotline & Pengaduan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hotlineInfo.map((info, index) => (
                <Card key={index} className="shadow-card hover:shadow-elevated transition-smooth">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">{info.type}</CardTitle>
                    <CardDescription>{info.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-xl font-bold">{info.number || info.contact}</div>
                      <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                        <Clock className="w-3 h-3" />
                        {info.availability}
                      </Badge>
                      <Button size="sm" className="w-full" onClick={() => continueConsult(info.href)}>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Hubungi Sekarang
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Reporting Channels */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Jalur Pengaduan & Pelaporan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {jalurPengaduan.map((jalur, index) => {
                const Icon = jalur.icon;
                return (
                  <Card key={index} className="shadow-card hover:shadow-elevated transition-smooth text-center">
                    <CardHeader>
                      <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <CardTitle className="text-lg">{jalur.channel}</CardTitle>
                      <CardDescription className="text-sm">{jalur.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {jalur.features.map((feature, fIndex) => (
                          <Badge key={fIndex} variant="outline" className="text-xs mx-1">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Team Structure */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              Susunan Anggota Satgas PPKPT
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {satgasMembers.map((member, index) => (
                <Card key={index} className="shadow-card hover:shadow-elevated transition-smooth">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base leading-tight">{member.name}</CardTitle>
                        <Badge variant="default" className="mt-1 text-xs">
                          {member.position}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">{member.department}</p>
                    <p className="text-sm font-medium">Keahlian: {member.expertise}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4 italic text-center">
              * Berdasarkan SK Rektor, Satgas PPKPT Universitas Siliwangi periode 2024-2026 beranggotakan 17 orang yang terdiri dari unsur Dosen, Tendik, dan Mahasiswa.
            </p>
          </div>

          {/* Bentuk-Bentuk Kekerasan */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-primary" />
              Bentuk-Bentuk Kekerasan (Permendikbudristek 55/2024)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Kekerasan Fisik", desc: "Tindakan yang menyebabkan luka atau penderitaan fisik (pemukulan, penganiayaan, dll)." },
                { title: "Kekerasan Psikis", desc: "Tindakan non-fisik yang merendahkan martabat (pengucilan, intimidasi, teror psikologis)." },
                { title: "Perundungan", desc: "Pola kekerasan berulang dengan adanya ketimpangan kuasa, baik fisik maupun psikis." },
                { title: "Kekerasan Seksual", desc: "Spektrum luas dari pelecehan verbal hingga pemaksaan tanpa persetujuan sah." },
                { title: "Diskriminasi & Intoleransi", desc: "Pembedaan perlakuan atau penafikan terhadap keragaman identitas." },
                { title: "Kebijakan Bermasalah", desc: "Pedoman atau tata kelola yang menimbulkan penderitaan atau ketidakadilan." }
              ].map((item, index) => (
                <div key={index} className="p-4 border rounded-lg bg-card shadow-sm">
                  <h4 className="font-bold text-primary mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Kegiatan & Program Satgas
            </h3>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Aktivitas Terbaru & Agenda Mendatang</CardTitle>
                <CardDescription>
                  Program edukasi, sosialisasi, dan kegiatan pencegahan kekerasan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div 
                      key={index} 
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-smooth"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{activity.participants}</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{activity.date}</span>
                        </div>
                      </div>
                      <Badge 
                        variant={activity.status === "Selesai" ? "secondary" : "default"}
                        className="self-start sm:self-center mt-2 sm:mt-0"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Resources */}
          <div className="bg-primary/5 rounded-xl p-8 border border-primary/20">
            <div className="text-center">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Sumber Daya Tambahan</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Download panduan, materi edukasi, dan dokumen penting lainnya 
                untuk mendukung program pencegahan kekerasan di kampus.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" className="transition-smooth" onClick={downloadGuide}>
                  <Download className="w-4 h-4 mr-2" />
                  Buku Pedoman Satgas
                </Button>
                <Button variant="outline" className="transition-smooth">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Regulasi & Kebijakan
                </Button>
                <Button variant="secondary" className="transition-smooth">
                  <Calendar className="w-4 h-4 mr-2" />
                  Jadwal Kegiatan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default InformasiModule;