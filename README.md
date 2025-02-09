<div align="center">
  <h1>MovieMate</h1>
</div>

<img src="https://github.com/igperez-ar/movie-mate/blob/master/screenshots/moviemate_app.png"  style="border-radius: 20px"/> 

## Overview
This application is a cross-platform mobile solution developed for iOS and Android that enables users to browse films by categories. The application is designed with an intuitive user interface and focuses on delivering a seamless browsing experience while ensuring high responsiveness across devices.

**Key Features**  
- **Home Page with Carousels:**  
  The home page displays three distinct carousels, each representing a different film category. This layout allows users to quickly scan through various film selections based on genre or other categorizations.

- **Detailed Film View:**  
  Upon selecting a film from any carousel, users are navigated to a dedicated detail page. This page includes:
  - A comprehensive film description.
  - A prominent film image.
  - An interactive button designed to trigger the “add to watch list” action.
  
  Additionally, the detail page can be dynamically differentiated based on the film category, providing tailored visual or functional enhancements that enrich the user experience.

- **Watch List Management:**  
  The application features a watch list section where all films added by the user are aggregated. This allows users to curate a personalized collection of films they watch to revisit or explore further.

**Technical Considerations**  
- **Cross-Platform Development:**  
  Leveraging modern mobile development frameworks, the app ensures consistent performance and user experience on both iOS and Android platforms.
  
- **Dynamic UI Components:**  
  The use of carousels for film categories and customizable detail pages demonstrates a flexible UI approach that can adapt to different content types and user interactions.
  
- **Scalability and Maintainability:**  
  The architecture is designed to support future enhancements, such as additional film categories, advanced search capabilities, or integration with external APIs for film data.

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Install dependencies

First, you will need to install the project libraries using **yarn**:

```sh
yarn install
```

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

```sh
cd ios && pod install && cd ..
```

## Step 2: Start Metro

Now you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
yarn start
```

## Step 3: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
yarn android
```

### iOS

```sh
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.
