# Video Assets

## Required Files

Place the following video files in this directory:

1. **hotel-lobby.mp4** - Main video file (MP4 format, target size: 3-5MB)
2. **hotel-lobby.webm** - WebM version for browser compatibility
3. **posters/lobby-poster.jpg** - Poster image displayed while video loads

## How to Get the Video

### Download Source Video:
1. Go to: https://www.pexels.com/video/interior-of-a-hotel-lobby-4667177/
2. Download the video (Free, no account needed)

### Compress Video:
1. Go to: https://www.freeconvert.com/video-compressor
2. Upload the downloaded video
3. Set quality to "Medium" (target: 3-5MB)
4. Download compressed video as `hotel-lobby.mp4`

### Create WebM Version (Optional but Recommended):
1. Go to: https://cloudconvert.com/mp4-to-webm
2. Upload your MP4
3. Convert and download as `hotel-lobby.webm`

### Create Poster Image:
1. Take a screenshot of the video at 3 seconds
2. Save as `lobby-poster.jpg` in the `posters/` folder

## File Structure

```
public/
└── videos/
    ├── hotel-lobby.mp4     (Required - MP4 video)
    ├── hotel-lobby.webm    (Optional - WebM video for better browser support)
    ├── posters/
    │   └── lobby-poster.jpg (Required - Poster image)
    └── README.md           (This file)
```

## Performance Tips

- Keep video file under 5MB for optimal loading
- Use H.264 codec for MP4
- Use VP9 codec for WebM
- Poster image should be under 200KB
- Recommended video resolution: 1920x1080
- Recommended video length: 10-30 seconds (will loop)

## Fallback

If video files are not present, the hero section will display a gradient background instead.
