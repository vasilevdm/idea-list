init:
	docker-compose up -d
	docker-compose run --rm app /app/wait-for-it.sh db:5432
	docker-compose exec app composer install --no-interaction
	docker-compose exec app bin/console doctrine:migrations:migrate --no-interaction
	docker-compose exec app bin/console doctrine:migrations:migrate --no-interaction --env=test
	docker-compose exec app bin/console doctrine:fixtures:load --group=HighLoad --no-interaction

tests:
	docker-compose exec app bin/console doctrine:fixtures:load --group=ORM --no-interaction --env=test
	docker-compose exec app bin/phpunit -vvv --testdox

lint-front:
	cd front && npx eslint "src/*"

lint-back:
	docker-compose run --rm app vendor/bin/php-cs-fixer fix
	docker-compose run --rm app vendor/bin/phpstan analyze src --level max -c phpstan.neon

down:
	docker-compose down -v