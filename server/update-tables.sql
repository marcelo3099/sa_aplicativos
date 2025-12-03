-- Script para atualizar a tabela users existente no Supabase
-- Execute isto no SQL Editor do painel do Supabase (https://supabase.com/dashboard)

-- Adicionando colunas à tabela users existente (se não existirem)
ALTER TABLE users ADD COLUMN IF NOT EXISTS email text UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS password text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS user_type text DEFAULT 'aluno';
ALTER TABLE users ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();

-- Verificar se as colunas foram adicionadas corretamente
-- Se os dados antigos não forem importantes, você pode atualizar os campos obrigatórios
-- UPDATE users SET email = 'temp_' || id || '@example.com' WHERE email IS NULL;
-- UPDATE users SET password = 'default_password' WHERE password IS NULL;

-- Criar índice para busca por email
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);

-- Função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar o campo updated_at automaticamente
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Atualizar a restrição NOT NULL para campos obrigatórios (exceto para dados existentes)
-- Para novos registros:
-- ALTER TABLE users ALTER COLUMN email SET NOT NULL;
-- ALTER TABLE users ALTER COLUMN password SET NOT NULL;

-- Ativar segurança por RLS (Row Level Security) se desejar
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;