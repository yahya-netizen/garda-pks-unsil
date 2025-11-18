import { KuisModule } from "./KuisModule";
import { Mahasiswa } from "./Mahasiswa";

export interface KuisResult {
    id: number;
    mahasiswa_id: number;
    kuis_id: number;
    score: number;
    isCompleted: boolean;
    created_at: string;
    updated_at: string;
    mahasiwa: Mahasiswa;
    kuis: KuisModule;
}