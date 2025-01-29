# SwoleStory

SwoleStory is an intelligent fitness tracking ecosystem designed for serious strength athletes. Going beyond simple workout logging, it provides sophisticated tracking of progressive overload, volume management, and recovery metrics to optimize your training journey.

## Project Vision

At its core, SwoleStory is built to support the complex needs of strength training and hypertrophy-focused athletes. The system combines workout tracking, nutrition monitoring, and advanced analytics to provide data-driven insights for optimizing training progress.

### Core Features

The application is built around three key components working in harmony:

Mobile Training Application enables intelligent workout logging with features like:
- Smart workout logging with RPE tracking
- Intelligent rest timer that adapts to exercise type
- Sophisticated volume tracking across movement patterns
- Exercise substitution system for equipment flexibility
- Progressive overload tracking and recommendations

Nutrition Tracking (Coming Soon) will provide:
- Energy and recovery metrics
- Body composition analysis
- Meal timing optimization
- Integration with training performance

Desktop Analytics Platform (Coming Soon) will offer:
- Advanced training analysis
- Body composition tracking
- Performance correlations
- Progress visualization

## Technical Architecture

SwoleStory is built using modern, scalable technologies:

Frontend:
- Mobile: React Native with TypeScript
- Desktop: Electron with React (future)
- Data Visualization: Recharts/Victory
- Theming: Material You-inspired dark theme
- State Management: React Context + Local State

Backend:
- Supabase platform
- PostgreSQL database
- Built-in authentication
- Real-time data synchronization

## Getting Started

### Prerequisites

Before you begin, ensure you have installed:
- Node.js (v18 or later)
- npm (v8 or later)
- React Native development environment
- Android Studio (for Android development)
- Xcode (for iOS development, Mac only)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sworestory.git
   cd swolestory
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit .env with your Supabase credentials.

4. Start the development server:
   ```bash
   npm start
   ```

5. Run the application:
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   ```

### Development Guidelines

We follow these principles in our development:

Code Quality:
- Use TypeScript for type safety
- Follow the established project structure
- Write comprehensive error handling
- Include meaningful comments
- Create reusable components

Testing:
- Write unit tests for utilities and hooks
- Include integration tests for complex features
- Test across different devices and screen sizes
- Verify offline functionality

Performance:
- Optimize render cycles
- Implement efficient data caching
- Monitor and optimize bundle size
- Profile React Native performance

### Project Structure

```
src/
├── api/         # API and data access layer
├── components/  # Reusable UI components
├── config/      # Configuration files
├── contexts/    # React Context definitions
├── navigation/  # Navigation configuration
├── screens/     # Screen components
├── theme/       # Theming and styling
├── types/       # TypeScript definitions
└── utils/       # Utility functions
```

## Database Schema

The application uses a sophisticated database schema designed for flexibility and performance:

- Program Configuration: Stores training templates and system settings
- Exercises: Maintains exercise definitions and progression rules
- Exercise Alternatives: Maps exercise substitution options
- Workout Sessions: Records training sessions and metrics
- Exercise Sets: Tracks individual set performance
- Performance Metrics: Stores various performance indicators
- Recovery Metrics: Monitors recovery and readiness

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

Please ensure your code:
- Passes all tests
- Follows our coding standards
- Includes appropriate documentation
- Maintains type safety
- Has been tested on both iOS and Android

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

SwoleStory builds upon the knowledge and experience of strength athletes and coaches, combining proven training principles with modern technology to create an intelligent training companion.

## Support

For support, please:
- Check our documentation
- Open an issue on GitHub
- Contact the development team

Remember to star the repository if you find it useful!