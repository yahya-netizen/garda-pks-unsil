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
import { KuisModuleProps } from "@/lib/types/KuisModule";
import { useNavigate } from "react-router";


export default function KuisCard({module, progress, isInitModule}: {module: KuisModuleProps["modul_kuis"], progress: KuisModuleProps["progress"], isInitModule?: boolean}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (progress?.isCompleted || isInitModule) {
      navigate(`/edukasi/kuis/${module?.id}`);
    }
  }

  return (
    <Card
      className={`transition-smooth hover:shadow-elevated ${
        !progress?.isCompleted && !isInitModule ? "opacity-60" : "cursor-pointer"
      } ${
        progress?.isCompleted && !isInitModule ? "ring-2 ring-primary/30" : ""
      }`}
    >
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                progress?.isCompleted && !isInitModule
                  ? "bg-primary text-primary-foreground"
                  : progress?.isCompleted && !isInitModule
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {progress?.isCompleted && !isInitModule ? (
                <CheckCircle className="w-5 h-5" />
              ) : progress?.isCompleted && !isInitModule || isInitModule ? (
                <BookOpen className="w-5 h-5" />
              ) : (
                <Lock className="w-5 h-5" />
              )}
            </div>
            <div>
              <Badge variant="outline" className="mb-2">
                Level {module?.id}
              </Badge>
              {progress?.isCompleted && !isInitModule && (
                <Trophy className="w-4 h-4 text-primary absolute top-4 right-4" />
              )}
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
              progress?.isCompleted || isInitModule
                ? "default"
                : "secondary"
            }
            size="sm"
            className="w-full transition-smooth"
            disabled={!progress?.isCompleted && !isInitModule}
            onClick={handleCardClick}
          >
            {progress?.isCompleted ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Selesai
              </>
            ) : progress?.isCompleted || isInitModule ? (
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
  );
}
