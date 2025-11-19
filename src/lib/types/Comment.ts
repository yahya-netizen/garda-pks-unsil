import { Mahasiswa } from "./Mahasiswa";
import { Admin } from "./Admin";


export interface Comment {
    id: number;
    mahasiswa_id: number;
    user_id: number;
    berita_id: number;
    comment_text: string;
    mahasiswa: Mahasiswa;
    user: Admin;
    created_at: string;
    updated_at: string;
}