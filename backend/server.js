require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Main mock AI generation endpoint
app.post('/api/generate', (req, res) => {
    const { prompt } = req.body;
    
    console.log(`Received prompt: ${prompt}`);

    // Mock response simulating an AI returning a complete project structure
    // This provides a standard HTML/Tailwind portfolio structure as a placeholder.
    const mockProject = {
        name: "generated-project",
        structure: [
            {
                type: "file",
                name: "index.html",
                content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white font-sans antialiased">
    <header class="p-6 border-b border-gray-800 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-blue-400">DevPortfolio</h1>
        <nav class="space-x-4">
            <a href="#about" class="hover:text-blue-400 transition-colors">About</a>
            <a href="#contact" class="hover:text-blue-400 transition-colors">Contact</a>
        </nav>
    </header>
    
    <main class="container mx-auto p-8 mt-10">
        <section id="hero" class="text-center mb-20 animate-fade-in-up">
            <h2 class="text-5xl font-extrabold mb-4">Hello, I'm a Developer</h2>
            <p class="text-gray-400 text-xl mb-8">I build beautiful and functional web applications.</p>
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105">
                View My Work
            </button>
        </section>

        <section id="contact" class="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-lg mx-auto">
            <h3 class="text-2xl font-bold mb-6 text-center border-b border-gray-700 pb-4">Get In Touch</h3>
            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-1 text-gray-400">Name</label>
                    <input type="text" class="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="Your Name" />
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1 text-gray-400">Email</label>
                    <input type="email" class="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="your@email.com" />
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1 text-gray-400">Message</label>
                    <textarea class="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white h-32 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="Your message..."></textarea>
                </div>
                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors shadow-md">
                    Send Message
                </button>
            </form>
        </section>
    </main>
    
    <footer class="text-center p-6 text-gray-500 mt-20 border-t border-gray-800">
        &copy; 2026 DevPortfolio. Built with AI.
    </footer>
</body>
</html>`
            },
            {
                type: "folder",
                name: "css",
                children: [
                    {
                        type: "file",
                        name: "style.css",
                        content: `/* Custom styles specifically requested */\nbody {\n  scroll-behavior: smooth;\n}\n.animate-fade-in-up {\n  animation: fadeInUp 0.8s ease-out forwards;\n}\n@keyframes fadeInUp {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}`
                    }
                ]
            },
            {
                type: "folder",
                name: "js",
                children: [
                    {
                        type: "file",
                        name: "main.js",
                        content: `// Placeholder for JavaScript interactions\ndocument.querySelector('form').addEventListener('submit', (e) => {\n    e.preventDefault();\n    alert('Thanks for your message! This is a mock interaction.');\n});`
                    }
                ]
            }
        ],
        tips: [
            "You can change the primary color by modifying the `bg-blue-600` classes to another Tailwind color.",
            "To add new sections, copy the hero or contact <section> and update its content.",
            "Check out Tailwind UI or Flowbite for more pre-built components you can paste in."
        ]
    };

    // Simulate AI generation delay
    setTimeout(() => {
        res.json(mockProject);
    }, 2500);
});
app.listen(PORT, () => {
    console.log("Backend server running on http://localhost:" + PORT);
    console.log('Ready to receive Mock AI generation requests.');
});
