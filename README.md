# 🏠 Auction House Application

![alt text](/public/readme-screenshot.png)

**Semester Project 2** for Noroff's Frontend Development course.

This project is an auction website built as part of Semester Project 2. The goal is to create a fully functional front-end application that interacts with a provided auction API. The platform allows registered users to list items for auction, place bids, and manage credits. Non-registered users can browse listings but cannot bid.

---

## 📚 Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Environment Setup](#environment-setup)
    - [Running the Project](#running-the-project)
4. [Usage](#usage)
5. [Deployment](#deployment)
6. [Project Structure](#project-structure)


---

## ✨ Features

- **User Authentication**: Register, log in, and log out.
- **Create Listings**: Users can create new auction listings with images, titles, and descriptions.
- **Bid on Items**: Place bids on listed items and see bids.
- **Search & Filter**: Search for listings and sort them by different criteria (e.g., newest, alphabetically, ending soon).
- **Profile Management**: Manage user profile, update avatar, banner and bio, and see listings.
- **Responsive Design**: Fully responsive for desktop, tablet, and mobile views.

---

## 🛠️ Technologies Used

- **HTML5**
- **CSS3 / Tailwind CSS**
- **JavaScript (ES6)**
- **Vite**
- **Font Awesome** (for icons)
- **Netlify** (for deployment)
- **RESTful API** (provided by Noroff)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+)
- [Git](https://git-scm.com/)
- A code editor like [VSCode](https://code.visualstudio.com/)

### 📅 Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Eikhaugen/Semester-Project-2.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd auction-house-app
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

### 🛠️ Environment Setup

1. **Copy the `.env_template` File**:

   ```bash
   cp .env_template .env
   ```

2. **Add Your API Key**:

   - Open the newly created `.env` file in your code editor.
   - Add your API key in place of `your-api-key-here`:

     ```env
     VITE_API_KEY=your-api-key-here
     ```

   - You can get your API key here: [Noroff API Key Documentation](https://docs.noroff.dev/docs/v2/auth/api-key).

### ▶️ Running the Project

1. **Start the Development Server**:

   ```bash
   npm run dev
   ```

2. Open your browser and go to:

   ```plaintext
   http://localhost:3000
   ```

---

## 📝 Usage

### User Guide

1. **Register/Login**:  
   Create an account or log in to start bidding and creating listings.

2. **Create a Listing**:  
   - Go to the "Create Listing" page.
   - Fill in the title, description, and upload an image.
   - Submit to list the item for auction.

3. **Bid on Items**:  
   - Browse listings and click on an item to view details.
   - Enter a bid amount and place your bid.

4. **Filter & Search**:  
   - Use the search bar to find specific items.
   - Sort listings by "Newest," "Alphabetically," or "Ending Soon."

5. **Manage Profile**:  
   - View and edit your profile information.
   - Check your bidding history.

---

## 🌐 Deployment

The application is deployed on **Netlify**:

🔗 **Live Demo**: [https://grand-pika-ed478d.netlify.app/](https://grand-pika-ed478d.netlify.app/)


---

## 💁️ Project Structure

```
Semester-Project-2/
│
├── __tests__/
│   └── auth/
│
├── auth/
│   ├── login/
│   └── register/
│
├── create/
│   └── index.html
│
├── listing/
│   └── index.html
│
├── profile/
│   └── index.html
│
├── public/
│
├── src/
│   └── js/
│       ├── api/
│       │   ├── auth/
│       │   └── listing/
│       │
│       ├── router/
│       │   └── index.js
│       │
│       ├── ui/
│       │   ├── auth/
│       │   └── listing/
│       │
│       └── utils/
│
├── .env_template
├── .gitignore
├── index.html
├── main.js
├── package.json
└── README.md

```

---


