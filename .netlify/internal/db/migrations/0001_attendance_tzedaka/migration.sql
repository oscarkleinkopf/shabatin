-- Asistencia compartida del Shabat Infantil: cada registro es un Shabat con
-- la cantidad de niños presentes. Sustituye el almacenamiento por dispositivo
-- (localStorage) por datos comunitarios consultables por todos los monitores.
CREATE TABLE IF NOT EXISTS attendance (
  id SERIAL PRIMARY KEY,
  event_date DATE NOT NULL,
  count INTEGER NOT NULL,
  notes TEXT NOT NULL DEFAULT '',
  parasha TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tzedaká comunitaria: cada moneda depositada es una fila. El total se obtiene
-- con SUM(amount), lo que evita condiciones de carrera al sumar desde varios
-- dispositivos a la vez. Reiniciar la caja equivale a borrar las filas.
CREATE TABLE IF NOT EXISTS tzedaka_entries (
  id SERIAL PRIMARY KEY,
  amount INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
