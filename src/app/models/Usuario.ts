export interface Usuario {
    id: number,
    nome: string,
    endereco: string,
    email: string,
    telefone: string,
    senha?: string,
    created_at: string,
    updated_at: string
}