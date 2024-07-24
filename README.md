# Reserve Frontend

A platform to reserve the spaces and items managed by UTSA.

### Start with Docker

To build the image for this application, use:

```bash
docker build -t reserve-image .
```

Running the Docker Container, use:

```bash
docker run -d -p 80:80 --name reserve-frontend reserve-image
```

Then the server will be accessible in http://localhost:80

### Start Locally with npm

To set up and run the application locally without Docker, follow these steps:

1. Ensure you have Node.js and npm installed on your machine. You can download them from Node.js official site.

2. Clone the repository (if you haven't already):

   ```bash
   git clone https://github.com/utaipei-sa/reserve.utsa.git

   cd reserve.utsa
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

Then the server will be accessible at http://localhost:3000 (or the port specified in your project configuration).
