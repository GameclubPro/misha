import { useEffect, useMemo, useState } from "react";
import "./App.css";

type Role = "customer" | "executor";

function App() {
  const [role, setRole] = useState<Role | null>(null);

  const tg = useMemo(() => window.Telegram?.WebApp, []);

  useEffect(() => {
    tg?.ready();
    tg?.expand();
  }, [tg]);

  const handleSelect = (nextRole: Role) => {
    setRole(nextRole);
    tg?.sendData(JSON.stringify({ action: "role", role: nextRole, ts: Date.now() }));
  };

  return (
    <div className="screen">
      <header className="hero">
        <span className="brand">KIVEN</span>
        <h1>
          Для чего вам
          <br />
          Kiven?
        </h1>
      </header>

      <section className="choice-grid" aria-label="Выбор роли">
        <button
          className="choice-card"
          data-tone="accent"
          type="button"
          aria-pressed={role === "customer"}
          onClick={() => handleSelect("customer")}
        >
          <span className="choice-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64">
              <path d="M14 20l12-7 12 7-12 7z" />
              <path d="M14 20v14l12 7v-14z" opacity="0.9" />
              <path d="M38 20v14l-12 7v-14z" opacity="0.7" />
              <rect x="40" y="16" width="10" height="10" rx="2" opacity="0.6" />
              <path d="M8 40c0-3.5 2.8-6.3 6.3-6.3h22.7c3.2 0 5.8 2.6 5.8 5.8v8.5H8z" opacity="0.85" />
              <path d="M42 36l10-5 4 3v8H42z" opacity="0.55" />
            </svg>
          </span>
          <span className="choice-label">Я заказчик</span>
        </button>

        <button
          className="choice-card"
          data-tone="neutral"
          type="button"
          aria-pressed={role === "executor"}
          onClick={() => handleSelect("executor")}
        >
          <span className="choice-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64">
              <path d="M14 30c0-9.5 7.5-17 18-17s18 7.5 18 17v6H14z" opacity="0.9" />
              <rect x="16" y="34" width="32" height="8" rx="4" opacity="0.9" />
              <rect x="30" y="14" width="4" height="10" rx="2" opacity="0.85" />
              <path d="M20 44h24v10H20z" opacity="0.75" />
              <path d="M24 44l8 6 8-6" opacity="0.55" />
            </svg>
          </span>
          <span className="choice-label">Я исполнитель</span>
        </button>
      </section>

      <footer className="footer">
        <p className="hint">Можно сменить позже</p>
        <nav className="bottom-nav" aria-label="Основная навигация">
          <button className="nav-item active" type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 11.5 12 5l8 6.5v7.5a1 1 0 0 1-1 1h-5.5v-6h-3v6H5a1 1 0 0 1-1-1z" />
            </svg>
            <span>Заявки</span>
          </button>
          <button className="nav-item" type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4H9l-5 4v-4a4 4 0 0 1-4-4z" />
            </svg>
            <span>Чаты</span>
          </button>
          <button className="nav-item" type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 12.5a4.25 4.25 0 1 0-4.25-4.25A4.25 4.25 0 0 0 12 12.5z" />
              <path d="M4.5 20a7.5 7.5 0 0 1 15 0z" />
            </svg>
            <span>Профиль</span>
          </button>
        </nav>
      </footer>
    </div>
  );
}

export default App;
