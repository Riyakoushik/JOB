CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Applied',
  match INTEGER DEFAULT 80,
  notes TEXT DEFAULT '',
  applyUrl TEXT DEFAULT '',
  source TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now'))
);
