-- Admin kullanıcılar tablosu
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Örnek admin kullanıcı ekleyelim (şifre: pltyapi60tokat)
-- Gerçek uygulamada şifre hash'lenmeli, bu sadece örnek amaçlıdır
INSERT INTO admin_users (username, password_hash, email)
VALUES ('admin', 'pltyapi60tokat', 'admin@example.com')
ON CONFLICT (username) DO NOTHING;
