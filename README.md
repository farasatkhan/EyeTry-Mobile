# EyeTry-Mobile
EyeTry Mobile is an ecommerce application built using react native.
The app connects with a REST API to fetch and display data.

## Installation

To run the app on an Android emulator, follow these steps:

1. Clone the repository:
git clone <repository-url>

2. Navigate to the project directory:
cd project-directory
  
3. Install dependencies:
npm install
  
4. Start the Metro bundler:
npx react-native start


5. Ensure the Android emulator is running.

6. Run the app on the Android emulator:
npx react-native run-android
This command will build the app and install it on the Android emulator.

7. EyeTry API should running on your local machine,you need to configure the emulator to connect to your local server.
  Run the following command to forward the network requests:
adb reverse tcp:3000 tcp:3000
  
  
This will ensure that the emulator can access your local server at `http://localhost:8081`.

## Usage

Once the app is successfully installed on the Android emulator, you can launch it and start using it.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to create a pull request or open an issue.


