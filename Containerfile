# Static site — nothing to compile, so the image is the files plus a web server.
# (No build stage: there is no build step to separate from the runtime.)
# static-web-server: tiny Rust server, defaults to ./public on port 80.
FROM ghcr.io/static-web-server/static-web-server:latest

COPY index.html /public/index.html
COPY src /public/src

EXPOSE 80
