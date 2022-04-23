init:
	docker-compose up -d

tests:
	docker-compose run --rm app bin/phpunit

stan:
	docker-compose run --rm app vendor/bin/phpstan analyze src --level max -c phpstan.neon

csfixer:
	docker-compose run --rm app vendor/bin/php-cs-fixer fix src