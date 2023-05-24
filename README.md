<h1 style="display: flex; align-items: center;">
    <img style="margin-right: 20px;" src="https://single-spa.js.org/img/logo-white-bgblue.svg" width="50" height="50">Plateforme SiFAST - Root Configuration Module</h1>

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

This project is an application that consolidates all of **child applications (micro frontends)** of **"Plateforme SiFast"** and present them to the user, it serves the **single-spa applications (JS bundle)** whenever it is being requested

The **single-spa Root Configuration Module** consists of the following:

1. The **root HTML** file that is shared by all single-spa applications.
2. The JavaScript that calls singleSpa.registerApplication().

## Why does this exist? 🤔

root config exists only to start up the single-spa applications.

## 🚨 Rules

If you wish to collaborate in this project you should respect the following rules :

- After pushing your branch into the project you should submit for a merge request. Changes should be inverstigated by the project manager before being merged to master [Merge Request](http://gitlab.sifast.lan/Projects/socle-angular/merge_requests).
- Any working branch should be referenced by the task job issued from RedMine
- Merge requests should contain a clear description of changes have been made

## ⚡ Prerequisites

The project is intended to be developed in a docker environment, so it is recommended to install version 20 or higher [Docker](https://www.docker.com/community-edition) version.

The dockerized project have dependencies that require Node 14, NPM 6 or higher [NodeJS](https://nodejs.org/en/) version.
Git is used as distributed version control system [Git](https://git-scm.com/)

## Table of Contents

- [Installation](#🚧-installation)
- [Getting Started](#🚀-getting-started)
- [Getting into the docker container ](#getting-into-the-docker-container)
- [Starting the Single-spa development server](#🏃‍♂️-starting-the-single-spa-development-server)
- [Building the Project](#🔨-building-the-project)

## 🚧 Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

**Clone the project to working directory**

```bash
git clone http://git.sifast.com/sifast-project/root-config-micro-front.git
cd root-config-micro-front
```

## 🚀 Getting Started

### **Creating the development environment**

```bash
sh entrypoint create-env-dev
```

### **Getting into the docker container**

To access the running container

- **If you are using Windows**

```bash
sh entrypoint start
```

- **If you are using Linux**

```bash
sh entrypoint start-linux
```

## 🏃‍♂️ Starting the Single-spa development server

The development server is mapped automatically via the docker container networking publishing the server app by default in the [localhost:9090](http://localhost:9090).

Just run

```bash
npm start
```

inside the running container.

## 🔨 Building the Project

Run

```bash
npm run build:webpack
```

to build the project in the local. The build artifacts will be stored in the `dist/` directory.

Run

```bash
npm run build:webpack-itg
```

to build the project to the **Integration jenkins job**. This command use Integration server URL.

Run

```bash
npm run build:webpack-rec
```

to build the project to the **Recette jenkins job**. This command use Recette server URL.
