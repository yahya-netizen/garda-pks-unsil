import { KuisProps } from "./Kuis";
import { ProgressProps } from "./Progress";

export interface KuisArrProps {
  modul_kuis: KuisModuleProps["modul_kuis"][];
  progress: ProgressProps[];
}

export interface KuisModuleProps {
  modul_kuis: {
    id: number;
    modul_title: string;
    modul_description: string;
    work_estimate: string;
    kuis: KuisProps[];
  }
  progress: ProgressProps
}