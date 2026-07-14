-- Tzedaká comunitaria: cada moneda depositada es una fila. El total se obtiene
-- con SUM(amount), lo que evita condiciones de carrera al sumar desde varios
-- dispositivos a la vez. Reiniciar la caja equivale a borrar las filas.
CREATE TABLE IF NOT EXISTS tzedaka_entries (
  id SERIAL PRIMARY KEY,
  amount INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
