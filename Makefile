# Default command (Runs the project with Docker Compose in detached mode)
default: up-detach

# Build and start the project with Docker Compose in detached mode
up-detach:
	docker compose up --build -d

# Build and start the project with Docker Compose in foreground mode (shows logs)
up:
	docker compose up --build

# Stop running containers
stop:
	docker compose down

# Remove containers and associated volumes (Resets the database)
clean:
	docker compose down -v

# Remove all images, containers, volumes, and networks (Full Cleanup)
fclean:
	docker system prune -a --volumes -f

# Restart the project in detached mode
restart-detach: stop up-detach

# Restart the project in foreground mode
restart: stop up

# Run Prisma migrations inside the backend container
migrate:
	docker-compose exec backend npx prisma migrate dev --name "update"

# Show running containers
status:
	docker ps

# Show logs for running containers
logs:
	docker-compose logs -f

.PHONY: up up-detach stop clean fclean restart restart-detach migrate status logs
