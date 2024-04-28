import fs from 'fs';
import path from 'path';

import matching  from './urlMatching.json' with { type: "json" };

const moveImages = (dictionary) => {
  for (const [image, property] of Object.entries(dictionary)) {
    const imagePath = matching[image];
    if (!imagePath) {
      continue;
    }
    const sourcePath = path.join('images', imagePath);
    const destinationFolder = property === 'left' ? 'classic' : 'packshot';
    const destinationPath = path.join(destinationFolder, imagePath);

    fs.rename(sourcePath, destinationPath, (err) => {
      if (err) {
        console.error(`Failed to move ${image}: ${err}`);
      } else {
        console.log(`Moved ${image} to ${destinationFolder}`);
      }
    });
  }
};

import classifiedImages from './backup-28-04-17-10.json' with { type: "json" };
moveImages(classifiedImages);