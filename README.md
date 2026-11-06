# system-finance

Personal finance web app for tracking income and expenses — built with React and powered by Firebase.

🔗 **Live:** [systemfinance.netlify.app](https://systemfinance.netlify.app/)

---

## Features

- 🔐 **Authentication** — secure sign-up and login via Firebase Auth
- ➕ **Transaction registration** — add income and expense entries with category and description
- 📊 **Financial dashboard** — real-time summary of balance, income, and expenses
- 📋 **Transaction grid** — paginated list of all registered transactions
- 💅 **Styled UI** — component-level styling with styled-components

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Styling | styled-components |
| Authentication | Firebase Auth |
| Database | Cloud Firestore |
| Deployment | Netlify |

---

## Project Structure

```
src/
├── components/
│   ├── Form/          # Transaction input form
│   ├── Grid/          # Transaction list grid
│   ├── GridItem/      # Individual transaction row
│   ├── Header/        # App header with user info
│   ├── Login/         # Login screen
│   ├── Register/      # Registration screen
│   ├── Resume/        # Financial summary cards
│   └── ResumeItem/    # Individual summary card
├── firebase.js        # Firebase initialization & config
└── App.js
```

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/ribollitiago/system-finance.git
cd system-finance

# Install dependencies
npm install

# Configure Firebase
# Create a .env file at the root with your Firebase project credentials:
# REACT_APP_API_KEY=...
# REACT_APP_AUTH_DOMAIN=...
# REACT_APP_PROJECT_ID=...
# REACT_APP_STORAGE_BUCKET=...
# REACT_APP_MESSAGING_SENDER_ID=...
# REACT_APP_APP_ID=...

# Start development server
npm start
```

---

## Author

**Tiago Ribolli Blasquez**  
[linkedin.com/in/tiagoribolli](https://www.linkedin.com/in/tiago-ribolli-blasquez-060810244) · [github.com/ribollitiago](https://github.com/ribollitiago)
