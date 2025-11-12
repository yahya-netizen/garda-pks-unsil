import { KuisProps } from "./Kuis";
import { ProgressProps } from "./Progress";

export interface KuisModuleProps {
  modul: {
    id: number;
    modul_title: string;
    modul_description: string;
    work_estimate: string;
    kuis: KuisProps[];
  }[];
  progress: ProgressProps[];
}

export interface InitKuisModuleProps {
  modul: {
    id: number;
    modul_title: string;
    modul_description: string;
    work_estimate: string;
    kuis: KuisProps[];
  }
  progress: ProgressProps
}