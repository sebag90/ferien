default:
    @just --list

# Serve the site in the foreground on http://localhost:8080 (edit + reload)
dev:
    podman run --rm -it --name ferien-dev \
        -p 8080:80 \
        -v ./:/public:ro,z \
        ghcr.io/static-web-server/static-web-server:latest

# Build the image and start it detached on http://localhost:8080
up:
    podman build -t ferien:site .
    -podman rm -f ferien
    podman run -d --rm --name ferien -p 8080:80 ferien:site

# Stop everything
down:
    -podman rm -f ferien ferien-dev

# Regenerate src/data/germany-paths.js from the public-domain GeoJSON
map:
    podman run --rm -v ./:/app:z -w /app python:3-alpine python scripts/build-map.py
