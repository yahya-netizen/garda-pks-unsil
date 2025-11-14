import { KuisModule } from "./KuisModule";
import { Mahasiswa } from "./Mahasiswa";

export interface History {
    id: number;
    mahasiswa_id: number;
    kuis_id: number;
    isCompleted: boolean;
    mahasiswa: Mahasiswa;
    modul_kuis: KuisModule;
    score: number;
    created_at: string;
    updated_at: string;
}