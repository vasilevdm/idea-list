
# Приложение со списком идей
## Описание
Фронт на React+Redux, бэк на Symfony. Docker-compose для локальной разработки.

## Требования
- docker engine 17+
- docker-compose
- Makefile

## Порядок запуска
`make prod` - запуск в прод режиме - сервисы из docker-compose.yml + docker-compose.prod.yml: билд фронта и бека, запуск сервисов, загрузка миграций

`make init` - запуск в дев режиме - сервисы из docker-compose.yml, установка зависимостей, миграции, загрузка миграций (пару минут)

Приложение, по-умолчанию, использует `88` порт. Пример: http://localhost:88/?page=1

### Другие команды
`make tests` - Запуск тестов `phpunit`

`make lint-back` - Фикс стиля кода `cs-fixer` и статический анализ `phpstan`

`make lint-front` - Запуск `eslint`