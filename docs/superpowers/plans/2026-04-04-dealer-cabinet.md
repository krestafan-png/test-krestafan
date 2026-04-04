# Кабинет дилера ТРЕК — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a multi-page dealer cabinet demo for ТРЕК auto parts company with orders, claims, documents, product catalog, and gamification.

**Architecture:** 6 HTML pages sharing a sidebar injected by `components/shell.js`. All data comes from static JSON files in `data/`. Alpine.js handles interactivity (filters, modals, tabs). Chart.js renders graphs. Tailwind CSS (CDN) for styling. Desktop only.

**Tech Stack:** HTML, Tailwind CSS (CDN), Alpine.js (CDN), Chart.js (CDN), static JSON

---

## File Map

| File | Responsibility |
|------|---------------|
| `components/shell.js` | Injects sidebar + header into every page. Reads `dealers.json` for current dealer info. Highlights active nav item based on current URL. |
| `data/dealers.json` | Dealer profiles, points, levels, achievements, leaderboard |
| `data/orders.json` | Order list with items, statuses, dates, amounts |
| `data/claims.json` | Claims with statuses, comments, timeline |
| `data/docs.json` | Documents with categories, statuses, versions, price changes |
| `data/products.json` | Product catalog with photos, specs, categories |
| `index.html` | Dashboard: KPIs, charts, recommendations, notifications |
| `orders.html` | Orders: table, filters, detail cards, analytics, forecasting |
| `claims.html` | Claims: list, create form, status timeline, comments |
| `docs.html` | Documents: categories, statuses, versioning, price diffs |
| `products.html` | Catalog: product cards, filters, API documentation section |
| `rating.html` | Gamification: levels, points, achievements, leaderboard |

---

### Task 1: JSON Data Files

**Files:**
- Create: `data/dealers.json`
- Create: `data/orders.json`
- Create: `data/claims.json`
- Create: `data/docs.json`
- Create: `data/products.json`

- [ ] **Step 1: Create `data/dealers.json`**

```json
{
  "current": {
    "id": "d001",
    "name": "АвтоМир Групп",
    "type": "distributor",
    "typeLabel": "Дистрибьютор",
    "level": "gold",
    "levelLabel": "Золото",
    "levelIcon": "⭐",
    "points": 2840,
    "nextLevel": "platinum",
    "nextLevelLabel": "Платина",
    "nextLevelPoints": 5000,
    "rank": 4,
    "monthOrders": 47,
    "monthOrdersDelta": 12,
    "monthSum": 2400000,
    "monthSumDelta": 8.3,
    "activeClaims": 3,
    "overdueClaimCount": 1,
    "achievements": [
      { "id": "first_order", "name": "Первый заказ", "icon": "🎯", "earned": true, "date": "2024-03-15" },
      { "id": "hundred_orders", "name": "100 заказов", "icon": "💯", "earned": true, "date": "2025-11-20" },
      { "id": "perfect_quarter", "name": "Безупречный квартал", "icon": "🛡️", "earned": true, "date": "2026-01-01" },
      { "id": "millionaire", "name": "Миллионер", "icon": "💰", "earned": true, "date": "2025-06-10" },
      { "id": "speed", "name": "Скорость", "icon": "⚡", "earned": false, "date": null }
    ],
    "notifications": [
      { "icon": "📦", "text": "Заказ #1042 отгружен", "time": "2 часа назад" },
      { "icon": "📋", "text": "Новый прайс-лист от 01.04.2026", "time": "вчера" },
      { "icon": "🏆", "text": "Вы достигли уровня Золото!", "time": "3 дня назад" },
      { "icon": "⚠️", "text": "Рекламация #R-018 просрочена", "time": "5 дней назад" }
    ]
  },
  "leaderboard": [
    { "rank": 1, "name": "ЗапчастьОпт", "points": 4920, "level": "gold", "levelIcon": "⭐" },
    { "rank": 2, "name": "АвтоЛидер", "points": 4100, "level": "gold", "levelIcon": "⭐" },
    { "rank": 3, "name": "МоторТрейд", "points": 3500, "level": "gold", "levelIcon": "⭐" },
    { "rank": 4, "name": "АвтоМир Групп", "points": 2840, "level": "gold", "levelIcon": "⭐", "current": true },
    { "rank": 5, "name": "ХодовкаПро", "points": 2200, "level": "silver", "levelIcon": "🥈" },
    { "rank": 6, "name": "СТО Мастер", "points": 1800, "level": "silver", "levelIcon": "🥈" },
    { "rank": 7, "name": "Автосервис №1", "points": 1400, "level": "silver", "levelIcon": "🥈" },
    { "rank": 8, "name": "ПодвескаСити", "points": 900, "level": "bronze", "levelIcon": "🥉" },
    { "rank": 9, "name": "СТО Гараж", "points": 650, "level": "bronze", "levelIcon": "🥉" },
    { "rank": 10, "name": "АвтоДок", "points": 320, "level": "bronze", "levelIcon": "🥉" }
  ],
  "levels": [
    { "id": "bronze", "label": "Бронза", "icon": "🥉", "minPoints": 0, "discount": "0%", "perks": "Базовый доступ" },
    { "id": "silver", "label": "Серебро", "icon": "🥈", "minPoints": 1000, "discount": "3%", "perks": "Доп. скидка 3%" },
    { "id": "gold", "label": "Золото", "icon": "⭐", "minPoints": 2500, "discount": "5%", "perks": "Приоритетная отгрузка" },
    { "id": "platinum", "label": "Платина", "icon": "💎", "minPoints": 5000, "discount": "8%", "perks": "Персональный менеджер" },
    { "id": "diamond", "label": "Бриллиант", "icon": "👑", "minPoints": 10000, "discount": "12%", "perks": "VIP условия" }
  ],
  "pointRules": [
    { "action": "Заказ оформлен", "points": 10 },
    { "action": "Оплата вовремя", "points": 20 },
    { "action": "0 рекламаций за месяц", "points": 50 },
    { "action": "Прошёл обучение", "points": 30 },
    { "action": "Объём > 500 тыс. ₽/мес", "points": 100 }
  ]
}
```

- [ ] **Step 2: Create `data/orders.json`**

```json
{
  "orders": [
    {
      "id": "1042", "date": "2026-04-02", "status": "shipped", "statusLabel": "Отгружен",
      "sum": 124500, "manager": "Иванова А.М.",
      "items": [
        { "sku": "TR-2108", "name": "Шаровая опора ТРЕК", "qty": 50, "price": 890, "sum": 44500 },
        { "sku": "TR-4512", "name": "Рулевой наконечник ТРЕК", "qty": 40, "price": 1200, "sum": 48000 },
        { "sku": "TR-7701", "name": "Стойка стабилизатора ТРЕК", "qty": 20, "price": 1600, "sum": 32000 }
      ],
      "timeline": [
        { "status": "Новый", "date": "2026-04-01 09:15" },
        { "status": "Подтверждён", "date": "2026-04-01 11:30" },
        { "status": "В сборке", "date": "2026-04-01 14:00" },
        { "status": "Отгружен", "date": "2026-04-02 10:20" }
      ]
    },
    {
      "id": "1041", "date": "2026-03-30", "status": "delivered", "statusLabel": "Доставлен",
      "sum": 87500, "manager": "Иванова А.М.",
      "items": [
        { "sku": "TR-2108", "name": "Шаровая опора ТРЕК", "qty": 30, "price": 890, "sum": 26700 },
        { "sku": "TR-3305", "name": "Сайлентблок ТРЕК", "qty": 60, "price": 450, "sum": 27000 },
        { "sku": "TR-9920", "name": "Опора амортизатора ТРЕК", "qty": 20, "price": 1690, "sum": 33800 }
      ],
      "timeline": [
        { "status": "Новый", "date": "2026-03-28 08:40" },
        { "status": "Подтверждён", "date": "2026-03-28 10:00" },
        { "status": "В сборке", "date": "2026-03-28 15:30" },
        { "status": "Отгружен", "date": "2026-03-29 09:10" },
        { "status": "Доставлен", "date": "2026-03-30 14:20" }
      ]
    },
    {
      "id": "1040", "date": "2026-03-25", "status": "delivered", "statusLabel": "Доставлен",
      "sum": 231000, "manager": "Петров С.К.",
      "items": [
        { "sku": "TR-7701", "name": "Стойка стабилизатора ТРЕК", "qty": 80, "price": 1600, "sum": 128000 },
        { "sku": "TR-4512", "name": "Рулевой наконечник ТРЕК", "qty": 50, "price": 1200, "sum": 60000 },
        { "sku": "TR-2108", "name": "Шаровая опора ТРЕК", "qty": 20, "price": 890, "sum": 17800 },
        { "sku": "TR-6650", "name": "Рычаг подвески ТРЕК", "qty": 10, "price": 2520, "sum": 25200 }
      ],
      "timeline": [
        { "status": "Новый", "date": "2026-03-23 10:00" },
        { "status": "Подтверждён", "date": "2026-03-23 12:00" },
        { "status": "В сборке", "date": "2026-03-24 08:00" },
        { "status": "Отгружен", "date": "2026-03-24 16:00" },
        { "status": "Доставлен", "date": "2026-03-25 11:00" }
      ]
    },
    {
      "id": "1039", "date": "2026-03-20", "status": "delivered", "statusLabel": "Доставлен",
      "sum": 52000, "manager": "Иванова А.М.",
      "items": [
        { "sku": "TR-3305", "name": "Сайлентблок ТРЕК", "qty": 40, "price": 450, "sum": 18000 },
        { "sku": "TR-9920", "name": "Опора амортизатора ТРЕК", "qty": 10, "price": 1690, "sum": 16900 },
        { "sku": "TR-2108", "name": "Шаровая опора ТРЕК", "qty": 10, "price": 890, "sum": 8900 },
        { "sku": "TR-5580", "name": "Пыльник ШРУСа ТРЕК", "qty": 20, "price": 410, "sum": 8200 }
      ],
      "timeline": [
        { "status": "Новый", "date": "2026-03-19 14:00" },
        { "status": "Подтверждён", "date": "2026-03-19 16:00" },
        { "status": "В сборке", "date": "2026-03-20 08:00" },
        { "status": "Отгружен", "date": "2026-03-20 12:00" },
        { "status": "Доставлен", "date": "2026-03-20 18:00" }
      ]
    },
    {
      "id": "1038", "date": "2026-03-15", "status": "delivered", "statusLabel": "Доставлен",
      "sum": 178000, "manager": "Петров С.К.",
      "items": [
        { "sku": "TR-6650", "name": "Рычаг подвески ТРЕК", "qty": 30, "price": 2520, "sum": 75600 },
        { "sku": "TR-7701", "name": "Стойка стабилизатора ТРЕК", "qty": 40, "price": 1600, "sum": 64000 },
        { "sku": "TR-4512", "name": "Рулевой наконечник ТРЕК", "qty": 32, "price": 1200, "sum": 38400 }
      ],
      "timeline": [
        { "status": "Новый", "date": "2026-03-14 09:00" },
        { "status": "Подтверждён", "date": "2026-03-14 11:30" },
        { "status": "В сборке", "date": "2026-03-14 14:00" },
        { "status": "Отгружен", "date": "2026-03-15 08:30" },
        { "status": "Доставлен", "date": "2026-03-15 16:00" }
      ]
    },
    {
      "id": "1037", "date": "2026-04-03", "status": "assembling", "statusLabel": "В сборке",
      "sum": 95600, "manager": "Иванова А.М.",
      "items": [
        { "sku": "TR-2108", "name": "Шаровая опора ТРЕК", "qty": 60, "price": 890, "sum": 53400 },
        { "sku": "TR-5580", "name": "Пыльник ШРУСа ТРЕК", "qty": 50, "price": 410, "sum": 20500 },
        { "sku": "TR-3305", "name": "Сайлентблок ТРЕК", "qty": 48, "price": 450, "sum": 21600 }
      ],
      "timeline": [
        { "status": "Новый", "date": "2026-04-03 08:00" },
        { "status": "Подтверждён", "date": "2026-04-03 09:30" },
        { "status": "В сборке", "date": "2026-04-03 13:00" }
      ]
    },
    {
      "id": "1036", "date": "2026-04-04", "status": "new", "statusLabel": "Новый",
      "sum": 67200, "manager": "Петров С.К.",
      "items": [
        { "sku": "TR-9920", "name": "Опора амортизатора ТРЕК", "qty": 20, "price": 1690, "sum": 33800 },
        { "sku": "TR-4512", "name": "Рулевой наконечник ТРЕК", "qty": 15, "price": 1200, "sum": 18000 },
        { "sku": "TR-3305", "name": "Сайлентблок ТРЕК", "qty": 20, "price": 450, "sum": 9000 },
        { "sku": "TR-5580", "name": "Пыльник ШРУСа ТРЕК", "qty": 16, "price": 410, "sum": 6560 }
      ],
      "timeline": [
        { "status": "Новый", "date": "2026-04-04 10:15" }
      ]
    }
  ],
  "monthlyStats": [
    { "month": "Ноя", "sum": 1450000 },
    { "month": "Дек", "sum": 1820000 },
    { "month": "Янв", "sum": 2100000 },
    { "month": "Фев", "sum": 1680000 },
    { "month": "Мар", "sum": 2050000 },
    { "month": "Апр", "sum": 2400000 }
  ],
  "topProducts": [
    { "name": "Шаровая опора", "sku": "TR-2108", "qty": 420 },
    { "name": "Стойка стабилизатора", "sku": "TR-7701", "qty": 340 },
    { "name": "Рулевой наконечник", "sku": "TR-4512", "qty": 310 },
    { "name": "Сайлентблок", "sku": "TR-3305", "qty": 280 },
    { "name": "Опора амортизатора", "sku": "TR-9920", "qty": 200 },
    { "name": "Рычаг подвески", "sku": "TR-6650", "qty": 150 },
    { "name": "Пыльник ШРУСа", "sku": "TR-5580", "qty": 130 }
  ],
  "recommendations": [
    { "sku": "TR-2108", "name": "Шаровая опора ТРЕК", "avgMonthly": 70, "daysLeft": 7 },
    { "sku": "TR-4512", "name": "Рулевой наконечник ТРЕК", "avgMonthly": 50, "daysLeft": 14 },
    { "sku": "TR-7701", "name": "Стойка стабилизатора ТРЕК", "avgMonthly": 55, "daysLeft": 10 }
  ],
  "statusFlow": ["Новый", "Подтверждён", "В сборке", "Отгружен", "Доставлен"]
}
```

- [ ] **Step 3: Create `data/claims.json`**

```json
{
  "claims": [
    {
      "id": "R-020", "date": "2026-04-01", "orderId": "1041",
      "sku": "TR-3305", "productName": "Сайлентблок ТРЕК",
      "type": "defect", "typeLabel": "Брак",
      "qty": 5, "batch": "P2026-0312",
      "description": "Резиновая часть отслаивается от металлической втулки после установки. Обнаружено на 5 из 60 единиц в партии.",
      "photos": ["photo1.jpg", "photo2.jpg"],
      "status": "review", "statusLabel": "На рассмотрении",
      "timeline": [
        { "status": "Черновик", "date": "2026-04-01 10:00", "user": "АвтоМир Групп" },
        { "status": "Подана", "date": "2026-04-01 10:15", "user": "АвтоМир Групп" },
        { "status": "На рассмотрении", "date": "2026-04-01 14:30", "user": "Иванова А.М." }
      ],
      "comments": [
        { "user": "АвтоМир Групп", "date": "2026-04-01 10:15", "text": "Прикладываю фото дефектных деталей. Проблема обнаружена на 5 штуках." },
        { "user": "Иванова А.М.", "date": "2026-04-01 14:30", "text": "Принято в работу. Передаю в отдел качества." }
      ]
    },
    {
      "id": "R-019", "date": "2026-03-25", "orderId": "1040",
      "sku": "TR-7701", "productName": "Стойка стабилизатора ТРЕК",
      "type": "mismatch", "typeLabel": "Несоответствие",
      "qty": 3, "batch": "P2026-0298",
      "description": "Получены стойки длиной 285мм вместо заявленных 310мм. Не подходят для установки на Kia Rio.",
      "photos": ["photo3.jpg"],
      "status": "info_requested", "statusLabel": "Запрос доп. информации",
      "timeline": [
        { "status": "Черновик", "date": "2026-03-25 09:00", "user": "АвтоМир Групп" },
        { "status": "Подана", "date": "2026-03-25 09:20", "user": "АвтоМир Групп" },
        { "status": "На рассмотрении", "date": "2026-03-25 15:00", "user": "Петров С.К." },
        { "status": "Запрос доп. информации", "date": "2026-03-26 10:00", "user": "Петров С.К." }
      ],
      "comments": [
        { "user": "АвтоМир Групп", "date": "2026-03-25 09:20", "text": "Длина стоек не соответствует каталогу." },
        { "user": "Петров С.К.", "date": "2026-03-26 10:00", "text": "Пришлите фото маркировки на детали и номер VIN автомобиля." }
      ]
    },
    {
      "id": "R-018", "date": "2026-03-10", "orderId": "1038",
      "sku": "TR-6650", "productName": "Рычаг подвески ТРЕК",
      "type": "damage", "typeLabel": "Повреждение при доставке",
      "qty": 2, "batch": "P2026-0250",
      "description": "Два рычага с деформацией упаковки и вмятинами на кронштейне крепления. Предположительно повреждены при транспортировке.",
      "photos": ["photo4.jpg", "photo5.jpg", "photo6.jpg"],
      "status": "approved", "statusLabel": "Одобрена",
      "timeline": [
        { "status": "Черновик", "date": "2026-03-10 11:00", "user": "АвтоМир Групп" },
        { "status": "Подана", "date": "2026-03-10 11:30", "user": "АвтоМир Групп" },
        { "status": "На рассмотрении", "date": "2026-03-10 16:00", "user": "Иванова А.М." },
        { "status": "Одобрена", "date": "2026-03-12 09:00", "user": "Иванова А.М." }
      ],
      "comments": [
        { "user": "АвтоМир Групп", "date": "2026-03-10 11:30", "text": "Повреждения при доставке, фото прилагаю." },
        { "user": "Иванова А.М.", "date": "2026-03-12 09:00", "text": "Рекламация одобрена. Замена будет включена в следующую отгрузку." }
      ]
    }
  ],
  "statusFlow": ["Черновик", "Подана", "На рассмотрении", "Запрос доп. информации", "Одобрена", "Отклонена", "Возврат/Замена", "Закрыта"],
  "types": [
    { "id": "defect", "label": "Брак" },
    { "id": "mismatch", "label": "Несоответствие" },
    { "id": "damage", "label": "Повреждение при доставке" },
    { "id": "other", "label": "Другое" }
  ]
}
```

- [ ] **Step 4: Create `data/docs.json`**

```json
{
  "documents": [
    {
      "id": "DOC-001", "name": "Дилерский договор №142/2024", "category": "contract", "categoryLabel": "Договор",
      "status": "signed", "statusLabel": "Подписан",
      "date": "2024-01-15", "expiresAt": "2026-12-31",
      "versions": [
        { "version": "1.0", "date": "2024-01-15", "author": "Юр. отдел ТРЕК", "note": "Первоначальная версия" },
        { "version": "1.1", "date": "2025-01-10", "author": "Юр. отдел ТРЕК", "note": "Обновлены условия оплаты" }
      ]
    },
    {
      "id": "DOC-002", "name": "Доп. соглашение о скидках", "category": "contract", "categoryLabel": "Договор",
      "status": "pending_sign", "statusLabel": "На подпись",
      "date": "2026-03-28", "expiresAt": null,
      "versions": [
        { "version": "1.0", "date": "2026-03-28", "author": "Коммерческий отдел", "note": "Новые условия на Q2 2026" }
      ]
    },
    {
      "id": "DOC-003", "name": "Прайс-лист апрель 2026", "category": "price", "categoryLabel": "Прайс-лист",
      "status": "active", "statusLabel": "Актуален", "isNew": true,
      "date": "2026-04-01", "expiresAt": "2026-04-30",
      "priceChanges": [
        { "sku": "TR-2108", "name": "Шаровая опора", "oldPrice": 850, "newPrice": 890, "direction": "up" },
        { "sku": "TR-7701", "name": "Стойка стабилизатора", "oldPrice": 1600, "newPrice": 1600, "direction": "same" },
        { "sku": "TR-4512", "name": "Рулевой наконечник", "oldPrice": 1250, "newPrice": 1200, "direction": "down" },
        { "sku": "TR-6650", "name": "Рычаг подвески", "oldPrice": 2400, "newPrice": 2520, "direction": "up" },
        { "sku": "TR-3305", "name": "Сайлентблок", "oldPrice": 450, "newPrice": 450, "direction": "same" }
      ],
      "versions": [
        { "version": "1.0", "date": "2026-04-01", "author": "Коммерческий отдел", "note": "Прайс на апрель 2026" }
      ]
    },
    {
      "id": "DOC-004", "name": "Прайс-лист март 2026", "category": "price", "categoryLabel": "Прайс-лист",
      "status": "archive", "statusLabel": "Архив",
      "date": "2026-03-01", "expiresAt": "2026-03-31",
      "versions": [
        { "version": "1.0", "date": "2026-03-01", "author": "Коммерческий отдел", "note": "Прайс на март 2026" }
      ]
    },
    {
      "id": "DOC-005", "name": "Сертификат соответствия ГОСТ", "category": "certificate", "categoryLabel": "Сертификат",
      "status": "signed", "statusLabel": "Действует",
      "date": "2025-06-01", "expiresAt": "2026-06-01",
      "versions": [
        { "version": "1.0", "date": "2025-06-01", "author": "Отдел качества ТРЕК", "note": "Сертификат ГОСТ Р" }
      ]
    },
    {
      "id": "DOC-006", "name": "Акт сверки за Q1 2026", "category": "act", "categoryLabel": "Акт",
      "status": "pending_approval", "statusLabel": "На согласовании",
      "date": "2026-04-02", "expiresAt": null,
      "versions": [
        { "version": "1.0", "date": "2026-04-02", "author": "Бухгалтерия ТРЕК", "note": "Сверка за январь-март 2026" }
      ]
    },
    {
      "id": "DOC-007", "name": "Договор поставки истекает", "category": "contract", "categoryLabel": "Договор",
      "status": "expiring", "statusLabel": "Истекает",
      "date": "2023-05-01", "expiresAt": "2026-04-18",
      "versions": [
        { "version": "1.0", "date": "2023-05-01", "author": "Юр. отдел ТРЕК", "note": "Договор на доп. ассортимент" }
      ]
    }
  ],
  "categories": [
    { "id": "contract", "label": "Договора" },
    { "id": "price", "label": "Прайс-листы" },
    { "id": "certificate", "label": "Сертификаты" },
    { "id": "act", "label": "Акты" },
    { "id": "invoice", "label": "Счета-фактуры" }
  ]
}
```

- [ ] **Step 5: Create `data/products.json`**

```json
{
  "products": [
    {
      "sku": "TR-2108", "name": "Шаровая опора ТРЕК", "category": "ball_joint",
      "price": 890, "inStock": true, "stockQty": 1250,
      "photo": "https://placehold.co/400x300/1e293b/5dcaa5?text=TR-2108",
      "description": "Шаровая опора для автомобилей ВАЗ 2108-2115, Калина, Гранта. Усиленная конструкция с полимерным вкладышем.",
      "specs": [
        { "name": "Применяемость", "value": "ВАЗ 2108-2115, Калина, Гранта" },
        { "name": "Материал корпуса", "value": "Сталь 40Х" },
        { "name": "Материал пальца", "value": "Сталь 40Х, закалка HRC 58-62" },
        { "name": "Вкладыш", "value": "Полиацеталь (POM)" },
        { "name": "Ресурс", "value": "60 000 км" },
        { "name": "Гарантия", "value": "12 мес." }
      ]
    },
    {
      "sku": "TR-4512", "name": "Рулевой наконечник ТРЕК", "category": "tie_rod",
      "price": 1200, "inStock": true, "stockQty": 840,
      "photo": "https://placehold.co/400x300/1e293b/818cf8?text=TR-4512",
      "description": "Рулевой наконечник для ВАЗ 2110-2112, Приора, Калина. Шаровой палец с антикоррозийным покрытием.",
      "specs": [
        { "name": "Применяемость", "value": "ВАЗ 2110-2112, Приора, Калина" },
        { "name": "Материал", "value": "Сталь 35, цинковое покрытие" },
        { "name": "Конус пальца", "value": "М12×1.25" },
        { "name": "Ресурс", "value": "50 000 км" },
        { "name": "Гарантия", "value": "12 мес." }
      ]
    },
    {
      "sku": "TR-7701", "name": "Стойка стабилизатора ТРЕК", "category": "stabilizer",
      "price": 1600, "inStock": true, "stockQty": 620,
      "photo": "https://placehold.co/400x300/1e293b/f59e0b?text=TR-7701",
      "description": "Стойка стабилизатора поперечной устойчивости для Kia Rio III-IV, Hyundai Solaris. Шарниры с пластиковыми вкладышами.",
      "specs": [
        { "name": "Применяемость", "value": "Kia Rio III-IV, Hyundai Solaris" },
        { "name": "Длина", "value": "310 мм" },
        { "name": "Резьба", "value": "М10×1.25" },
        { "name": "Ресурс", "value": "40 000 км" },
        { "name": "Гарантия", "value": "12 мес." }
      ]
    },
    {
      "sku": "TR-6650", "name": "Рычаг подвески ТРЕК", "category": "control_arm",
      "price": 2520, "inStock": true, "stockQty": 280,
      "photo": "https://placehold.co/400x300/1e293b/ef4444?text=TR-6650",
      "description": "Рычаг передней подвески нижний для Renault Logan, Sandero, Largus. Стальной штампованный, с впрессованным сайлентблоком.",
      "specs": [
        { "name": "Применяемость", "value": "Renault Logan I-II, Sandero, Largus" },
        { "name": "Сторона", "value": "Левый / Правый" },
        { "name": "Материал", "value": "Сталь, порошковое покрытие" },
        { "name": "Ресурс", "value": "80 000 км" },
        { "name": "Гарантия", "value": "12 мес." }
      ]
    },
    {
      "sku": "TR-3305", "name": "Сайлентблок ТРЕК", "category": "bushing",
      "price": 450, "inStock": true, "stockQty": 2100,
      "photo": "https://placehold.co/400x300/1e293b/34d399?text=TR-3305",
      "description": "Сайлентблок рычага передней подвески для ВАЗ 2108-2115. Резинометаллический, повышенной износостойкости.",
      "specs": [
        { "name": "Применяемость", "value": "ВАЗ 2108-2115, Калина, Приора" },
        { "name": "Наружный диаметр", "value": "38 мм" },
        { "name": "Внутренний диаметр", "value": "12 мм" },
        { "name": "Материал", "value": "Резина НК, сталь" },
        { "name": "Ресурс", "value": "50 000 км" },
        { "name": "Гарантия", "value": "12 мес." }
      ]
    },
    {
      "sku": "TR-9920", "name": "Опора амортизатора ТРЕК", "category": "mount",
      "price": 1690, "inStock": false, "stockQty": 0,
      "photo": "https://placehold.co/400x300/1e293b/a78bfa?text=TR-9920",
      "description": "Верхняя опора стойки амортизатора для ВАЗ 2110-2112, Приора. С подшипником, усиленная.",
      "specs": [
        { "name": "Применяемость", "value": "ВАЗ 2110-2112, Приора" },
        { "name": "Подшипник", "value": "Интегрированный, закрытого типа" },
        { "name": "Материал", "value": "Полиуретан + сталь" },
        { "name": "Ресурс", "value": "70 000 км" },
        { "name": "Гарантия", "value": "12 мес." }
      ]
    },
    {
      "sku": "TR-5580", "name": "Пыльник ШРУСа ТРЕК", "category": "boot",
      "price": 410, "inStock": true, "stockQty": 1800,
      "photo": "https://placehold.co/400x300/1e293b/fbbf24?text=TR-5580",
      "description": "Пыльник наружного ШРУСа для ВАЗ 2108-2115. Термопластичный полиуретан, морозостойкий до -50°C.",
      "specs": [
        { "name": "Применяемость", "value": "ВАЗ 2108-2115" },
        { "name": "Материал", "value": "TPU (термопластичный полиуретан)" },
        { "name": "Температурный диапазон", "value": "-50°C ... +130°C" },
        { "name": "В комплекте", "value": "Пыльник, 2 хомута, смазка" },
        { "name": "Гарантия", "value": "12 мес." }
      ]
    }
  ],
  "categories": [
    { "id": "ball_joint", "label": "Шаровые опоры" },
    { "id": "tie_rod", "label": "Рулевые наконечники" },
    { "id": "stabilizer", "label": "Стойки стабилизатора" },
    { "id": "control_arm", "label": "Рычаги подвески" },
    { "id": "bushing", "label": "Сайлентблоки" },
    { "id": "mount", "label": "Опоры амортизаторов" },
    { "id": "boot", "label": "Пыльники" }
  ]
}
```

- [ ] **Step 6: Commit data files**

```bash
git add data/
git commit -m "feat: add mock JSON data for all modules"
```

---

### Task 2: Shell Component (Sidebar + Header)

**Files:**
- Create: `components/shell.js`

- [ ] **Step 1: Create `components/shell.js`**

This file injects the sidebar and header into any page that includes it. It fetches `dealers.json` for current dealer info and highlights the active nav item.

```javascript
(function() {
  var NAV = [
    { href: 'index.html', icon: '📊', label: 'Дашборд' },
    { href: 'orders.html', icon: '📦', label: 'Заказы' },
    { href: 'claims.html', icon: '⚠️', label: 'Рекламации', badgeKey: 'activeClaims' },
    { href: 'docs.html', icon: '📄', label: 'Документы', badgeKey: 'pendingDocs' },
    { href: 'products.html', icon: '🔧', label: 'Каталог' },
    { href: 'rating.html', icon: '🏆', label: 'Рейтинг' }
  ];

  function getActivePage() {
    var path = window.location.pathname;
    var page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    return page;
  }

  function buildShell(dealer) {
    var activePage = getActivePage();
    var notifCount = dealer.notifications ? dealer.notifications.length : 0;
    var pendingDocs = 2; // mock count

    var sidebar = document.createElement('aside');
    sidebar.id = 'shell-sidebar';
    sidebar.style.cssText = 'width:240px;min-height:100vh;background:#0b1120;border-right:1px solid #1e293b;padding:0;position:fixed;top:0;left:0;z-index:40;display:flex;flex-direction:column;';

    var logoHtml = '<div style="padding:20px 20px 16px;border-bottom:1px solid #1e293b">'
      + '<div style="color:#5dcaa5;font-weight:700;font-size:18px;letter-spacing:3px">ТРЕК</div>'
      + '<div style="font-size:11px;color:#475569;margin-top:2px">Кабинет дилера</div>'
      + '</div>';

    var dealerHtml = '<div style="padding:16px 20px;border-bottom:1px solid #1e293b">'
      + '<div style="font-size:13px;color:#e2e8f0;font-weight:600">' + dealer.name + '</div>'
      + '<div style="font-size:11px;color:#5dcaa5;margin-top:2px">' + dealer.typeLabel + ' · ' + dealer.levelIcon + ' ' + dealer.levelLabel + '</div>'
      + '<div style="font-size:10px;color:#64748b;margin-top:4px">' + dealer.points.toLocaleString('ru-RU') + ' баллов · #' + dealer.rank + ' в рейтинге</div>'
      + '</div>';

    var navHtml = '<nav style="padding:12px 10px;flex:1">';
    for (var i = 0; i < NAV.length; i++) {
      var item = NAV[i];
      var isActive = activePage === item.href || (activePage === '' && item.href === 'index.html');
      var badge = '';
      if (item.badgeKey === 'activeClaims' && dealer.activeClaims > 0) {
        badge = '<span style="background:#ef4444;color:#fff;font-size:9px;padding:1px 6px;border-radius:10px;margin-left:auto">' + dealer.activeClaims + '</span>';
      }
      if (item.badgeKey === 'pendingDocs' && pendingDocs > 0) {
        badge = '<span style="background:#f59e0b;color:#000;font-size:9px;padding:1px 6px;border-radius:10px;margin-left:auto">' + pendingDocs + '</span>';
      }
      var style = isActive
        ? 'display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;background:rgba(93,202,165,0.12);color:#5dcaa5;font-size:13px;font-weight:500;margin-bottom:2px;text-decoration:none;'
        : 'display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;color:#64748b;font-size:13px;margin-bottom:2px;text-decoration:none;transition:background 0.15s;';
      navHtml += '<a href="' + item.href + '" style="' + style + '"'
        + (!isActive ? ' onmouseover="this.style.background=\'rgba(255,255,255,0.04)\'" onmouseout="this.style.background=\'transparent\'"' : '')
        + '><span style="font-size:16px;width:20px;text-align:center">' + item.icon + '</span><span>' + item.label + '</span>' + badge + '</a>';
    }
    navHtml += '</nav>';

    sidebar.innerHTML = logoHtml + dealerHtml + navHtml;

    // Header bar
    var header = document.createElement('header');
    header.id = 'shell-header';
    header.style.cssText = 'position:fixed;top:0;left:240px;right:0;height:56px;background:#0f172a;border-bottom:1px solid #1e293b;display:flex;align-items:center;justify-content:space-between;padding:0 24px;z-index:30;';

    var pageTitle = '';
    for (var j = 0; j < NAV.length; j++) {
      if (activePage === NAV[j].href || (activePage === '' && NAV[j].href === 'index.html')) {
        pageTitle = NAV[j].label;
        break;
      }
    }

    header.innerHTML = '<div style="font-size:16px;font-weight:600;color:#e2e8f0">' + pageTitle + '</div>'
      + '<div style="display:flex;align-items:center;gap:12px">'
      + '<button onclick="document.getElementById(\'notifPanel\').style.display=document.getElementById(\'notifPanel\').style.display===\'block\'?\'none\':\'block\'" style="position:relative;background:#1e293b;border:1px solid #334155;border-radius:8px;padding:8px 12px;color:#94a3b8;cursor:pointer;font-size:14px">🔔'
      + (notifCount > 0 ? '<span style="position:absolute;top:-4px;right:-4px;background:#ef4444;color:#fff;font-size:9px;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center">' + notifCount + '</span>' : '')
      + '</button>'
      + '<div style="font-size:12px;color:#64748b">' + dealer.name + '</div>'
      + '</div>';

    // Notification panel
    var notifPanel = document.createElement('div');
    notifPanel.id = 'notifPanel';
    notifPanel.style.cssText = 'display:none;position:fixed;top:56px;right:24px;width:340px;background:#1e293b;border:1px solid #334155;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.4);z-index:50;padding:16px;';
    var notifHtml = '<div style="font-size:12px;color:#64748b;margin-bottom:10px">Уведомления</div>';
    if (dealer.notifications) {
      for (var n = 0; n < dealer.notifications.length; n++) {
        var notif = dealer.notifications[n];
        notifHtml += '<div style="display:flex;align-items:center;gap:10px;padding:8px;background:#0f172a;border-radius:8px;margin-bottom:6px">'
          + '<span style="font-size:16px">' + notif.icon + '</span>'
          + '<div><div style="font-size:12px;color:#e2e8f0">' + notif.text + '</div><div style="font-size:10px;color:#475569">' + notif.time + '</div></div>'
          + '</div>';
      }
    }
    notifPanel.innerHTML = notifHtml;

    // Content wrapper
    var content = document.createElement('div');
    content.id = 'shell-content';
    content.style.cssText = 'margin-left:240px;margin-top:56px;padding:24px;min-height:calc(100vh - 56px);';

    // Move existing body content into wrapper
    while (document.body.children.length > 0) {
      var child = document.body.children[0];
      if (child.tagName === 'SCRIPT') break;
      content.appendChild(child);
    }

    document.body.insertBefore(sidebar, document.body.firstChild);
    document.body.insertBefore(header, sidebar.nextSibling);
    document.body.insertBefore(notifPanel, header.nextSibling);
    document.body.insertBefore(content, notifPanel.nextSibling);
  }

  // Load dealer data and build shell
  fetch('data/dealers.json')
    .then(function(r) { return r.json(); })
    .then(function(data) { buildShell(data.current); })
    .catch(function(err) {
      console.error('Shell: failed to load dealer data', err);
      buildShell({ name: 'Дилер', typeLabel: 'Партнёр', levelLabel: 'Бронза', levelIcon: '🥉', points: 0, rank: '-', activeClaims: 0, notifications: [] });
    });
})();
```

- [ ] **Step 2: Verify shell loads by opening any page with it included**

Every HTML page will include at the bottom of `<body>`:
```html
<script src="components/shell.js"></script>
```

- [ ] **Step 3: Commit**

```bash
git add components/
git commit -m "feat: add shell component (sidebar + header)"
```

---

### Task 3: Dashboard Page (index.html)

**Files:**
- Rewrite: `index.html`

- [ ] **Step 1: Create `index.html`**

Complete dashboard page with KPI cards, charts, recommendations, quick actions, and notification feed. Uses Alpine.js for data loading, Chart.js for graphs. Shell.js injects sidebar.

The page body contains:
1. KPI cards row (4 cards with animated counters)
2. Two-column layout: left = purchase dynamics chart (Chart.js line) + top products chart (Chart.js horizontal bar), right = recommendations + quick actions
3. Notification feed at bottom

All data loaded from `data/orders.json` and `data/dealers.json` via `fetch()` in Alpine.js `x-init`.

- [ ] **Step 2: Verify locally**

Open `index.html` in browser. Should see sidebar + header + full dashboard. Charts should render, data should load from JSON.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add dashboard page with KPIs, charts, recommendations"
```

---

### Task 4: Orders Page (orders.html)

**Files:**
- Create: `orders.html`

- [ ] **Step 1: Create `orders.html`**

Page with:
1. Filter bar (status dropdown, date range, search by article/number) — Alpine.js `x-model` bound
2. Orders table — columns: #, date, summary, sum, status badge, action button
3. Expandable order detail (click row → Alpine.js `x-show` toggle): items table, timeline, documents
4. Analytics tab: monthly purchases chart (Chart.js), period comparison, top products bar chart
5. Forecasting section: "Recommend reorder in N days" cards

Status badges color-coded: new=indigo, confirmed=blue, assembling=amber, shipped=cyan, delivered=green.

- [ ] **Step 2: Verify locally**

Open `orders.html`. Filters should work, rows should expand, charts should render.

- [ ] **Step 3: Commit**

```bash
git add orders.html
git commit -m "feat: add orders page with filters, details, analytics"
```

---

### Task 5: Claims Page (claims.html)

**Files:**
- Create: `claims.html`

- [ ] **Step 1: Create `claims.html`**

Page with:
1. Filter bar (status, date, product type)
2. Claims table: #, date, product, type, status badge
3. "New claim" button → opens modal form with: order select, product, type, description textarea, drag&drop zone (visual only — no real upload in demo), qty, batch number
4. Expandable claim detail: status timeline (vertical with dots and lines), comments thread, attached files list
5. Status badges: draft=gray, submitted=indigo, review=amber, info_requested=orange, approved=green, rejected=red, replacement=cyan, closed=slate

- [ ] **Step 2: Verify locally**

Open `claims.html`. Filter, expand detail, open new claim modal.

- [ ] **Step 3: Commit**

```bash
git add claims.html
git commit -m "feat: add claims page with form, timeline, comments"
```

---

### Task 6: Documents Page (docs.html)

**Files:**
- Create: `docs.html`

- [ ] **Step 1: Create `docs.html`**

Page with:
1. Category tabs (All, Contracts, Price lists, Certificates, Acts, Invoices) — Alpine.js tabs
2. Documents table: name, category, status badge, date, expiry, actions (download, view versions)
3. Status badges: pending_sign=amber, pending_approval=orange, signed=green, expiring=red, archive=slate, active=cyan
4. Expandable version history (click row): table of versions with date, author, note
5. Price list special view: when a price-list doc is expanded, show price changes table with ↑/↓/= indicators and color coding (red for up, green for down, gray for same)
6. Alert banner for expiring documents at top

- [ ] **Step 2: Verify locally**

Open `docs.html`. Tabs filter, version history expands, price changes render.

- [ ] **Step 3: Commit**

```bash
git add docs.html
git commit -m "feat: add documents page with versioning and price diffs"
```

---

### Task 7: Products Page (products.html)

**Files:**
- Create: `products.html`

- [ ] **Step 1: Create `products.html`**

Page with:
1. Category filter buttons (All + each category) — Alpine.js
2. Product grid (3 columns): card with photo placeholder, name, SKU, price, stock badge (in stock = green, out = red)
3. Expandable product detail (click card): full description, specs table, order button
4. API Documentation section at bottom:
   - Endpoint examples: `GET /api/products`, `GET /api/products/TR-2108`
   - JSON response example (formatted with syntax highlighting via `<pre>` styled with Tailwind)
   - "Copy URL" button with clipboard API
   - Data format description

- [ ] **Step 2: Verify locally**

Open `products.html`. Category filters work, cards expand, API section renders, copy button copies.

- [ ] **Step 3: Commit**

```bash
git add products.html
git commit -m "feat: add products catalog with API documentation"
```

---

### Task 8: Rating Page (rating.html)

**Files:**
- Create: `rating.html`

- [ ] **Step 1: Create `rating.html`**

Page with:
1. Current level card: large icon, level name, points, progress bar to next level (width = percentage), "N points to next level" text
2. Achievements grid (2 rows × 3 cols): each achievement = icon + name + date earned (or "locked" with opacity). Earned ones glow, locked ones are muted.
3. Points rules table: action, points awarded — styled as a clean info table
4. Leaderboard table: rank, dealer name, points, level icon. Current dealer row highlighted with accent background. Top 3 have gold/silver/bronze styling.
5. Level benefits section: cards for each level showing perks (discount, priority shipping, personal manager)

- [ ] **Step 2: Verify locally**

Open `rating.html`. Progress bar correct, achievements display, leaderboard highlights current dealer.

- [ ] **Step 3: Commit**

```bash
git add rating.html
git commit -m "feat: add gamification page with levels, achievements, leaderboard"
```

---

### Task 9: Deploy and Verify

**Files:**
- Modify: `.github/workflows/pages.yml` (already exists, should work as-is)

- [ ] **Step 1: Push all changes**

```bash
git push
```

- [ ] **Step 2: Wait for GitHub Actions deploy (~30 sec)**

Check: `gh run list --repo krestafan-png/test-krestafan --limit 1`
Expected: `completed success`

- [ ] **Step 3: Verify on live site**

Open `https://krestafan-png.github.io/test-krestafan/`
Check all 6 pages load, sidebar works, data renders, charts display.

- [ ] **Step 4: Commit any fixes if needed**
