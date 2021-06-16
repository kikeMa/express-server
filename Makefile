.PHONY = default deps build test start-mooc-backend clean start-database start-backoffice-frontend

# Shell to use for running scripts
SHELL := $(shell which bash)
IMAGE_NAME := app-planetdataset
APP_NAME := backend-planetdataset

# Test if the dependencies we need to run this Makefile are installed
DOCKER := $(shell command -v docker)
DOCKER_COMPOSE := $(shell command -v docker-compose)
deps:
ifndef DOCKER
	@echo "Docker is not available. Please install docker"
	@exit 1
endif
ifndef DOCKER_COMPOSE
	@echo "docker-compose is not available. Please install docker-compose"
	@exit 1
endif

default: build

# Build image
build:
	docker build -t $(IMAGE_NAME):dev .

# Run tests
test: build
	docker-compose run --rm $(APP_NAME) bash -c 'npm run build && npm run test'

# Start mooc backend app
run: build
	docker-compose up $(APP_NAME) && docker-compose down

# Clean containers
clean:
	docker-compose down --rmi local --volumes --remove-orphans

# Start databases containers in background
start_database:
	docker-compose up -d mongo
