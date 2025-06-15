const fs = require("fs");
const https = require("https");
const path = require("path");

// Create the directory if it doesn't exist
const dir = path.join(__dirname, "public", "images", "backgrounds");
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Background image URLs (free-to-use images)
const backgrounds = {
  "home-bg.jpg":
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
  "about-bg.jpg":
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop",
  "contact-bg.jpg":
    "https://images.unsplash.com/photo-1486520299386-6d106b22014b?q=80&w=2069&auto=format&fit=crop",
  "signin-bg.jpg":
    "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2013&auto=format&fit=crop",
  "signup-bg.jpg":
    "https://images.unsplash.com/photo-1510797215324-95aa89f43c33?q=80&w=2035&auto=format&fit=crop",
  "dashboard-bg.jpg":
    "https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?q=80&w=2070&auto=format&fit=crop",
};

// Download each image
Object.entries(backgrounds).forEach(([filename, url]) => {
  const filePath = path.join(dir, filename);
  const file = fs.createWriteStream(filePath);

  console.log(`Downloading ${filename}...`);

  https
    .get(url, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log(`Downloaded ${filename}`);
      });
    })
    .on("error", (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there was an error
      console.error(`Error downloading ${filename}: ${err.message}`);
    });
});
