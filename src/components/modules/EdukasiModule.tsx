import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2Icon, Trophy } from "lucide-react";
import { useEffect } from "react";
import { API } from "@/lib/api";
import { services } from "@/lib/services";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { KuisModule } from "@/lib/types/KuisModule";
import KuisCard from "./KuisCard";

const EdukasiModule = () => {
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modules, setModules] = useState<KuisModule[]>([]);
  const [initModules, setInitModules] = useState<KuisModule>();

  const progress = (completedLevels.length / modules?.length) * 100;

  const fetchModules = async () => {
    setIsLoading(true);
    const { url, method } = services.kuis.getModules();
    API({ 
      url,
      method,
    })
      .then((res) => {
        const { data } = res.data;
        // setInitModules(data[0]);
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
                
                {/* <KuisCard module={initModules} isInitModule={true} progress={initModules?.progress} /> */}

                {modules?.length > 0 &&
                  modules?.map((level, index) => (
                    <div key={index}>
                      <KuisCard module={level} progressPrevMod={modules[index - 1]?.progress[0]}/>
                    </div>
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
