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

  const isCustomer = role === "customer";
  const isExecutor = role === "executor";

  return (
    <div className="screen" data-screen={isCustomer ? "customer" : "select"}>
      {isCustomer ? (
        <>
          <header className="customer-hero">
            <span className="brand brand-center">KIVEN</span>
            <div className="customer-copy">
              <h1>Здравствуйте!</h1>
              <p>Что вам нужно сделать?</p>
            </div>
            <div className="search-card" role="search">
              <span className="search-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="M16 16l4.2 4.2" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Например: электрик, уборка, репетитор..."
                aria-label="Поиск услуг"
              />
              <button className="filter-btn" type="button" aria-label="Фильтры">
                <svg viewBox="0 0 24 24">
                  <path d="M4 6h16l-6 7v4l-4 1v-5z" />
                </svg>
              </button>
            </div>
          </header>

          <section className="customer-section" aria-label="Популярные услуги">
            <h2 className="section-title">Популярное сегодня</h2>
            <div className="popular-grid">
              <button className="popular-card" data-tone="dark" type="button">
                <span className="popular-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M13 2 4 13h6l-1 9 11-13h-6z" />
                  </svg>
                </span>
                <span>Электрика</span>
              </button>
              <button className="popular-card" data-tone="accent" type="button">
                <span className="popular-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 10h6l-2 10 8-12h-6l2-6z" />
                  </svg>
                </span>
                <span>Сантехника</span>
              </button>
              <button className="popular-card" data-tone="charcoal" type="button">
                <span className="popular-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <circle cx="8" cy="7" r="3" />
                    <path d="M3 20c0-4 3-6 6-6s6 2 6 6" />
                    <path d="M16 12l5 5" />
                  </svg>
                </span>
                <span>Уборка и клининг</span>
              </button>
              <button className="popular-card" data-tone="sun" type="button">
                <span className="popular-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 7h10l2 3h4v6h-3" />
                    <rect x="3" y="10" width="9" height="6" rx="1.5" />
                    <circle cx="7" cy="17" r="2" />
                    <circle cx="16" cy="17" r="2" />
                  </svg>
                </span>
                <span>Грузчики</span>
              </button>
            </div>
          </section>

          <section className="customer-section" aria-label="Категории">
            <h2 className="section-title">Категории</h2>
            <div className="category-grid">
              <button className="category-card" type="button">
                <span className="category-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 12l9-7 9 7" />
                    <path d="M5 10v9h14v-9" />
                    <path d="M9 19v-6h6v6" />
                  </svg>
                </span>
                <span>Дом и ремонт</span>
                <span className="category-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
              <button className="category-card" type="button">
                <span className="category-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="8" rx="2" />
                    <path d="M6 11V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3" />
                    <path d="M8 19v-3h8v3" />
                  </svg>
                </span>
                <span>Мебель и интерьер</span>
                <span className="category-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
              <button className="category-card" type="button">
                <span className="category-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <rect x="4" y="6" width="16" height="12" rx="2" />
                    <path d="M9 18v2h6v-2" />
                    <path d="M8 9h8" />
                  </svg>
                </span>
                <span>Техника и гаджеты</span>
                <span className="category-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
              <button className="category-card" type="button">
                <span className="category-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 14l2-6h8l2 6" />
                    <rect x="3" y="12" width="18" height="6" rx="2" />
                    <circle cx="8" cy="18" r="1.6" />
                    <circle cx="16" cy="18" r="1.6" />
                  </svg>
                </span>
                <span>Автоуслуги</span>
                <span className="category-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
              <button className="category-card" type="button">
                <span className="category-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <circle cx="8" cy="7" r="3" />
                    <path d="M3 20c0-4 3-6 6-6s6 2 6 6" />
                    <path d="M16 8h5" />
                    <path d="M16 12h5" />
                  </svg>
                </span>
                <span>Курьеры</span>
                <span className="category-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
              <button className="category-card" type="button">
                <span className="category-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 7h10l4 4v8H4z" />
                    <path d="M14 7v4h4" />
                    <path d="M7 14h8" />
                  </svg>
                </span>
                <span>Доставка</span>
                <span className="category-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
            </div>
          </section>

          <div className="cta-wrap">
            <button className="cta-primary" type="button">
              Создать заявку
            </button>
          </div>
        </>
      ) : (
        <>
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
              aria-pressed={isCustomer}
              onClick={() => handleSelect("customer")}
            >
              <div className="choice-top">
                <span className="choice-icon" aria-hidden="true">
                  <svg viewBox="0 0 64 64">
                    <path
                      d="M8 32c7.5-10.8 17.8-16.2 24-16.2S48.5 21.2 56 32c-7.5 10.8-17.8 16.2-24 16.2S15.5 42.8 8 32z"
                      opacity="0.75"
                    />
                    <circle cx="32" cy="32" r="9" opacity="0.35" />
                    <circle cx="32" cy="32" r="3.5" opacity="0.95" />
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
              aria-pressed={isExecutor}
              onClick={() => handleSelect("executor")}
            >
              <div className="choice-top">
                <span className="choice-icon" aria-hidden="true">
                  <svg viewBox="0 0 64 64">
                    <rect x="12" y="24" width="40" height="26" rx="8" opacity="0.85" />
                    <rect x="22" y="16" width="20" height="10" rx="5" opacity="0.45" />
                    <rect x="30" y="30" width="4" height="8" rx="2" opacity="0.95" />
                    <path
                      d="M16 34h32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity="0.35"
                    />
                  </svg>
                </span>
                <span className="choice-tag">Доход</span>
              </div>
              <span className="choice-title">Я исполнитель</span>
              <span className="choice-desc">Находите заказы, работайте и получайте оплату.</span>
              <span className="choice-cta">Выбрать роль</span>
            </button>
          </section>
        </>
      )}

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
