import puppeteer from 'puppeteer';
import logPuppeteerMessage from '../../../utilities/log-puppeteer-message';
import wait from '../../../utilities/wait';

describe('TimerPlay', () => {
  const playUrl =
    'http://localhost:3000/timer/play?id=-Kz6R2u9NrhpXpKFtSln&userId=NiEM9XBMrRfwxe93JOgTd2JiP4z2';
  const detailsUrl =
    'http://localhost:3000/timer?id=-Kz6R2u9NrhpXpKFtSln&userId=NiEM9XBMrRfwxe93JOgTd2JiP4z2';
  let browser;
  let page;
  let start;

  beforeEach(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    page = await browser.newPage();

    page.on('console', logPuppeteerMessage);

    await page.goto(playUrl, { waitUntil: 'networkidle2' });

    await page.evaluate(() => {
      const playButton = document.getElementById('timer-controls-play');

      playButton.click();
    });

    start = Date.now();
  }, 1000 * 10);

  afterEach(async () => {
    await browser.close();
  });

  it(
    'should wait ',
    async () => {
      await expectBigTime(page, start);

      await wait(1000 * 3.25);

      await expectBigTime(page, start);

      await page.goto(detailsUrl, { waitUntil: 'networkidle2' });

      await wait(1000 * 3);

      await page.goto(playUrl, { waitUntil: 'networkidle2' });

      await expectBigTime(page, start);
    },
    1000 * 15
  );

  async function expectBigTime(page, start) {
    const bigTime = await getBigTimeText(page);
    const startDiffSeconds = (Date.now() - start) / 1000;
    const bigTimeSeconds = +bigTime.split(':').pop();
    const bigTimeSecondsElapsed = 60 - (+bigTime.split(':').pop() || 60);

    const diff = Math.abs(startDiffSeconds - bigTimeSecondsElapsed);
    const success = diff < 0.5;

    if (!success) {
      console.info({ diff, startDiffSeconds, bigTimeSecondsElapsed, startDiffSeconds });
    }

    expect(success).toEqual(true);
  }

  async function getBigTimeText(page) {
    return page.evaluate(() => {
      bigTime = document.querySelector('.big-time');

      return bigTime && bigTime.textContent;
    });
  }
});
