# 🍔 JET Restaurant Interface

A frontend web application built as part of the Just Eat Takeaway technical assignment. It allows users to search for restaurants by UK postcode using the Just Eat public API.

---

## Tech Stack

- **Vite** — dev server & build tool (also used for API proxying)
- **Tailwind CSS v4** — utility-first styling
- **Vanilla JavaScript** — no frameworks, just clean JS
- **Vitest** — unit testing

---

## Features

- Search restaurants by UK postcode
- Displays restaurant results fetched from the Just Eat API
- Handles invalid postcodes gracefully with user-friendly error messages
- Responsive and clean UI

---

## Design Process

Before writing any code, I went through a structured design process to understand the problem from a user's perspective:

1. **User Stories** — identified what a user would want to see and do with the app ([view on Excalidraw](https://excalidraw.com/?element=pMlRDtedZWk6Plr0HAJZ_))

   ![Excalidraw user stories section](docs/images/1.png)

2. **Feature Planning** — defined the main features the app should support ([view on Excalidraw](https://excalidraw.com/?element=8qwPc6mVMiDHzXVZ_wfU7))

   ![Excalidraw main features section](docs/images/2.png)

3. **Flowchart** — mapped out all user actions and how the app responds to them, which helped organise the code structure ([view on Excalidraw](https://excalidraw.com/?element=y0S3RakBM0FL7Kzxe9vin))

![Excalidraw flowchart section](docs/images/3.png)

5. **Mockup** — drafted a visual preview of the UI before building it ([view on Excalidraw](https://excalidraw.com/?element=OAjABVIbdZGoX7Afgad1w))

![Excalidraw mockup section](docs/images/4.png) 6.

---

## Challenges (that derived in Technical Decisions)

### CORS Handling

The Just Eat API does not support direct browser requests due to CORS restrictions. Rather than using a browser extension or a public proxy (both of which are unsafe and unscalable), I used **Vite's built-in proxy** to forward API requests server-side:

```js
// vite.config.js
export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://uk.api.just-eat.io/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
});
```

### Invalid Postcode Detection

The API returns a `200 OK` even for invalid postcodes. To handle this, I check whether the `restaurants` array in the response is empty and throw an error accordingly:

```js
if (!responseData.restaurants || responseData.restaurants.length === 0) {
  throw new Error('Postcode not found');
}
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm

### Installation

Clone the repository:

```sh
git clone https://github.com/GiChirico/jet-restaurant-interface.git
cd jet-restaurant-interface
```

Install dependencies:

```sh
npm install
```

### Running the App

```sh
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Running Tests

```sh
npm test
```

> Tip: `npm run test` also works.
