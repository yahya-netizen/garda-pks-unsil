import { Mahasiswa } from "./Mahasiswa";
import { Admin } from "./Admin";

export interface Message {
    id: number;
    mahasiswaId?: number;
    userId?: number;
    content: string;
    created_at: string;
    updated_at: string;

    mahasiswa?: Mahasiswa;
    admin?: Admin;
}