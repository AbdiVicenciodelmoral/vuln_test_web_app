const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
const PORT = 5000;

// THIS is where you change it:
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

app.post('/api/cors-test', (req, res) => {
    const targetUrl = req.body.url;

    const pythonProcess = spawn('python3', ['scanner/cors_scanner.py', targetUrl]);

    let output = '';
    pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        try {
            const parsed = JSON.parse(output);
            res.json(parsed);
        } catch (err) {
            res.json({ error: 'Error parsing scanner output', raw: output });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
