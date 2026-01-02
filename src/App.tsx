import { useEffect, useMemo, useState } from "react";
import "./App.css";

type Role = "customer" | "executor";

function App() {
  const [role, setRole] = useState<Role | null>(null);

  const tg = useMemo(() => window.Telegram?.WebApp, []);

  useEffect(() => {
    tg?.ready();
    tg?.expand();
    tg?.requestFullscreen?.();
  }, [tg]);

  const handleSelect = (nextRole: Role) => {
    setRole(nextRole);
    tg?.sendData(JSON.stringify({ action: "role", role: nextRole, ts: Date.now() }));
  };

  return (
    <div className="screen">
      <header className="hero">
        <div className="hero-top">
          <span className="brand">KIVEN</span>
          <span className="hero-pill">beta 0.9</span>
        </div>
        <h1>
          Выберите роль
          <br />
          в Kiven
        </h1>
        <p className="hero-sub">Интерфейс и поток задач подстроятся под вас.</p>
        <div className="hero-tags" aria-label="Преимущества">
          <span>Быстрый старт</span>
          <span>Безопасные сделки</span>
          <span>Рейтинг и отзывы</span>
        </div>
      </header>

      <section className="choice-grid" aria-label="Выбор роли">
        <button
          className="choice-card"
          data-tone="accent"
          type="button"
          aria-pressed={role === "customer"}
          onClick={() => handleSelect("customer")}
        >
          <div className="choice-top">
            <span className="choice-icon" aria-hidden="true">
              <svg viewBox="0 0 64 64">
                <path d="M22 16l10-6 10 6-10 6z" />
                <path d="M22 16v10l10 6V22z" opacity="0.9" />
                <path d="M42 16v10l-10 6V22z" opacity="0.7" />
                <path
                  d="M16 40c0-3.2 2.6-5.8 5.8-5.8H42c3 0 5.5 2.4 5.5 5.5V46H16z"
                  opacity="0.9"
                />
                <rect x="14" y="34" width="6" height="12" rx="2" opacity="0.9" />
                <path d="M44 35l8-4 4 3v7h-12z" opacity="0.6" />
                <path d="M48 12l2.4-4 2.4 4-4.8-2z" opacity="0.8" />
              </svg>
            </span>
            <span className="choice-tag">Контроль</span>
          </div>
          <span className="choice-title">Я заказчик</span>
          <span className="choice-desc">Создавайте заявки и выбирайте лучших исполнителей.</span>
          <span className="choice-cta">Выбрать роль</span>
        </button>

        <button
          className="choice-card"
          data-tone="neutral"
          type="button"
          aria-pressed={role === "executor"}
          onClick={() => handleSelect("executor")}
        >
          <div className="choice-top">
            <span className="choice-icon" aria-hidden="true">
              <svg viewBox="0 0 64 64">
                <circle cx="32" cy="26" r="6" />
                <path d="M16 30c0-8.5 7-15.5 16-15.5S48 21.5 48 30v4.5H16z" opacity="0.9" />
                <rect x="18" y="34" width="28" height="7" rx="3.5" opacity="0.9" />
                <rect x="30" y="14" width="4" height="9" rx="2" opacity="0.85" />
                <path d="M22 44h20v10H22z" opacity="0.8" />
                <path d="M24 44l8 6 8-6" opacity="0.55" />
              </svg>
            </span>
            <span className="choice-tag">Доход</span>
          </div>
          <span className="choice-title">Я исполнитель</span>
          <span className="choice-desc">Находите заказы, работайте и получайте оплату.</span>
          <span className="choice-cta">Выбрать роль</span>
        </button>
      </section>

      <footer className="footer">
        <p className="hint">Можно сменить позже</p>
        <nav className="bottom-nav" aria-label="Основная навигация">
          <button className="nav-item active" type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3.5 11.5 12 5l8.5 6.5v7.5a1 1 0 0 1-1 1h-5.3v-6.2h-3.9v6.2H4.5a1 1 0 0 1-1-1z" />
            </svg>
            <span>Заявки</span>
          </button>
          <button className="nav-item" type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7.5A4.5 4.5 0 0 1 8.5 3h7A4.5 4.5 0 0 1 20 7.5v4.8A4.5 4.5 0 0 1 15.5 17H9l-5 4v-4a4.5 4.5 0 0 1 0-9z" />
              <rect x="7.5" y="8" width="9" height="1.8" rx="0.9" />
              <rect x="7.5" y="11" width="6.5" height="1.8" rx="0.9" />
            </svg>
            <span>Чаты</span>
          </button>
          <button className="nav-item" type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8.5" r="3.8" />
              <path d="M4.4 20a7.6 7.6 0 0 1 15.2 0z" />
            </svg>
            <span>Профиль</span>
          </button>
        </nav>
      </footer>
    </div>
  );
}

export default App;
