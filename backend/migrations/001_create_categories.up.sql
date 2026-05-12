-- Create categories table if not exists (Sequelize handles this but good for direct SQL)
CREATE TABLE IF NOT EXISTS categories (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL UNIQUE,
    color       VARCHAR(7) NOT NULL DEFAULT '#6366F1',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed data awal with explicit timestamps
INSERT INTO categories (name, color, created_at, updated_at) VALUES
    ('Work',     '#3B82F6', NOW(), NOW()),
    ('Personal', '#10B981', NOW(), NOW()),
    ('Shopping', '#F59E0B', NOW(), NOW()),
    ('Health',   '#EF4444', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;
