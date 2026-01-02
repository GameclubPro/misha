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

    const applyInsets = () => {
      const safeTop = tg?.contentSafeAreaInset?.top ?? tg?.safeAreaInset?.top ?? 0;
      document.documentElement.style.setProperty("--tg-safe-top", `${safeTop}px`);
    };

    applyInsets();
    tg?.onEvent?.("viewportChanged", applyInsets);

    return () => tg?.offEvent?.("viewportChanged", applyInsets);
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
        <nav className="bottom-nav" aria-label="Основная навигация">
          <button className="nav-item active" type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="4" y="3.5" width="16" height="17" rx="3" />
              <path d="M8 8h8" />
              <path d="M8 12h8" />
              <path d="M8 15.5h5" />
            </svg>
            <span>Заявки</span>
          </button>
          <button className="nav-item" type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 7.5A4.5 4.5 0 0 1 9.5 3h5A4.5 4.5 0 0 1 19 7.5v3a4.5 4.5 0 0 1-4.5 4.5H9l-4 4v-4A4.5 4.5 0 0 1 5 7.5z" />
              <path d="M8.5 8.5h7" />
              <path d="M8.5 11.5h4.5" />
            </svg>
            <span>Чаты</span>
          </button>
          <button className="nav-item" type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M4 20c1.6-4 5.6-6 8-6s6.4 2 8 6" />
            </svg>
            <span>Профиль</span>
          </button>
        </nav>
      </footer>
    </div>
  );
}

export default App;
