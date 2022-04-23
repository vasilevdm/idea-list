# Приложение со списком идей
## Описание
Фронт на React, бэк на Symfony. Docker-compose для локальной разработки.

## Требования
- docker engine 17+
- docker-compose
- Makefile

## Порядок запуска
`make init` - запуск сервисов, описанных в docker-compose и установка зависимостей

Приложение, по-умолчанию, использует `88` порт

### Другие команды
`make tests` - Запуск тестов `phpunit`

`make stan` - Статический анализ `phpstan`

`make csfixer` - Фикс стиля кода `cs-fixer`