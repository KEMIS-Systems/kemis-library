# KEMIS ERP`s Backedn

## Build Setup

```bash

# Enter to folder docker
$ cd docker

# Create containers
$ docker-compose up -d --build

# Copy file .env.exemple to .env
$ cp .env.example .env

# install libraries
$ composer install

# shell
$ docker exec -it erp_php /bin/sh

# Key generate
$ php artisan key:generate

# Generate key to auth
$ php artisan jwt:secret

# Change file .env with params DB
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

# create data tables
$ php artisan migrate --seed

```

## Run serve

```bash

# run server
$ php artisan serve

```

## Author

Wellington Machado
