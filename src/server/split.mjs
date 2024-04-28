import fs from 'fs';
import path from 'path';

const splitFiles = (sourceFolder, destFolder1, destFolder2, ratio) => {
  fs.readdir(sourceFolder, (err, files) => {
    if (err) {
      console.error(`Failed to read directory: ${err}`);
      return;
    }

    // Shuffle the array
    for (let i = files.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [files[i], files[j]] = [files[j], files[i]];
    }

    const splitIndex = Math.round(files.length * ratio);

    files.forEach((file, index) => {
      const sourcePath = path.join(sourceFolder, file);
      const destinationFolder = index < splitIndex ? destFolder1 : destFolder2;
      const destinationPath = path.join(destinationFolder, file);

      fs.rename(sourcePath, destinationPath, (err) => {
        if (err) {
          console.error(`Failed to move ${file}: ${err}`);
        } else {
          console.log(`Moved ${file} to ${destinationFolder}`);
        }
      });
    });
  });
};

// Usage:
splitFiles('export/v2/classic', 'export/v2/train/classic', 'export/v2/valid/classic', 0.9);
splitFiles('export/v2/packshot', 'export/v2/train/packshot', 'export/v2/valid/packshot', 0.9);