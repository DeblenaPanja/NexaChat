/**
 * NexaChat API Client (Secure Proxy Version)
 * * This module handles communication with our local Node.js server.
 * The local server acts as a secure proxy, attaching the hidden API key
 * and forwarding the request to NVIDIA's LLM endpoints.
 */

export async function fetchLLMResponse(messagesContext) {
    try {
        // Pointing directly to our secure local server route, NOT the public internet.
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // We send a clean slice of recent messages (the context window) 
                // to avoid exceeding token limits and reduce latency.
                messages: messagesContext.slice(-6) 
            })
        });

        const result = await response.json();
        
        // Handle server-side logic errors passed back to the client
        if (!response.ok) {
            console.error("Proxy Server returned an error:", result);
            return result.error || "System Error: Transaction failed at the proxy layer.";
        }

        // Return the clean text content extracted by the proxy server
        return result.content;

    } catch (error) {
        // Handle physical network-level errors (e.g., the Node server is not running)
        console.error("Frontend Communication Error:", error);
        return "Connection Error: Unable to reach the secure NexaChat core server. Ensure your Node.js backend is running.";
    }
}