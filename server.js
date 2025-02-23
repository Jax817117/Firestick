// Node.js (server.js)
const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' directory

app.post('/adb', (req, res) => {
    const command = req.body.command;
    exec(`adb shell ${command}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            res.status(500).send(stderr);
            return;
        }
        res.send(stdout);
    });
});

app.listen(port, () => {
    console.log(`ADB server listening at http://localhost:${port}`);
});

