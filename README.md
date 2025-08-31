# URL Shortener

A simple Node.js URL shortener service using Express and MongoDB.

## Features

- Generate short URLs for any valid URL
- Redirect to the original URL using the short URL
- Track and view analytics (number of clicks and visit history) for each short URL

---

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
    ```sh
    git clone <repo-url>
    cd URL-Shortner
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

4. Start the server:
    ```sh
    npm start
    ```

---

## API Endpoints

### 1. Generate a New Short URL

- **Endpoint:** `POST /url`
- **Description:** Generates a new short URL for the provided original URL.
- **Request Body:**
    ```json
    {
      "redirect_url": "https://example.com"
    }
    ```
- **Response:**
    ```json
    {
      "status": 201,
      "shortId": "AbCdEf12"
    }
    ```

---

### 2. Redirect to Original URL

- **Endpoint:** `GET /url/:shortId`
- **Description:** Redirects to the original URL associated with the given short ID and logs the visit.
- **Response:** Redirects to the original URL.

---

### 3. Get Analytics for a Short URL

- **Endpoint:** `GET /url/analytics/:shortId`
- **Description:** Returns analytics for the given short ID, including total clicks and visit history.
- **Response:**
    ```json
    {
      "status": 200,
      "shortenUrl": "http://localhost:4500/url/AbCdEf12",
      "totalClicks": 5,
      "analytics": [
        { "timeStamp": 1693555200000 },
        { "timeStamp": 1693555300000 }
      ]
    }
    ```

---

## Project Structure

```
URL-Shortner/
├── controllers/
│   └── url.js
├── models/
│   └── url.js
├── routes/
│   └── url.js
├── connection.js
├── index.js
├── package.json
└── README.md
```

---

##