NexaChat 🤖✨

NexaChat is a sleek, professional, and secure AI chatbot web application. It features a vanilla JavaScript frontend with a dynamic Three.js 3D background, a responsive dark/light mode UI, local chat history retention, and a Node.js proxy backend to securely interact with NVIDIA's NIM LLM APIs (powered by Meta's Llama 3.1).

🌟 Features

Secure API Architecture: Utilizes a Node.js/Express backend proxy to keep API keys completely hidden from the client-side browser.

Immersive 3D UI: Features an interactive, lightweight 3D wireframe background powered by Three.js.

Theme Toggling: Seamless switching between Dark and Light modes using CSS variables.

Revisitable Chat History: Automatically saves and organizes past chat sessions in the browser's localStorage for easy retrieval.

High-Performance AI: Integrated with NVIDIA's NIM platform, specifically utilizing the highly capable meta/llama-3.1-8b-instruct model.

🛠️ Tech Stack

Frontend: Vanilla HTML5, CSS3, JavaScript (ES6 Modules)

3D Graphics: Three.js

Backend: Node.js, Express.js

AI Integration: NVIDIA NIM API (OpenAI-compatible)

📦 Prerequisites

Before you begin, ensure you have the following installed on your machine:

Node.js (v14 or higher)

npm (comes with Node.js)

An API Key from NVIDIA Build

🚀 Installation & Setup

1. Clone the repository

git clone [https://github.com/DeblenaPanja/NexaChat.git](https://github.com/DeblenaPanja/NexaChat.git)
cd NexaChat


2. Install backend dependencies

npm install


3. Configure Environment Variables
Create a .env file in the root directory of the project. This file is ignored by Git to keep your credentials safe.

touch .env


Open the .env file and add your NVIDIA API key:

NVIDIA_API_KEY=nvapi-your-actual-api-key-goes-here


💻 Running the Application

To start the NexaChat backend server and serve the frontend:

npm start


Once the server is running, you will see a message in the terminal: NexaChat Engine active at http://localhost:8000.
Open your web browser and navigate to http://localhost:8000 to interact with the chatbot.

📁 Project Structur
```text

NexaChat/
├── server.js              # Node.js Express backend proxy
├── package.json           # Project metadata and dependencies
├── .env                   # Secret environment variables (Ignored by Git)
├── index.html             # Main frontend UI shell
├── styles/                # CSS styling directories
│   ├── variables.css      # Theme tokens (Dark/Light mode)
│   ├── layout.css         # Structural layout styling
│   └── components.css     # Buttons, inputs, and chat bubbles
└── src/                   # Frontend JavaScript modules
    ├── main.js            # Orchestrator and event bindings
    ├── api/
    │   └── nvidiaNim.js   # Client-side API fetch to the local proxy
    ├── ui/
    │   ├── themeToggle.js # Logic for UI theme switching
    │   └── chatInterface.js # DOM manipulation for messages
    ├── three/
    │   └── sceneSetup.js  # Three.js 3D background initialization
    └── store/
        └── localHistory.js # localStorage management for history
```
        


🔒 Security Note

Never commit your .env file to version control. The included .gitignore file is pre-configured to prevent this. All AI requests pass through server.js, meaning the browser never directly handles your NVIDIA API keys.

Built with modern vanilla web technologies.
