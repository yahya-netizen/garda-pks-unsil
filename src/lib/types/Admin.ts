export interface Admin {
    id: number;
    name: string;
    email: string;
    password: string;
    email_verified_at: string | null;
    remember_token: string;
    created_at: string;
    updated_at: string;
}