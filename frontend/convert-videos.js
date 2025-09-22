const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);
const fs = require('fs');
const path = require('path');

const videoDir = path.join(__dirname, 'public', 'photos', 'videos');

fs.readdir(videoDir, (err, files) => {
    if (err) {
        console.error('Could not list the directory.', err);
        process.exit(1);
    }

    files.forEach((file, index) => {
        if (path.extname(file).toLowerCase() === '.mov') {
            const inputPath = path.join(videoDir, file);
            const outputPath = path.join(videoDir, `${path.basename(file, '.MOV')}.mp4`);

            ffmpeg(inputPath)
                .toFormat('mp4')
                .on('end', () => {
                    console.log(`Successfully converted ${file}`);
                })
                .on('error', (err) => {
                    console.error(`Error converting ${file}:`, err);
                })
                .save(outputPath);
        }
    });
});