export interface KuisProps {
      kuis_title: string;
      kuis_content: string;
      jawaban_benar: string;
      level: number;
      nomor_kuis: number;
      modul_kuis_id: number
}

export interface JawabanKuis {
      id: number;
      created_at: string;
      updated_at: string;
      id_soal: number;
      pilihan_jawaban: string;
      deskripsi_jawaban: string;
}