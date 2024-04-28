
import fs from 'fs';
import PQueue from 'p-queue';
import { images } from './images.js';
import { Readable } from 'stream';
import { finished } from 'stream/promises';


const downloadImage = async (url) => {
    const name = url.split('/prod/').pop().replace(/\//g, '-');
    const stream = fs.createWriteStream("images/"+ name);
    const { body } = await fetch(url);
    await finished(Readable.fromWeb(body).pipe(stream));
    return name
}

const queue = new PQueue({concurrency:10})
const main = async () => {
    const urlMatching = {}
    for (const url of images) {
         queue.add(async () => {
            const destinationName =await  downloadImage(url.replace(":fit:0:0", ":force:200:200"))
            urlMatching[url] = destinationName
        })
    }
    await queue.onIdle()
    fs.writeFileSync('urlMatching.json', JSON.stringify(urlMatching))
}

main().catch(console.error)