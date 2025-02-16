import ytdl from '@distube/ytdl-core';
import express from 'express'
const app = express()



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res)=>{
    res.json({
        success: "This is root directory for KOMA!"
    })
})

app.post('/demo', (req, res) => {
    
    const data = req.body.bodyData;
    
    
    res.json({
        success: "This is the "+ data + "!"
    })

})




app.post("/download", async (req, res) => {
    try {
      const videoUrl = req.body.videoURL;
  
      if (!videoUrl) {
        return res.status(400).json({
          error: "Video URL is required",
        });
      }
  
      if (!ytdl.validateURL(videoUrl)) {
        return res.status(400).json({
          error: "Invalid Youtube Video URL!",
        });
      }
  
  
      
      
      // Get video info
    //   const proxyAgent = new HttpsProxyAgent("http://13.126.79.133:1080");
    //   const ytdlOptions = {
    //     requestOptions: {
    //       agent: proxyAgent,
    //       headers: {
    //         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
    //       }
    //     }
    //   };
      const info = await ytdl.getInfo(videoUrl);
  
      // Extracting video details
      const title = info.videoDetails.title;
      const description = info.videoDetails.description;
      const tags = info.videoDetails.keywords;
      const thumbnails = info.videoDetails.thumbnails;
      const views = info.videoDetails.viewCount;
      const likes = info.videoDetails.likes;
      const uploadDate = info.videoDetails.uploadDate;
      const author = info.videoDetails.author.name;
  
      // Extracting available download qualities (MP4 only) and removing duplicates
      const uniqueFormats = [];
      const seenQualities = new Set();
  
      info.formats.forEach((format) => {
        if (
          format.qualityLabel &&
          format.mimeType.includes("video/mp4") &&
          !seenQualities.has(format.qualityLabel)
        ) {
          seenQualities.add(format.qualityLabel);
          uniqueFormats.push({
            quality: format.qualityLabel,
            mimeType: format.mimeType,
            itag: format.itag,
            hasAudio: format.hasAudio,
            hasVideo: format.hasVideo,
            url: format.url,
          });
          
          // Sort uniqueFormats in ascending order by quality
          uniqueFormats.sort((a, b) => parseInt(a.quality) - parseInt(b.quality));
        }
      });
  
      // Send the extracted data as JSON response
      res.json({
        title,
        description,
        tags,
        thumbnails,
        views,
        likes,
        uploadDate,
        author,
        formats: uniqueFormats,
      });
  
      
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        error: "An error occurred while processing your request",
      });
    }
  });











app.listen(3000, () => {
    console.log("Server listening at: http://localhost:3000");
})