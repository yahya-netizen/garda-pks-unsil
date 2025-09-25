import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  FileText, 
  Shield, 
  Search, 
  Scale, 
  HeartHandshake, 
  Phone,
  ArrowRight,
  Clock,
  CheckCircle2
} from "lucide-react";

const AlurModule = () => {
  const alurSteps = [
    {
      step: 1,
      title: "Pelaporan Awal",
      description: "Korban atau saksi melaporkan kejadian melalui berbagai saluran yang tersedia",
      icon: AlertTriangle,
      details: [
        "Hotline 24/7: 0265-123456",
        "Email: satgasppks@unsil.ac.id", 
        "Website: Portal pelaporan online",
        "Langsung ke kantor Satgas PPKS"
      ],
      timeframe: "0-24 jam",
      color: "bg-red-50 border-red-200 text-red-700"
    },
    {
      step: 2,
      title: "Penerimaan & Dokumentasi",
      description: "Satgas menerima laporan dan melakukan dokumentasi awal dengan menjaga kerahasiaan",
      icon: FileText,
      details: [
        "Pencatatan data laporan",
        "Verifikasi identitas pelapor",
        "Dokumentasi kronologi kejadian",
        "Penentuan tingkat urgensi"
      ],
      timeframe: "1-3 hari kerja",
      color: "bg-orange-50 border-orange-200 text-orange-700"
    },
    {
      step: 3,
      title: "Perlindungan Korban",
      description: "Memberikan perlindungan dan dukungan awal kepada korban",
      icon: Shield,
      details: [
        "Konseling psikologis",
        "Bantuan medis jika diperlukan",
        "Perlindungan identitas korban",
        "Pendampingan hukum"
      ],
      timeframe: "Segera setelah laporan",
      color: "bg-blue-50 border-blue-200 text-blue-700"
    },
    {
      step: 4,
      title: "Investigasi",
      description: "Melakukan penyelidikan menyeluruh terhadap kasus yang dilaporkan",
      icon: Search,
      details: [
        "Wawancara dengan korban dan saksi",
        "Pengumpulan bukti-bukti",
        "Klarifikasi dengan pihak terlapor",
        "Analisis fakta dan temuan"
      ],
      timeframe: "7-30 hari kerja",
      color: "bg-purple-50 border-purple-200 text-purple-700"
    },
    {
      step: 5,
      title: "Putusan & Sanksi",
      description: "Pengambilan keputusan berdasarkan hasil investigasi dan pemberian sanksi yang sesuai",
      icon: Scale,
      details: [
        "Sidang panel ahli",
        "Penilaian tingkat pelanggaran",
        "Penentuan sanksi administratif",
        "Rujukan ke pihak berwajib jika perlu"
      ],
      timeframe: "3-7 hari kerja setelah investigasi",
      color: "bg-indigo-50 border-indigo-200 text-indigo-700"
    },
    {
      step: 6,
      title: "Pemulihan & Monitoring",
      description: "Proses pemulihan korban dan pemantauan pelaksanaan sanksi",
      icon: HeartHandshake,
      details: [
        "Program rehabilitasi korban",
        "Monitoring pelaksanaan sanksi",
        "Evaluasi dampak penanganan",
        "Pencegahan berulangnya kejadian"
      ],
      timeframe: "Ongoing (berkelanjutan)",
      color: "bg-green-50 border-green-200 text-green-700"
    }
  ];

  const emergencyContacts = [
    { label: "Hotline Satgas PPKS", number: "0265-123456", available: "24/7" },
    { label: "Whatsapp Konseling", number: "0812-3456-7890", available: "08:00-20:00" },
    { label: "Email Pengaduan", contact: "satgasppks@unsil.ac.id", available: "24/7" }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Alur Penanganan</span> Kekerasan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Proses sistematis dan profesional dalam menangani kasus kekerasan 
            di lingkungan Universitas Siliwangi dengan menjamin keadilan dan perlindungan korban.
          </p>

          {/* Emergency Contacts */}
          <div className="bg-card p-6 rounded-xl shadow-card max-w-4xl mx-auto mb-12">
            <h3 className="text-lg font-semibold text-primary mb-4 flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Kontak Darurat
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="font-medium text-sm text-primary">{contact.label}</div>
                  <div className="text-lg font-bold">{contact.number || contact.contact}</div>
                  <Badge variant="secondary" className="mt-1 text-xs">{contact.available}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Flow */}
        <div className="space-y-8">
          {alurSteps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === alurSteps.length - 1;
            
            return (
              <div key={step.step} className="relative">
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  {/* Step Number and Icon */}
                  <div className="flex flex-col items-center lg:items-start lg:min-w-[120px]">
                    <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full shadow-card mb-4">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Langkah {step.step}
                    </Badge>
                  </div>

                  {/* Content Card */}
                  <Card className="flex-1 shadow-card transition-smooth hover:shadow-elevated">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                          <CardDescription className="text-base">{step.description}</CardDescription>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium border ${step.color}`}>
                          <Clock className="w-4 h-4 inline mr-1" />
                          {step.timeframe}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Arrow Connector */}
                {!isLast && (
                  <div className="flex justify-center lg:justify-start lg:ml-8 my-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                      <ArrowRight className="w-6 h-6 text-primary rotate-90 lg:rotate-0" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-primary p-8 rounded-xl text-primary-foreground shadow-elevated max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Butuh Bantuan Segera?</h3>
            <p className="mb-6 opacity-90">
              Jangan ragu untuk menghubungi kami. Tim Satgas PPKS siap membantu Anda 24/7 
              dengan profesionalisme dan kerahasiaan terjamin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                <Phone className="w-5 h-5 mr-2" />
                Hubungi Hotline
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <FileText className="w-5 h-5 mr-2" />
                Lapor Online
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlurModule;