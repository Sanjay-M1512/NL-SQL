# 💬 Natural Language to SQL Converter 👨‍💻

This project is a full-stack AI system that converts natural language queries into SQL commands and provides query results in a user-friendly chat interface. It helps users interact with databases without needing SQL expertise.

🔗 **Live Web Version:** [https://nl-sql-sanjay-m1512s-projects.vercel.app](https://nl-sql-sanjay-m1512s-projects.vercel.app) *(Update with actual link)*

---

## 🚀 Get Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the app**

   ```bash
   npx expo start
   ```

Run the app on:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

Start development in the **app** folder. The app uses [file-based routing](https://docs.expo.dev/router/introduction).

---

## 🧠 Project Highlights

- 🗣️ Convert natural language to SQL queries using Seq2Seq with attention (PyTorch)
- 🧾 Execute SQL queries on the user’s connected MySQL database
- 💬 Chat-style UI to interact with the SQL engine
- 🔐 User authentication and profile management
- 🧠 Language-to-SQL learning integrated with Gemini model (fallback for SQL generation)
- 🌐 Web and mobile support

---

## ⚙️ Tech Stack

- **Frontend:** React + Tailwind CSS + React Router
- **Backend:** Flask + MongoDB Atlas
- **AI Models:** Seq2Seq (PyTorch), Gemini API (fallback)
- **Database:** MySQL, MongoDB Atlas
- **Authentication:** JWT + MongoDB
- **Deployment:** Vercel (Web), Render/EC2 (Backend)

---

## 🧼 Reset the Project

To clean the starter code and begin fresh:

```bash
npm run reset-project
```

---

## 📚 Learn More

- [Expo documentation](https://docs.expo.dev/)
- [React documentation](https://react.dev/)
- [Flask documentation](https://flask.palletsprojects.com/)
- [PyTorch docs](https://pytorch.org/docs/stable/index.html)

---

## 💬 Join the Community

- [OpenAI Community](https://community.openai.com)
- [Python Discord](https://pythondiscord.com/)
