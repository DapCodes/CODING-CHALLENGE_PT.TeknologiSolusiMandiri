-- Create ENUM type safely
DO $$ BEGIN
    CREATE TYPE priority_enum AS ENUM ('high', 'medium', 'low');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create todos table if not exists
CREATE TABLE IF NOT EXISTS todos (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    completed   BOOLEAN NOT NULL DEFAULT FALSE,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    priority    priority_enum NOT NULL DEFAULT 'medium',
    due_date    TIMESTAMPTZ,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed data examples with explicit timestamps
INSERT INTO todos (title, description, completed, category_id, priority, due_date, created_at, updated_at) VALUES
    ('Complete coding challenge',     'Build full-stack todo app for Industrix',     FALSE, 1, 'high',   NOW() + INTERVAL '3 days', NOW(), NOW()),
    ('Review pull requests',          'Review and merge pending PRs from team',       FALSE, 1, 'medium', NOW() + INTERVAL '1 day', NOW(), NOW()),
    ('Buy groceries',                 'Milk, eggs, bread, vegetables',               TRUE,  3, 'low',    NOW() - INTERVAL '1 day', NOW(), NOW()),
    ('Morning workout',               '30 minutes cardio + stretching',              FALSE, 4, 'medium', NOW(), NOW(), NOW()),
    ('Read TypeScript handbook',      'Finish chapters 5-8 of TypeScript handbook',  FALSE, 2, 'low',    NOW() + INTERVAL '7 days', NOW(), NOW())
ON CONFLICT DO NOTHING;
