import sharp from 'sharp'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = resolve(__dirname, '../public/images/logo.jpg')
const out = resolve(__dirname, '../public')

await sharp(src).resize(192, 192).toFile(`${out}/icon-192.png`)
console.log('✓ icon-192.png')

await sharp(src).resize(512, 512).toFile(`${out}/icon-512.png`)
console.log('✓ icon-512.png')

await sharp(src).resize(180, 180).toFile(`${out}/apple-touch-icon.png`)
console.log('✓ apple-touch-icon.png')
