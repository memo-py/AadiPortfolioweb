const https = require('https');
const fs = require('fs');
const path = require('path');

// Create audio directory if it doesn't exist
const audioDir = path.join(__dirname, 'assets', 'audio');
if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
}

// Sound effects URLs
const audioFiles = {
    'hover.mp3': 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
    'click.mp3': 'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3',
    'transition.mp3': 'https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3',
    'typing.mp3': 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3'
};

// Download each audio file
Object.entries(audioFiles).forEach(([filename, url]) => {
    const filepath = path.join(audioDir, filename);
    
    https.get(url, (response) => {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Downloaded: ${filename}`);
        });
    }).on('error', (err) => {
        console.error(`Error downloading ${filename}:`, err.message);
    });
}); 