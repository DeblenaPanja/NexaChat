import { init3DBackground } from './three/sceneSetup.js';
import { initThemeToggle } from './ui/themeToggle.js';
import { getSavedChats, saveChatSession } from './store/localHistory.js';
import { renderMessages, renderHistoryList } from './ui/chatInterface.js';
import { fetchLLMResponse } from './api/nvidiaNim.js';

let currentSession = null;

function initApp() {
    init3DBackground();
    initThemeToggle();
    refreshSidebar();
    startNewChat();

    document.getElementById('chat-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('new-chat-btn').addEventListener('click', startNewChat);
}

function startNewChat() {
    currentSession = { id: Date.now(), title: '', messages: [] };
    renderMessages([]);
}

function refreshSidebar() {
    const historicalSessions = getSavedChats();
    renderHistoryList(historicalSessions, (selectedSession) => {
        currentSession = selectedSession;
        renderMessages(currentSession.messages);
    });
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const inputEl = document.getElementById('user-input');
    const text = inputEl.value.trim();
    if (!text) return;

    inputEl.value = '';
    
    // Process User Message
    currentSession.messages.push({ role: 'user', content: text });
    if (!currentSession.title) currentSession.title = text; // First text becomes title
    renderMessages(currentSession.messages);

    // Call AI Endpoint
    const aiResponse = await fetchLLMResponse(currentSession.messages);
    currentSession.messages.push({ role: 'assistant', content: aiResponse });
    
    // Save State & Update View
    saveChatSession(currentSession);
    renderMessages(currentSession.messages);
    refreshSidebar();
}

window.addEventListener('DOMContentLoaded', initApp);