import { useEffect, useMemo, useState } from "react";
import "./App.css";
import electricalIcon from "./assets/icons/electrical.webp";
import plumbingIcon from "./assets/icons/plumbing.webp";
import cleaningIcon from "./assets/icons/cleaning.webp";
import moversIcon from "./assets/icons/movers.webp";
import homeIcon from "./assets/icons/home.webp";
import furnitureIcon from "./assets/icons/furniture.webp";
import techIcon from "./assets/icons/tech.webp";
import autoServicesIcon from "./assets/icons/auto-services.webp";
import couriersIcon from "./assets/icons/couriers.webp";
import deliveryIcon from "./assets/icons/delivery.webp";
import requestsIcon from "./assets/icons/requests.webp";
import chatsIcon from "./assets/icons/chats.webp";
import profileIcon from "./assets/icons/profile.webp";

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

const CATEGORY_ICONS: Record<string, string> = {
  home: homeIcon,
  furniture: furnitureIcon,
  tech: techIcon,
  auto: autoServicesIcon,
  courier: couriersIcon,
  delivery: deliveryIcon,
  "popular-electric": electricalIcon,
  "popular-plumbing": plumbingIcon,
  "popular-cleaning": cleaningIcon,
  "popular-movers": moversIcon,
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
  const selectedIcon = selectedCategory ? CATEGORY_ICONS[selectedCategory] : null;

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
                    {selectedIcon ? (
                      <img src={selectedIcon} alt="" />
                    ) : (
                      <svg viewBox="0 0 24 24">
                        <path d="M3 12l7-7h7v7l-7 7-7-7z" />
                        <circle cx="14" cy="7" r="1.6" />
                      </svg>
                    )}
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
                    <img src={CATEGORY_ICONS["popular-electric"]} alt="" />
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
                    <img src={CATEGORY_ICONS["popular-plumbing"]} alt="" />
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
                    <img src={CATEGORY_ICONS["popular-cleaning"]} alt="" />
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
                    <img src={CATEGORY_ICONS["popular-movers"]} alt="" />
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
                    <img src={CATEGORY_ICONS.home} alt="" />
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
                    <img src={CATEGORY_ICONS.furniture} alt="" />
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
                    <img src={CATEGORY_ICONS.tech} alt="" />
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
                    <img src={CATEGORY_ICONS.auto} alt="" />
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
                    <img src={CATEGORY_ICONS.courier} alt="" />
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
                    <img src={CATEGORY_ICONS.delivery} alt="" />
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
            <img src={requestsIcon} alt="" aria-hidden="true" />
            <span>Заявки</span>
          </button>
          <button className="nav-item" type="button">
            <img src={chatsIcon} alt="" aria-hidden="true" />
            <span>Чаты</span>
          </button>
          <button className="nav-item" type="button">
            <img src={profileIcon} alt="" aria-hidden="true" />
            <span>Профиль</span>
          </button>
        </nav>
      </footer>
    </div>
  );
}

export default App;
