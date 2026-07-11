export function renderMessages(messages) {
    const container = document.getElementById('chat-messages');
    container.innerHTML = '';
    messages.forEach(msg => {
        const bubble = document.createElement('div');
        bubble.classList.add('chat-bubble', msg.role === 'user' ? 'user-msg' : 'ai-msg');
        bubble.innerText = msg.content;
        container.appendChild(bubble);
    });
    container.scrollTop = container.scrollHeight;
}

export function renderHistoryList(sessions, onSelectSession) {
    const listContainer = document.getElementById('history-list');
    listContainer.innerHTML = '';
    sessions.forEach(session => {
        const item = document.createElement('div');
        item.classList.add('history-item');
        item.innerText = session.title || `Chat session ${new Date(session.id).toLocaleTimeString()}`;
        item.addEventListener('click', () => onSelectSession(session));
        listContainer.appendChild(item);
    });
}