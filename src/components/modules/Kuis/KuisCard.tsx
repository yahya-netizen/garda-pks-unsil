import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Trophy,
  CheckCircle,
  Lock,
  Play,
} from "lucide-react";
import { KuisModule } from "@/lib/types/KuisModule";
import { useNavigate } from "react-router";
import { Progress } from "@/lib/types/Progress";

interface IProps {
  module: KuisModule
  progressPrevMod: Progress
  isInitModule?: boolean;
}

export default function KuisCard({module, isInitModule, progressPrevMod}: IProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (module?.progress[0]?.isCompleted) {
      navigate(`/edukasi/kuis-result/${module?.id}`)
    } else {
      navigate(`/edukasi/kuis/${module?.id}`)
    }
  }

  return (
    <Card
      className={`transition-smooth hover:shadow-elevated ${
        !module?.progress[0]?.isCompleted ? "opacity-60" : "cursor-pointer"
      } ${
        module?.progress[0]?.isCompleted ? "ring-2 ring-primary/30" : ""
      }`}
    >
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                module?.progress[0]?.isCompleted
                  ? "bg-primary text-primary-foreground"
                  : module?.progress[0]?.isCompleted
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {module?.progress[0]?.isCompleted ? (
                <CheckCircle className="w-5 h-5" />
              ) : module?.progress[0]?.isCompleted && isInitModule ? (
                <BookOpen className="w-5 h-5" />
              ) : (
                <Lock className="w-5 h-5" />
              )}
            </div>
            <div>
              <Badge variant="outline" className="mb-2">
                Level {module?.id} 
              </Badge>
              {module?.progress[0]?.isCompleted ? (
                <Trophy className="w-4 h-4 text-primary absolute top-4 right-4" />
              ) : (null)}
            </div>
          </div>
        </div>
        <CardTitle className="text-lg">
          {module?.modul_title}
        </CardTitle>
        <CardDescription>
          {module?.modul_description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>🕐 {module?.work_estimate}</span>
            <span>❓ {module?.kuis?.length} soal</span>
          </div>

          <Button
            variant={
              (module?.progress[0]?.isCompleted) || isInitModule || progressPrevMod?.isCompleted
                ? "default"
                : "secondary"
            }
            size="sm"
            className="w-full transition-smooth"
            disabled={!module?.progress[0]?.isCompleted && !progressPrevMod?.isCompleted && !isInitModule}
            onClick={handleCardClick}
          >
            {module?.progress[0]?.isCompleted ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Selesai
              </>
            ) : progressPrevMod?.isCompleted || isInitModule ? (
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

          {
            module?.progress[0]?.isCompleted && (
              <Button variant="outline" className="w-full" onClick={() => { navigate(`/edukasi/kuis-result/${module?.id}`);}}>
                Lihat Riwayat
              </Button>
            )
          }
        </div>
      </CardContent>
    </Card>
  );
}
