import { useEffect, useMemo, useState } from "react";
import "./App.css";

type Role = "customer" | "executor";

const CATEGORY_LABELS: Record<string, string> = {
  home: "Дом и ремонт",
  furniture: "Мебель и интерьер",
  tech: "Техника и гаджеты",
  auto: "Автоуслуги",
  courier: "Курьеры",
  delivery: "Доставка",
  "popular-electric": "Электрика",
  "popular-plumbing": "Сантехника",
  "popular-cleaning": "Уборка и клининг",
  "popular-movers": "Грузчики",
};

function App() {
  const [role, setRole] = useState<Role | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

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
    setSelectedCategory(null);
    setIsCreating(false);
  };

  const isCustomer = role === "customer";
  const isExecutor = role === "executor";
  const hasCategory = Boolean(selectedCategory);
  const isCreatingScreen = isCustomer && isCreating;
  const selectedLabel = selectedCategory
    ? CATEGORY_LABELS[selectedCategory] ?? "Категория"
    : "Категория";
  const selectedMeta = selectedCategory?.startsWith("popular")
    ? "Популярное сегодня"
    : "Категория";

  const handleCreate = () => {
    if (selectedCategory) {
      setIsCreating(true);
    }
  };

  const handleBack = () => {
    setIsCreating(false);
  };

  return (
    <div
      className="screen"
      data-screen={isCreatingScreen ? "create" : isCustomer ? "customer" : "select"}
    >
      {isCustomer ? (
        isCreatingScreen ? (
          <>
            <header className="create-header">
              <button className="back-btn" type="button" aria-label="Назад" onClick={handleBack}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <span className="brand create-brand">KIVEN</span>
              <span className="create-spacer" aria-hidden="true" />
            </header>

            <section className="create-body" aria-label="Создание заявки">
              <h1 className="create-title">Создать заявку</h1>
              <div className="form-stack">
                <button
                  className="form-row form-row--category"
                  type="button"
                  onClick={handleBack}
                >
                  <span className="form-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M3 12l7-7h7v7l-7 7-7-7z" />
                      <circle cx="14" cy="7" r="1.6" />
                    </svg>
                  </span>
                  <span className="form-row-text">
                    <span className="form-row-title">{selectedLabel}</span>
                    <span className="form-row-meta">{selectedMeta}</span>
                  </span>
                  <span className="form-chevron" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </span>
                </button>

                <div className="form-card">
                  <label className="form-field">
                    <span className="form-field-title">Коротко</span>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Например: заменить смеситель"
                      aria-label="Краткое описание"
                    />
                  </label>
                  <label className="form-field">
                    <span className="form-field-title">Подробнее</span>
                    <textarea
                      className="form-textarea"
                      placeholder="Опишите задачу детальнее: что нужно, как срочно, есть ли фото..."
                      aria-label="Описание задачи"
                    />
                  </label>
                </div>

                <button className="form-row form-row--ghost" type="button">
                  <span className="form-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <rect x="4" y="7" width="16" height="12" rx="3" />
                      <path d="M8 7l2-2h4l2 2" />
                      <circle cx="12" cy="13" r="3" />
                    </svg>
                  </span>
                  <span className="form-row-text">
                    <span className="form-row-title">
                      Добавить фото <span className="form-row-muted">(по желанию)</span>
                    </span>
                  </span>
                  <span className="form-chevron" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </span>
                </button>

                <div className="form-section">
                  <h2 className="form-section-title">Бюджет</h2>
                  <div className="form-card form-card--tight">
                    <div className="chip-row" role="group" aria-label="Тип бюджета">
                      <button className="chip chip--active" type="button">
                        До ₽
                      </button>
                      <button className="chip" type="button">
                        Диапазон
                      </button>
                    </div>
                    <div className="budget-inputs">
                      <label className="budget-field">
                        <span className="budget-currency">RUB</span>
                        <input type="text" placeholder="от" aria-label="Бюджет от" />
                      </label>
                      <label className="budget-field">
                        <span className="budget-currency">RUB</span>
                        <input type="text" placeholder="до" aria-label="Бюджет до" />
                      </label>
                    </div>
                    <label className="form-check">
                      <input type="checkbox" defaultChecked />
                      <span>На месте договорюсь</span>
                    </label>
                  </div>
                </div>

                <div className="form-section">
                  <h2 className="form-section-title">Где</h2>
                  <button className="form-row" type="button">
                    <span className="form-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 3c3.2 0 5.5 2.2 5.5 5.2 0 3.8-5.5 9.6-5.5 9.6S6.5 12 6.5 8.2C6.5 5.2 8.8 3 12 3z" />
                        <circle cx="12" cy="8.4" r="2.2" />
                      </svg>
                    </span>
                    <span className="form-row-text">
                      <span className="form-row-title">Москва</span>
                      <span className="form-row-sub">район или точный адрес (опц.)</span>
                    </span>
                    <span className="form-chevron" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </span>
                  </button>
                </div>

                <div className="form-section">
                  <h2 className="form-section-title">Когда</h2>
                  <div className="date-tabs" role="group" aria-label="Выбор даты">
                    <button className="date-tab date-tab--active" type="button">
                      Сегодня
                    </button>
                    <button className="date-tab" type="button">
                      Завтра
                    </button>
                    <button className="date-tab" type="button">
                      Выбрать дату/время
                    </button>
                  </div>
                  <label className="form-check form-check--light">
                    <input type="checkbox" defaultChecked />
                    <span>Можно договориться</span>
                  </label>
                </div>

                <div className="submit-stack">
                  <button className="cta-primary" type="button" data-active="true">
                    Опубликовать заявку
                  </button>
                  <button className="cta-secondary" type="button">
                    <span className="cta-secondary-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="6.5" />
                        <path d="M16 16l4.2 4.2" />
                      </svg>
                    </span>
                    <span className="cta-secondary-text">
                      <span className="cta-secondary-title">Найти исполнителя</span>
                      <span className="cta-secondary-sub">Выбрать из списка</span>
                    </span>
                  </button>
                </div>
              </div>
            </section>
          </>
        ) : (
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
                <button
                  className="popular-card"
                  data-tone="dark"
                  type="button"
                  aria-pressed={selectedCategory === "popular-electric"}
                  onClick={() => setSelectedCategory("popular-electric")}
                >
                  <span className="popular-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M13 2 4 13h6l-1 9 11-13h-6z" />
                    </svg>
                  </span>
                  <span>Электрика</span>
                </button>
                <button
                  className="popular-card"
                  data-tone="accent"
                  type="button"
                  aria-pressed={selectedCategory === "popular-plumbing"}
                  onClick={() => setSelectedCategory("popular-plumbing")}
                >
                  <span className="popular-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M6 10h6l-2 10 8-12h-6l2-6z" />
                    </svg>
                  </span>
                  <span>Сантехника</span>
                </button>
                <button
                  className="popular-card"
                  data-tone="charcoal"
                  type="button"
                  aria-pressed={selectedCategory === "popular-cleaning"}
                  onClick={() => setSelectedCategory("popular-cleaning")}
                >
                  <span className="popular-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <circle cx="8" cy="7" r="3" />
                      <path d="M3 20c0-4 3-6 6-6s6 2 6 6" />
                      <path d="M16 12l5 5" />
                    </svg>
                  </span>
                  <span>Уборка и клининг</span>
                </button>
                <button
                  className="popular-card"
                  data-tone="sun"
                  type="button"
                  aria-pressed={selectedCategory === "popular-movers"}
                  onClick={() => setSelectedCategory("popular-movers")}
                >
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
                <button
                  className="category-card"
                  type="button"
                  aria-pressed={selectedCategory === "home"}
                  onClick={() => setSelectedCategory("home")}
                >
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
                <button
                  className="category-card"
                  type="button"
                  aria-pressed={selectedCategory === "furniture"}
                  onClick={() => setSelectedCategory("furniture")}
                >
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
                <button
                  className="category-card"
                  type="button"
                  aria-pressed={selectedCategory === "tech"}
                  onClick={() => setSelectedCategory("tech")}
                >
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
                <button
                  className="category-card"
                  type="button"
                  aria-pressed={selectedCategory === "auto"}
                  onClick={() => setSelectedCategory("auto")}
                >
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
                <button
                  className="category-card"
                  type="button"
                  aria-pressed={selectedCategory === "courier"}
                  onClick={() => setSelectedCategory("courier")}
                >
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
                <button
                  className="category-card"
                  type="button"
                  aria-pressed={selectedCategory === "delivery"}
                  onClick={() => setSelectedCategory("delivery")}
                >
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
              <button
                className="cta-primary"
                type="button"
                data-active={hasCategory}
                disabled={!hasCategory}
                onClick={handleCreate}
              >
                Создать заявку
              </button>
            </div>
          </>
        )
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
