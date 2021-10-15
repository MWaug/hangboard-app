## About

This web app interfaces with the HangOnIt prototype hangboard.
It allows users to track workouts and view hang force in realtime.

The full system includes a modified hangboard, custom PCB, web application, backend server, and MQTT broker. All components are open source.

<center><img src="./doc/HangboardSystem.png" alt="live_view"/></center>

The components listed in the image above are linked below.

- [PCB](https://oshwlab.com/mwalk/hangboard_copy)
- [Web App](https://github.com/MWaug/hangboard-app)
- [Backend and MQTT](https://github.com/MWaug/hangboard-server)
- [Firmware](https://github.com/MWaug/hangboard)

## React Documentation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Setup Development Environment

To get started developing the app, several environment variables must be set.

Create a file called .env.local in the root directory of the app and fill in the following environment variables:

```
REACT_APP_FIREBASE_API_KEY=AI...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
REACT_APP_HANGBOARD_MQTT_USER=...
REACT_APP_HANGBOARD_MQTT_PASSWD=...
REACT_APP_HANGBOARD_MQTT_HOST=... # Include port number (e.g. 127.0.0.1:9001)
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
