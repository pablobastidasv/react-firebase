# SQRs App

![Build](https://travis-ci.org/pablobastidasv/tickets-manager.svg?branch=master)

## Firebase configuration

Copy and rename the `config.js.example` to `config.js`.

Open [the firebase console](https://console.firebase.google.com) and log in with your
google user.

![Firebase welcome page](images/firebase1.png "Firebase welcome")

Click on `Añadir proyecto`.

![Add new project](images/firebase2.png "Add new project")

Set the project name (`Nombre del proyecto`) and click on `CREAR PROYECTO`.

Once the creation project have finished going to show the project's general view,
  here you should click in `Add Firebase to your web application` (`Añade Firebase
  a tu aplicación web`).

![Add Firebase to your web application](images/firebase3.png "Add Firebase to your web application")

Now you have to see a dialog with the values to put in the `config.js` file

![Configuration info](images/firebase4.png "Configuration info")

## Enabling google authentication

Once you have the firebase configuration done, you have to enable the firebase
authentication. To this you have to clic in `Authentication` option on the
left menu.

![Authentication](images/firebase5.png "Authentication")

In the Authentication dashboard clic in `Configure authentication method` (
  `CONFIGURA EL MÉTODO DE INICIO DE SESIÓN`).

![Authentication dashboard](images/firebase6.png "Authentication dashboard")

Now, when you put the mouse over google, it should show a pencil icon on the
right side, click in this icon and enable the Google Authentication. Finally
click in `Save` (`Guardar`)

![Enabling Google Authentication](images/firebase7.png "Enabling Google Authentication")

## Start the application

The app was developed using:
  - node v6.9.4
  - npm v3.10.10
  - yarn v0.16.1
  (You should have install this depedencies)

### Install yarn

`npm install -g yarn`

### Excecuting the application in dev mode

`yarn serve`

### Bulding

`yarn build`

### Deploy

`yarn deploy`
