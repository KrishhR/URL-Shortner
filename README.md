# URL Shortener

A secure Node.js URL shortener service using Express, MongoDB, and JWT-based authentication.

## Features

- **User Authentication:** Signup and login with JWT-secured sessions
- **Role-based Access:** Admin and normal user roles
- **Short URL Generation:** Only authenticated users can create short URLs
- **Redirection:** Anyone can use short URLs to redirect to the original destination
- **Analytics:** Authenticated users can view click analytics for their URLs
- **Admin Panel:** Admins can view all users and URLs

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or cloud)

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

3. Configure environment variables in a `.env` file:
    ```
    PORT=4500
    DB_URI=mongodb://localhost:27017
    DB_NAME=urlshortner
    BASE_URL=http://localhost:4500
    JWT_SECRET=your_secret_key
    ```

4. Start the server:
    ```sh
    npm start
    ```

---

## API Endpoints

### Authentication

- **POST** `/user/signup`  
  Create a new user account.

- **POST** `/user/login`  
  Login and receive a JWT token (stored in a cookie).

### Short URL Operations

- **POST** `/url`  
  _Protected_: Create a new short URL.  
  **Body:**  
  ```json
  {
    "redirectURL": "https://example.com"
  }
  ```

- **GET** `/url/:shortId`  
  _Public_: Redirect to the original URL.

- **GET** `/url/analytics/:shortId`  
  _Protected_: Get analytics for a short URL.

### Admin Operations

- **GET** `/user/all`  
  _Admin only_: View all users.

- **GET** `/url/all`  
  _Admin only_: View all URLs.

---

## Project Structure

```
URL-Shortner/
├── controllers/
│   ├── url.js
│   └── user.js
├── models/
│   ├── url.js
│   └── user.js
├── routes/
│   ├── url.js
│   ├── user.js
│   └── staticRoutes.js
├── middlewares/
│   └── auth.js
├── services/
│   └── auth.js
├── views/
│   └── home.ejs
├── connection.js
├── index.js
├── package.json
└── README.md
```

---

## License