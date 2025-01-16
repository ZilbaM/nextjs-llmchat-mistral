# LLM Chatbot Webapp

Welcome to this LLM Chatbot web application! Built with Next.js, this project is designed to make your conversations with an AI assistant feel seamless and engaging. You can easily start chatting, keep track of your conversation history, and switch between multiple chats effortlessly using the intuitive sidebar.

You can either clone the repository and run it locally, or you can click [here](https://chat.basilemaille.fr) to test it online !

---

## System Architecture

### Frontend

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: TailwindCSS & Lucide (for icons)
- **State Management**: React hooks for local state.

### Backend

- **API Routes**: Next.js API routes.
- **LLM Integration**: Mistral API for chat completions.

### Data Persistence

- **Local Storage**: IndexedDB is used to persist conversation history and conversation IDs. Data is also protected with a tamper-detection mechanism to ensure integrity.
- **State Management**: React manages in-session state to ensure a seamless user experience.

---

## Installation and Setup

### Prerequisites

- Node.js (>=16)
- npm or yarn

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/ZilbaM/nextjs-llmchat-mistral
   cd nextjs-llm-chat-mistral
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory and add your Mistral API key:
   ```env
   MISTRAL_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

---

## Usage

### Start a New Chat

- Navigate to `/chat` to start a new conversation.
- Begin typing in the input field and press `Enter` or click "Send" to submit your message.

### Manage Existing Chats

- Use the sidebar to view and switch between conversations.
- Click on a conversation in the sidebar to load its history.

### Interact with AI

- Type messages to engage with the AI assistant.
- The AI response is generated via the Mistral API and displayed in the chat.

---

## API Endpoints

### `POST /api/ask`

- **Description**: Sends messages to the Mistral API and retrieves the assistant’s response.
- **Request Body**:
  ```json
  {
    "messages": [
      { "role": "user", "content": "Hello!" }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "choices": [
      { "message": { "role": "assistant", "content": "Hi there! How can I help you?" } }
    ]
  }
  ```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Mistral AI](https://www.mistral.ai/)

