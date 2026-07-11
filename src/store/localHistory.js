export function getSavedChats() {
    const data = localStorage.getItem('chat_sessions');
    return data ? JSON.parse(data) : [];
}

export function saveChatSession(session) {
    const history = getSavedChats();
    const index = history.findIndex(s => s.id === session.id);
    if (index !== -1) {
        history[index] = session;
    } else {
        history.unshift(session);
    }
    localStorage.setItem('chat_sessions', JSON.stringify(history));
}