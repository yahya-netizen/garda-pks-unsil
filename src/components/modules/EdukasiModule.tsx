import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Trophy,
  CheckCircle,
  Lock,
  Play,
  Loader2Icon,
} from "lucide-react";
import { useEffect } from "react";
import { API } from "@/lib/api";
import { services } from "@/lib/services";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { KuisModuleProps, InitKuisModuleProps } from "@/lib/types/KuisModule";

const EdukasiModule = () => {
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modules, setModules] = useState<KuisModuleProps[]>([]);
  const [initModules, setInitModules] = useState<InitKuisModuleProps>();

  const progress = (completedLevels.length / modules.length) * 100;

  const fetchModules = async () => {
    setIsLoading(true);
    const { url, method } = services.kuis.getModules();
    API({
      url,
      method,
    })
      .then((res) => {
        const { data: data } = res.data;
        setInitModules({
          modul: data.modul_kuis[0],
          progress: data.progress[0],
        });
        data.modul_kuis.shift();
        setModules(data);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response.data.message || "Gagal memuat modul kuis.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Modul Edukasi</span> PPKPT
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Pelajari 10 tingkatan pemahaman tentang pencegahan dan penanganan
            kekerasan melalui materi interaktif dan ujian yang komprehensif.
          </p>

          {isLoading ? (
            <div className="flex justify-center flex-col gap-y-2 items-center w-full h-full">
              <Loader2Icon className="animate-spin w-8 h-8 text-primary" />
              <h1 className="text-xl font-bold">Loading Kuis</h1>
            </div>
          ) : (
            <>
              <div className="max-w-md mx-auto bg-card p-6 rounded-xl shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Progress Anda</span>
                  <Badge variant="secondary">
                    {completedLevels.length}/10 Level
                  </Badge>
                </div>
                <Progress value={progress} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  {Math.round(progress)}% Terselesaikan
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* {JSON.stringify(initModules)} */}
                  <Card
                      className={`transition-smooth hover:shadow-elevated ${
                        !initModules?.progress?.isCompleted
                          ? "opacity-60"
                          : "cursor-pointer"
                      } ${
                        initModules?.progress?.isCompleted
                          ? "ring-2 ring-primary/30"
                          : ""
                      }`}
                    >
                      <CardHeader className="relative">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                                initModules?.progress?.isCompleted
                                  ? "bg-primary text-primary-foreground"
                                  : initModules?.progress?.isCompleted
                                  ? "bg-primary/10 text-primary"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {initModules?.progress?.isCompleted ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                <BookOpen className="w-5 h-5" /> )
                              }
                            </div>
                            <div>
                              <Badge variant="outline" className="mb-2">
                                Modul 1
                              </Badge>
                              {initModules?.progress?.isCompleted && (
                                <Trophy className="w-4 h-4 text-primary absolute top-4 right-4" />
                              )}
                            </div>
                          </div>
                        </div>
                        <CardTitle className="text-lg">
                          {initModules?.modul?.modul_title}
                        </CardTitle>
                        <CardDescription>
                          {initModules?.modul?.modul_description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>🕐 {initModules?.modul?.work_estimate}</span>
                            <span>❓ {initModules?.modul?.kuis?.length} soal</span>
                          </div>

                          <Button
                            variant={"default"}
                            size="sm"
                            className="w-full transition-smooth"
                            // onClick={() => handleStartinitModules(initModules.initModules)}
                          >
                            {initModules?.progress?.isCompleted ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Selesai
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Mulai Kuis
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>


                {modules.length > 1 &&
                  modules.map((level, index) => (
                    <Card
                      key={index}
                      className={`transition-smooth hover:shadow-elevated ${
                        !level.progress[index].isCompleted
                          ? "opacity-60"
                          : "cursor-pointer"
                      } ${
                        level.progress[index].isCompleted
                          ? "ring-2 ring-primary/30"
                          : ""
                      }`}
                    >
                      <CardHeader className="relative">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                                level.progress[index].isCompleted
                                  ? "bg-primary text-primary-foreground"
                                  : level.progress[index - 1].isCompleted
                                  ? "bg-primary/10 text-primary"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {level.progress[index].isCompleted ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : level.progress[index - 1].isCompleted ? (
                                <BookOpen className="w-5 h-5" />
                              ) : (
                                <Lock className="w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <Badge variant="outline" className="mb-2">
                                Level {index + 2}
                              </Badge>
                              {level.progress[index].isCompleted && (
                                <Trophy className="w-4 h-4 text-primary absolute top-4 right-4" />
                              )}
                            </div>
                          </div>
                        </div>
                        <CardTitle className="text-lg">
                          {level.modul[index].modul_title}
                        </CardTitle>
                        <CardDescription>
                          {level.modul[index].modul_description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>🕐 {level.modul[index].work_estimate}</span>
                            <span>❓ {level.modul[index].modul_title} soal</span>
                          </div>

                          <Button
                            variant={
                              level.progress[index - 1].isCompleted
                                ? "default"
                                : "secondary"
                            }
                            size="sm"
                            className="w-full transition-smooth"
                            disabled={!level.progress[index - 1].isCompleted}
                            // onClick={() => handleStartLevel(level.level)}
                          >
                            {level.progress[index].isCompleted ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Selesai
                              </>
                            ) : level.progress[index - 1].isCompleted ? (
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
            </>
          )}
        </div>

        {/* Achievement Section */}
        {completedLevels.length > 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-full border border-primary/20">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-medium">
                Selamat! Anda telah menyelesaikan {completedLevels.length} level
                edukasi
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EdukasiModule;
