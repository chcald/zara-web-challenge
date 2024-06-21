# Marvel - Zara web - Chalenge

It is a search engine for superheroes, where you can save them in favorites and then save them in favorites, and then be able to see their comics.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Architecture and Structure](#architecture-and-structure)
4. [Technologies Used](#technologies-used)
5. [Key Features](#key-features)
6. [License](#license)

## Installation

Describe how to install the project and its dependencies. Include any prerequisites like Node.js versions, package managers (npm or yarn), etc.

```bash
# Clone the repository
git clone https://github.com/chcald/zara-web-challenge.git

# Navigate into the project directory
cd zara-web-challenge

# Install dependencies
npm install
```

## Usage


```bash
# Start the app in development mode
npm run dev
```

```bash
# Build and serve the app in production mode
npm run build
npm start
```

## Architecture and Structure

```
/
├── public/             # Public files (favicon, images)
├── src/                # Source code
│   ├── components/     # React components
│   ├── app/            # Next.js pages
│   ├── styles/         # Styles (CSS, SCSS)
│   ├── contexts/       # Application contexts
│   ├── hooks/          # Custom hooks
│   ├── services/       # Service logic (API, data handling)
│   └── ...
├── .env                # Environment variables
├── jest.config.js      # Jest configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # This file
```

## Technologies Used

- React.js
- Next.js
- TypeScript
- CSS/SCSS
- Jest
- ...

## Key Features

The key to this project was the use of context API that helped me a lot to solve many problems, also the separation of components to be able to reuse them, and the use of Next js for easy routing.


## License

Free license.

---
