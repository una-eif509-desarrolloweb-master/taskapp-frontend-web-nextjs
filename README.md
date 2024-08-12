
# TaskApp - A Simple Task Management Web App (Universidad Nacional de Costa Rica)

This is a web application built using [Next.js](https://nextjs.org/), a framework for React that helps you build modern web applications with ease.

## Prerequisites

Before you start, you need to install some tools on your computer.

### 1. Install Node.js

Node.js is a JavaScript runtime that lets you run JavaScript on your computer outside of a web browser.

- **Download Node.js**: Go to the [Node.js website](https://nodejs.org/) and download the latest LTS version (recommended).
- **Install Node.js**: Run the installer you downloaded and follow the instructions. Make sure to check the box that says "Automatically install necessary tools" during installation.

To check if Node.js is installed, open Command Prompt and type:

```bash
node -v
```

You should see a version number, which means Node.js is installed.

### 2. Install a Code Editor

You’ll need a code editor to write and edit the code. A popular choice is Visual Studio Code.

- **Download Visual Studio Code**: Go to the [Visual Studio Code website](https://code.visualstudio.com/) and download it.
- **Install Visual Studio Code**: Run the installer and follow the instructions.

### 3. Install Git (Optional but Recommended)

Git is a version control system that helps you manage and track changes to your code.

- **Download Git**: Go to the [Git website](https://git-scm.com/) and download it.
- **Install Git**: Run the installer and follow the instructions.

To check if Git is installed, open Command Prompt and type:

```bash
git --version
```

You should see a version number, which means Git is installed.

## Creating a New Next.js App

Follow these steps to create a new Next.js app on your local machine.

### 1. Open Command Prompt

Open Command Prompt by searching for "cmd" in the Start menu.

### 2. Create a New Next.js App

In Command Prompt, navigate to the folder where you want to create your project. For example, if you want to create it in your "Documents" folder, you can type:

```bash
cd C:\Users\YourName\Documents
```

Now, run the following command to create a new Next.js app:

```bash
npx create-next-app@latest my-nextjs-app
```

- `npx` is a tool that comes with Node.js. It runs the `create-next-app` package without needing to install it globally.
- `my-nextjs-app` is the name of your project. You can change this to whatever name you prefer.

Follow the prompts to set up your project. You can accept the default options if you're unsure.

### 3. Navigate to the Project Folder

After the app is created, navigate to your project folder:

```bash
cd my-nextjs-app
```

### 4. Install Dependencies

Even though the dependencies should be installed automatically by `create-next-app`, if you ever need to reinstall them, run:

```bash
npm install
```

### 5. Run the Development Server

Now you can start the app! In Command Prompt, run:

```bash
npm run dev
```

### 6. Open the App in Your Browser

After running the command above, you should see a message like this:

```
Local: http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to see the app.

### 7. Edit the Code

You can start editing the code by opening the project folder in Visual Studio Code. The main file to edit is `app/page.js`. When you save changes, the app will automatically update in your browser.

## Installing and Using Docker Compose on Windows

### 1. Install Docker Desktop

Docker Desktop is the easiest way to get started with Docker and Docker Compose on Windows.

- **Download Docker Desktop**: Go to the [Docker Desktop website](https://www.docker.com/products/docker-desktop) and download the installer for Windows.
- **Install Docker Desktop**: Run the installer and follow the instructions.

  During installation, make sure to enable the option to install the "Windows Subsystem for Linux 2 (WSL 2)" if prompted.

### 2. Start Docker Desktop

- After installation, launch Docker Desktop. You should see the Docker icon in your system tray (bottom-right corner of your screen).
- Wait for Docker to start; the icon will indicate when it's ready.

### 3. Verify Docker Compose Installation

Docker Compose comes pre-installed with Docker Desktop, so you don't need to install it separately. To verify that Docker Compose is installed, open a Command Prompt or PowerShell window and run:

```bash
docker-compose --version
```

You should see the version of Docker Compose printed in the terminal.

## Running the App with Docker Compose

You can run this application using Docker Compose, which allows you to manage and run your application in containers.

### 1. Create a `Dockerfile`

Create a `Dockerfile` in the root directory of your project with the following content:

```Dockerfile
# Use the latest Node.js LTS version as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
```

### 2. Create a `docker-compose.yml`

Create a `docker-compose.yml` file in the root directory of your project with the following content:

```yaml
version: '3.8'
services:
  task-app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run dev
```

### 3. Build and Run the App

To build and run the app using Docker Compose, open Command Prompt and navigate to your project directory. Then, run:

```bash
docker-compose up --build
```

This command will build the Docker image and start the development server.

### 4. Open the App in Your Browser

After running the command, you should see a message indicating that the app is running. Open [http://localhost:3000](http://localhost:3000) in your web browser to see the app.

## Deploying on Heroku

Heroku is a platform that lets you deploy web applications easily. Follow these steps to deploy your Next.js app on Heroku.

### 1. Install the Heroku CLI

The Heroku Command Line Interface (CLI) allows you to manage and deploy applications from your terminal.

- **Download the Heroku CLI**: Go to the [Heroku CLI website](https://devcenter.heroku.com/articles/heroku-cli) and download the installer.
- **Install the Heroku CLI**: Run the installer and follow the instructions.

### 2. Log in to Heroku

Open Command Prompt and log in to your Heroku account:

```bash
heroku login
```

This will open a browser window where you can log in to your Heroku account.

### 3. Create a Heroku App

In your project folder, create a new Heroku app:

```bash
heroku create my-nextjs-app
```

Replace `my-nextjs-app` with the name you want for your app. If you don’t specify a name, Heroku will generate one for you.

### 4. Prepare Your App for Deployment

Heroku needs a `Procfile` to know how to run your application. Create a file named `Procfile` in your project’s root directory with the following content:

```plaintext
web: npm run start
```

### 5. Deploy Your App

Initialize a Git repository (if you haven’t already) and deploy your app to Heroku:

```bash
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

### 6. Open Your App

Once the deployment is complete, open your app in the browser:

```bash
heroku open
```

Your Next.js app is now live on the internet!

### 7. View Logs

To view your app's logs, run:

```bash
heroku logs --tail
```

This command will display real-time logs from your Heroku app.

## Learn More

Here are some resources to help you learn more about the technologies used in this project:

- [Node.js Documentation](https://nodejs.org/en/docs/) - Learn more about Node.js.
- [React.js Documentation](https://reactjs.org/docs/getting-started.html) - Learn more about React.js.
- [Next.js Documentation](https://nextjs.org/docs) - Learn more about Next.js.
- [Heroku Documentation](https://devcenter.heroku.com/) - Learn more about deploying on Heroku.

