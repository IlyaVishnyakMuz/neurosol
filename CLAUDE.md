# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # запуск dev-сервера с hot-reload (gulp default task)
gulp sass          # компиляция только SCSS
gulp nunjucks      # компиляция только HTML-шаблонов
gulp libs          # пересборка libs.css + libs.js из node_modules
gulp build         # продакшн-сборка в PUBLIC/
gulp imagemin      # оптимизация изображений → PUBLIC/img/
gulp clearcache    # очистить gulp-cache
```

Dev-сервер отдаёт файлы из `DEV/ready/`.  
Продакшн-выход — `PUBLIC/`.

## Architecture

Это статический сайт на **Gulp 4 + Nunjucks + SCSS**, без фреймворков.

### Директории

| Путь | Назначение |
|---|---|
| `DEV/` | исходники |
| `DEV/*.html` | страницы (точки входа Nunjucks) |
| `DEV/includes/blocks/` | блоки-секции страниц |
| `DEV/includes/templates/` | `head.html` и `footer.html` — обёртка страниц |
| `DEV/sass/` | SCSS-исходники |
| `DEV/sass/preset/` | глобальные переменные, миксины, шрифты, reset/default |
| `DEV/sass/blocks/` | стили для каждого блока |
| `DEV/ready/` | скомпилированный dev-вывод (не коммитить) |
| `PUBLIC/` | продакшн-вывод (не коммитить) |

### Шаблонизатор (Nunjucks)

Каждая страница (`DEV/index.html`) задаёт переменные `{% set title %}` и `{% set bodyClass %}`, затем подключает `includes/templates/head.html` → блоки → `includes/templates/footer.html`. Корень поиска шаблонов — `DEV/`.

### SCSS-конвенции

- SCSS-переменные (`$var`) для всей цветовой палитры объявлены в `preset/default.scss`.
- CSS-переменные (`--var`) для размеров, отступов и прочего заданы в `preset/var.scss`.
- Responsive-миксины: `@include md1` (≤1200), `md2` (≤992), `md3` (≤768), `md4` (≤480).
- Типографические миксины: `@include h1..h4`, `b1..b6` — используй их вместо хардкода размеров.
- Flex-миксины: `flex`, `flexcnt`, `flexcntb`, `flexb`, `flexcolcnt`, `flexcol`.
- Контейнер: `.container` (max-width `--container-width` = 1340px + 60px padding).

### JS-библиотеки

Gulp собирает `libs.js` из node_modules в таком порядке: jQuery → FancyBox → Swiper → swiped-events → GSAP → ScrollTrigger → jquery-mask-plugin. Собственный JS пишется в `DEV/ready/js/main.js` (не собирается Gulp — файл редактируется напрямую).
