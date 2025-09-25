import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Trophy, CheckCircle, Lock, Play } from "lucide-react";

const EdukasiModule = () => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  const educationLevels = [
    {
      level: 1,
      title: "Pengenalan Dasar PPKS",
      description: "Memahami konsep dasar pencegahan dan penanganan kekerasan seksual",
      duration: "15 menit",
      questions: 5,
      unlocked: true,
    },
    {
      level: 2,
      title: "Jenis-jenis Kekerasan",
      description: "Mengenal berbagai bentuk kekerasan yang dapat terjadi di lingkungan kampus",
      duration: "20 menit",
      questions: 7,
      unlocked: true,
    },
    {
      level: 3,
      title: "Pencegahan Kekerasan",
      description: "Strategi dan tindakan preventif untuk mencegah terjadinya kekerasan",
      duration: "25 menit",
      questions: 8,
      unlocked: completedLevels.includes(2),
    },
    {
      level: 4,
      title: "Mengenali Tanda Bahaya",
      description: "Identifikasi perilaku dan situasi yang berpotensi mengarah pada kekerasan",
      duration: "18 menit",
      questions: 6,
      unlocked: completedLevels.includes(3),
    },
    {
      level: 5,
      title: "Pelaporan dan Pengaduan",
      description: "Prosedur dan mekanisme pelaporan kasus kekerasan yang aman dan terpercaya",
      duration: "22 menit",
      questions: 9,
      unlocked: completedLevels.includes(4),
    },
    {
      level: 6,
      title: "Dukungan untuk Korban",
      description: "Cara memberikan dukungan yang tepat kepada korban kekerasan",
      duration: "30 menit",
      questions: 10,
      unlocked: completedLevels.includes(5),
    },
    {
      level: 7,
      title: "Hukum dan Regulasi",
      description: "Landasan hukum dan peraturan terkait PPKS di lingkungan perguruan tinggi",
      duration: "28 menit",
      questions: 12,
      unlocked: completedLevels.includes(6),
    },
    {
      level: 8,
      title: "Trauma dan Pemulihan",
      description: "Memahami dampak trauma dan proses pemulihan pasca kekerasan",
      duration: "35 menit",
      questions: 15,
      unlocked: completedLevels.includes(7),
    },
    {
      level: 9,
      title: "Budaya Kampus Aman",
      description: "Membangun dan memelihara budaya kampus yang aman dan inklusif",
      duration: "25 menit",
      questions: 11,
      unlocked: completedLevels.includes(8),
    },
    {
      level: 10,
      title: "Advokasi dan Kepemimpinan",
      description: "Menjadi agen perubahan dalam pencegahan kekerasan di kampus",
      duration: "40 menit",
      questions: 20,
      unlocked: completedLevels.includes(9),
    },
  ];

  const progress = (completedLevels.length / educationLevels.length) * 100;

  const handleStartLevel = (level: number) => {
    // Placeholder for starting education level
    alert(`Memulai Level ${level}: ${educationLevels[level - 1].title}\n\nFitur ini memerlukan integrasi backend untuk menyimpan progress dan menampilkan soal test.`);
  };

  const isLevelCompleted = (level: number) => completedLevels.includes(level);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Modul Edukasi</span> PPKS
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Pelajari 10 tingkatan pemahaman tentang pencegahan dan penanganan kekerasan 
            melalui materi interaktif dan ujian yang komprehensif.
          </p>
          
          {/* Progress Overview */}
          <div className="max-w-md mx-auto bg-card p-6 rounded-xl shadow-card">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Progress Anda</span>
              <Badge variant="secondary">{completedLevels.length}/10 Level</Badge>
            </div>
            <Progress value={progress} className="mb-2" />
            <p className="text-sm text-muted-foreground">{Math.round(progress)}% Terselesaikan</p>
          </div>
        </div>

        {/* Education Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {educationLevels.map((level) => (
            <Card 
              key={level.level}
              className={`transition-smooth hover:shadow-elevated ${
                !level.unlocked ? 'opacity-60' : 'cursor-pointer'
              } ${isLevelCompleted(level.level) ? 'ring-2 ring-primary/30' : ''}`}
            >
              <CardHeader className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                      isLevelCompleted(level.level) 
                        ? 'bg-primary text-primary-foreground' 
                        : level.unlocked 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-muted text-muted-foreground'
                    }`}>
                      {isLevelCompleted(level.level) ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : level.unlocked ? (
                        <BookOpen className="w-5 h-5" />
                      ) : (
                        <Lock className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">
                        Level {level.level}
                      </Badge>
                      {isLevelCompleted(level.level) && (
                        <Trophy className="w-4 h-4 text-primary absolute top-4 right-4" />
                      )}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg">{level.title}</CardTitle>
                <CardDescription>{level.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>🕐 {level.duration}</span>
                    <span>❓ {level.questions} soal</span>
                  </div>
                  
                  <Button 
                    variant={level.unlocked ? "default" : "secondary"}
                    size="sm"
                    className="w-full transition-smooth"
                    disabled={!level.unlocked}
                    onClick={() => handleStartLevel(level.level)}
                  >
                    {isLevelCompleted(level.level) ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Selesai
                      </>
                    ) : level.unlocked ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Mulai Level
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Terkunci
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievement Section */}
        {completedLevels.length > 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-full border border-primary/20">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-medium">
                Selamat! Anda telah menyelesaikan {completedLevels.length} level edukasi
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EdukasiModule;