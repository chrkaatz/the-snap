const { shot: screenshot } = require('./shot');
const fs = require('fs');

(async () => {
  const buffer = await screenshot({ url: 'https://www.google.com' });
  fs.writeFileSync('screenshot.png', buffer.toString('binary'), 'binary');
  const encoded = encodeURIComponent('#root > div > div > div > img');
  console.log({ encoded });
  console.log(decodeURIComponent(encoded));
  const buffer2 = await screenshot({
    url: 'https://card-joy.web.app/v?img=c1&t=Merry%20Christmas!&p=topLeft',
    selector: '#root > div > div > div > img',
  });
  fs.writeFileSync(
    'screenshotSelector.png',
    buffer2.toString('binary'),
    'binary',
  );
})();
