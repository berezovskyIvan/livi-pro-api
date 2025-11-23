# Livi-Pro API

A NestJS-based API for the Livi-Pro project.

## Quick Start

```bash
# Install dependencies
yarn install

# Development
yarn start:dev

# Production
yarn start:prod
```

## Common Commands

### Development

```bash
yarn start          # Start in development mode
yarn start:dev      # Start with hot reload
yarn start:debug    # Start in debug mode
yarn start:prod     # Start in production mode
```

### Testing

```bash
yarn test           # Run unit tests
yarn test:e2e       # Run end-to-end tests
yarn test:cov       # Run tests with coverage
yarn test:watch     # Run tests in watch mode
```

### Building

```bash
yarn build          # Build the project
yarn build:prod     # Build for production
```

### Linting & Formatting

```bash
yarn lint           # Run ESLint
yarn lint:fix       # Fix linting issues
yarn format         # Format code with Prettier
```

## Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000
```

## API Endpoints

- `GET /check` - Health check
