// import ytdl from "@distube/ytdl-core";
// import express from "express";
// import YTDlpWrapPkg from 'yt-dlp-wrap';
// import bodyParser from "body-parser";

// import fs from 'fs';
// import path from "path";
// const app = express();

// app.use(bodyParser.json())
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());




// const YTDlpWrap = YTDlpWrapPkg.default;


// const binaryPath = path.join('binaries', 'yt-dlp.exe');
// const ytDlp = new YTDlpWrap(binaryPath);


// // Check if the binary exists
// if (!fs.existsSync(binaryPath)) {
//     console.error('yt-dlp binary not found! Please check the path.');
//     process.exit(1);
// } else {
//     console.log('yt-dlp binary found.');
// }




// app.get("/", (req, res) => {
//   res.json({
//     success: "This is root directory for KOMA!",
//   });
// });

// app.post("/demo", (req, res) => {
//     const data = req.body.bodyData;
    
//     res.json({
//         success: "This is the " + data + "!",
//     });
// });

// // app.post("/download", async (req, res) => {
// //     try {
// //       const videoUrl = req.body.videoURL;

// //       if (!videoUrl) {
// //         return res.status(400).json({
// //           error: "Video URL is required",
// //         });
// //       }

// //       if (!ytdl.validateURL(videoUrl)) {
// //         return res.status(400).json({
// //           error: "Invalid Youtube Video URL!",
// //         });
// //       }

// //       // Get video info
// //     //   const proxyAgent = new HttpsProxyAgent("http://13.126.79.133:1080");
// //     //   const ytdlOptions = {
// //     //     requestOptions: {
// //     //       agent: proxyAgent,
// //     //       headers: {
// //     //         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
// //     //       }
// //     //     }
// //     //   };
// //       const info = await ytdl.getInfo(videoUrl);

// //       // Extracting video details
// //       const title = info.videoDetails.title;
// //       const description = info.videoDetails.description;
// //       const tags = info.videoDetails.keywords;
// //       const thumbnails = info.videoDetails.thumbnails;
// //       const views = info.videoDetails.viewCount;
// //       const likes = info.videoDetails.likes;
// //       const uploadDate = info.videoDetails.uploadDate;
// //       const author = info.videoDetails.author.name;

// //       // Extracting available download qualities (MP4 only) and removing duplicates
// //       const uniqueFormats = [];
// //       const seenQualities = new Set();

// //       info.formats.forEach((format) => {
// //         if (
// //           format.qualityLabel &&
// //           format.mimeType.includes("video/mp4") &&
// //           !seenQualities.has(format.qualityLabel)
// //         ) {
// //           seenQualities.add(format.qualityLabel);
// //           uniqueFormats.push({
// //             quality: format.qualityLabel,
// //             mimeType: format.mimeType,
// //             itag: format.itag,
// //             hasAudio: format.hasAudio,
// //             hasVideo: format.hasVideo,
// //             url: format.url,
// //           });

// //           // Sort uniqueFormats in ascending order by quality
// //           uniqueFormats.sort((a, b) => parseInt(a.quality) - parseInt(b.quality));
// //         }
// //       });

// //       // Send the extracted data as JSON response
// //       res.json({
// //         title,
// //         description,
// //         tags,
// //         thumbnails,
// //         views,
// //         likes,
// //         uploadDate,
// //         author,
// //         formats: uniqueFormats,
// //       });

// //     } catch (error) {
// //       console.error("Error:", error);
// //       res.status(500).json({
// //         error: "An error occurred while processing your request",
// //       });
// //     }
// //   });



// // Route to get video info



// app.post('/getInfo', async (req, res) => {
//     const url = req.body.url;

//     if (!url) {
//         return res.status(400).json({ success: false, message: 'URL is required' });
//     }

//     try {
//         // Use getVideoInfo for simpler usage
//         const videoInfo = await ytDlp.getVideoInfo(url);

//         res.json({
//             success: true,
//             title: videoInfo.title,
//             uploader: videoInfo.uploader,
//             thumbnail: videoInfo.thumbnail,
//             duration: videoInfo.duration,
//             viewCount: videoInfo.view_count,
//             formats: videoInfo.formats
//         });
//     } catch (err) {
//         console.error('Failed to get video info:', err);
//         res.status(500).json({ success: false, message: 'Failed to get video info' });
//     }
// });


// app.listen(3000, () => {
//   console.log("Server listening at: http://localhost:3000");
// });













import ytdl from "@distube/ytdl-core";
import express from "express";
import YTDlpWrapPkg from 'yt-dlp-wrap';
import bodyParser from "body-parser";

import fs from 'fs';
import path from "path";
const app = express();

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




const YTDlpWrap = YTDlpWrapPkg.default;




const binaryPath = './binaries/yt-dlp';

// Function to download yt-dlp if it doesn't exist
async function downloadYtDlp() {
    if (!fs.existsSync(binaryPath)) {
        console.log('Downloading yt-dlp...');
        const res = await fetch('https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp');
        const fileStream = fs.createWriteStream(binaryPath);
        await new Promise((resolve, reject) => {
            res.body.pipe(fileStream);
            res.body.on('error', reject);
            fileStream.on('finish', resolve);
        });
        execSync(`chmod +x ${binaryPath}`); // Make it executable
        console.log('yt-dlp downloaded successfully.');
    }
}

// Call this function at the start of your app
await downloadYtDlp();

const ytDlp = new YTDlpWrap(binaryPath);





// Check if the binary exists
if (!fs.existsSync(binaryPath)) {
    console.error('yt-dlp binary not found! Please check the path.');
    process.exit(1);
} else {
    console.log('yt-dlp binary found.');
}







app.get("/", (req, res) => {
  res.json({
    success: "This is root directory for KOMA!",
  });
});

app.post("/demo", (req, res) => {
    const data = req.body.bodyData;
    
    res.json({
        success: "This is the " + data + "!",
    });
});



app.post('/getInfo', async (req, res) => {
    const url = req.body.url;

    if (!url) {
        return res.status(400).json({ success: false, message: 'URL is required' });
    }

    try {
        // Use getVideoInfo for simpler usage
        const videoInfo = await ytDlp.getVideoInfo(url);

        res.json({
            success: true,
            title: videoInfo.title,
            uploader: videoInfo.uploader,
            thumbnail: videoInfo.thumbnail,
            duration: videoInfo.duration,
            viewCount: videoInfo.view_count,
            formats: videoInfo.formats
        });
    } catch (err) {
        console.error('Failed to get video info:', err);
        res.status(500).json({ success: false, message: 'Failed to get video info' });
    }
});


app.listen(3000, () => {
  console.log("Server listening at: http://localhost:3000");
});
