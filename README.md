# EyeTry-Mobile

EyeTry Mobile is an ecommerce application built using react native.
The app connects with a REST API to fetch and display data.

## Installation

To run the app on an Android emulator, follow these steps:

### 1. Clone the repository:

`git clone https://github.com/farasatkhan/EyeTry-Mobile.git`

### 2. Navigate to the project directory:

`cd EyeTry-Mobile`

### 3. Install dependencies:

`npm install`

### 4. Start the Metro bundler:

`npx react-native start`

### 5. Ensure the Android emulator is running.

### 6. Run the app on the Android emulator:

`npx react-native run-android`
This command will build the app and install it on the Android emulator.

### 7. Configuring the emulator to connect to local server.

EyeTry API should running on your local machine,you need to configure
the emulator to connect to your local server.Run the following command
to map your computer's local server port to same port in device

### See list of devices connected. It can be emulator or real device

`adb devices`

> List of devices attached
> emulator-5554 device <--- emulator`2681523e        device <-- real device
map the ports`adb -s emulator-5554 reverse tcp:3000 tcp:3000`

```
adb -s 2681572e reverse tcp:3000 tcp:3000
adb -s 2681572e reverse tcp:<flask_server_port> tcp:flask_server_port
```

> can replace 2681572e with the id of the device you want to run your application on

This will ensure that the emulator can access your local server at `http://localhost:8081`.

## Usage

Once the app is successfully installed on the Android emulator, you can launch it and start using it.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to create a pull request or open an issue.
