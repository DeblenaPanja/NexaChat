import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment secrets from the .env file
dotenv.config();

const app = express();
const PORT = 8000;

// Recreate __dirname tracking for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Demo mode flag (set to false when you have a valid NVIDIA API key)
const DEMO_MODE = process.env.DEMO_MODE === 'true' || !process.env.NVIDIA_API_KEY;

// Allow the server to read incoming JSON payloads
app.use(express.json());

// Serve your frontend assets automatically
app.use(express.static(__dirname));

// Demo responses for testing without a real API key
function getDemoResponse(userMessage) {
    const responses = [
        "That's an interesting question! In demo mode, I'm providing placeholder responses. To get real AI responses, please update your NVIDIA_API_KEY in the .env file with a valid API key from https://build.nvidia.com/",
        "I'd love to help you with that! However, I'm currently running in demo mode. Please configure a valid NVIDIA API key to enable real AI responses.",
        "Great question! This is a demo response. Once you add a valid NVIDIA API key, I can provide intelligent, context-aware answers.",
        "I understand. The app is working, but I need a valid NVIDIA API key to provide real AI-powered responses. Please update your .env file!"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Secure Proxy Route: The frontend talks here, hiding the key completely
app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        
        // Demo mode: Return mock responses for testing
        if (DEMO_MODE) {
            console.log("🎭 DEMO MODE - Returning mock response");
            const mockResponse = getDemoResponse(messages[messages.length - 1]?.content || '');
            return res.json({ content: mockResponse });
        }

        // Check if API key is loaded
        if (!process.env.NVIDIA_API_KEY) {
            console.error("❌ NVIDIA_API_KEY not found in environment variables!");
            return res.status(500).json({ error: "API key not configured on server. Set NVIDIA_API_KEY in .env file." });
        }

        // Inject system instructions safely on the server side
        const systemPrompt = { role: "system", content: "You are an expert technical assistant named NexaChat." };
        const payload = [systemPrompt, ...messages];

        console.log("🔄 Sending request to NVIDIA API...");
        const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`, // Safe inside the server environment
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "meta/llama-3.1-8b-instruct",
                messages: payload,
                max_tokens: 1024,
                temperature: 0.5
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.error("❌ NVIDIA API Response Status:", response.status);
            console.error("❌ NVIDIA API Error Response:", JSON.stringify(data, null, 2));
            
            if (response.status === 401) {
                throw new Error("Authentication failed: Invalid API key. Get a valid key from https://build.nvidia.com/");
            }
            throw new Error(data.detail || data.message || "Failed to reach NVIDIA endpoint");
        }

        console.log("✅ NVIDIA API Response received successfully");
        // Return only the text back to the user's browser
        res.json({ content: data.choices[0].message.content });

    } catch (error) {
        console.error("❌ Proxy Server Error:", error.message);
        res.status(500).json({ error: error.message || "Internal Server Error occurred safely." });
    }
});

// Start the server instance
app.listen(PORT, () => {
    if (DEMO_MODE) {
        console.log(`\n🎭 NexaChat Engine running in DEMO MODE (no valid API key)`);
        console.log(`📝 To enable real AI responses:`);
        console.log(`   1. Get an API key: https://build.nvidia.com/`);
        console.log(`   2. Update .env file with: NVIDIA_API_KEY="your-key-here"`);
        console.log(`   3. Restart the server\n`);
    } else {
        console.log(`\n✅ NexaChat Engine active at http://localhost:${PORT} with NVIDIA API`);
    }
    console.log(`🌐 http://localhost:${PORT}\n`);
});