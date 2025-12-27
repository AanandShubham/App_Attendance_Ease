import 'dotenv/config';

export default
  {
    "expo": {
      "name": "Attendance - Ease",
      "slug": "attendance-ease",
      "version": "1.0.0",
      "orientation": "portrait",
      "icon": "./assets/images/icon.png",
      "scheme": "attendanceease",
      "userInterfaceStyle": "automatic",
      "newArchEnabled": true,
      "ios": {
        "supportsTablet": true
      },
      "android": {
        package: "com.sivi.attendanceease",
        "label": "Attendance - Ease",
        "adaptiveIcon": {
          "backgroundColor": "#E6F4FE",
          "foregroundImage": "./assets/images/icon.png",
          "backgroundImage": "./assets/images/android-icon-background.png",
          "monochromeImage": "./assets/images/android-icon-monochrome.png",
        },
        "permissions": [
          "INTERNET",
          "READ_MEDIA_IMAGES",
          "WRITE_EXTERNAL_STORAGE"
        ],
        "edgeToEdgeEnabled": true,
        "predictiveBackGestureEnabled": false
      },
      "web": {
        "output": "static",
        "favicon": "./assets/images/icon.jpg",
        "bundler": "metro"
      },
      "plugins": [
        "expo-router",
        [
          "expo-splash-screen",
          {
            "image": "./assets/images/splace-icon.png",
            "imageWidth": 128,
            "resizeMode": "contain",
            "backgroundColor": "#ffffff",
            "dark": {
              "backgroundColor": "#000000"
            }
          }
        ]
      ],
      "experiments": {
        "typedRoutes": true,
        "reactCompiler": true
      },
      extra: {
        eas: {
          projectId: "9c3d31df-4799-4be0-b1be-b2b486259754",
        },
        apiUrl: process.env.API_URL
      }
    }
  }
