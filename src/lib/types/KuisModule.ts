import { Kuis } from "./Kuis";
import { Progress } from "./Progress";

export interface KuisModule {
    id: number;
    modul_title: string;
    modul_description: string;
    work_estimate: string;
    kuis: Kuis[];
    progress: Progress[]
}

