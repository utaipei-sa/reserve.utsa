### Start with Docker

To build the image for this application, use:

```bash
docker build -t reserveImage .
```

Running the Docker Container, use:

```bash
docker run -d -p 80:80 --name reserveFrontend reserveImage
```

Then the server will be accessible in http://localhost:80
