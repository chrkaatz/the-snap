const test = require('ava');
const { shot: screenshot, pdf } = require('./capture');
const fs = require('fs');

test('create screenshots', async (t) => {
  const screenshotBuffer = await screenshot({ url: 'https://www.google.com' });
  t.assert(
    screenshotBuffer.toString('binary').length > 1,
    'Should have generated a screenshot',
  );
});
test('create screenshot by selector', async (t) => {
  const screenshotSelectorBuffer = await screenshot({
    url: 'https://card-joy.web.app/v?img=c1&t=Merry%20Christmas!&p=topLeft',
    selector: '#root > div > div > div > img',
  });
  t.assert(
    screenshotSelectorBuffer.toString('binary').length > 1,
    'Should have generated a screenshot',
  );
});
test('create pdf', async (t) => {
  const generated = await pdf({ url: 'https://www.google.com' });
  t.assert(generated.length > 0, 'Should have generated a pdf');
});
