# Default
default:
  just --list

# Build Docker Image
build-image:
  docker build -t ranckosolutionsinc/budget-tracker:latest . 

# Run Docker Container
run-container:
  docker run -d -p 5354:3000 --network proxy-net --restart always --name budget-tracker ranckosolutionsinc/budget-tracker:latest  

# Stop Docker Container
stop-container:
  docker stop budget-tracker   

# Remove Docker Container
rm-container:
  docker rm budget-tracker   

# Dispose Docker Container
dispose-container:
  just stop-Container
  just rm-container   

# Docker compose 
compose:
  docker compose up -d

# Docker compose down
compose-down:
  docker compose down
