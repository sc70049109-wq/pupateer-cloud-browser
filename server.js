const express = require('express');
const { chromium } = require('playwright');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


// Health check
app.get('/health', (req, res) => res.send('ok'));


// Navigate and return HTML
app.get('/browse', async (req, res) => {
const url = req.query.url;
if (!url) return res.status(400).send('Missing url parameter');


let browser;
try {
browser = await chromium.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
const content = await page.content();
res.send(content);
} catch (err) {
res.status(500).send('Error: ' + err.message);
} finally {
if (browser) await browser.close();
}
});


// Screenshot endpoint
app.get('/screenshot', async (req, res) => {
const url = req.query.url;
if (!url) return res.status(400).send('Missing url parameter');


let browser;
try {
browser = await chromium.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
const buffer = await page.screenshot({ fullPage: true });
res.set('Content-Type', 'image/png');
res.send(buffer);
} catch (err) {
res.status(500).send('Error: ' + err.message);
} finally {
if (browser) await browser.close();
}
});


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
