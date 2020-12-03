import { electron, ElectronApplication, ElectronPage, Page } from 'playwright-electron';
// import assert from 'assert';
// import electronAll from 'electron';
// import path from 'path';
import { delay } from './utils/delay';

// describe('Sanity checks', function () {
//   // this.timeout(10000);

//   let app: any;

//   beforeEach(async () => {
//     // Before each test start Electron application.
//     app = await electron.launch(electronAll as any, {
//       // path: (electronAll as unknown) as string,
//       args: [path.join(__dirname, 'main.prod.js')], // loads index.js
//     });
//   });

//   afterEach(async () => {
//     // After each test close Electron application.
//     await app.close();
//   });

//   test('script application', async () => {
//     const appPath = await app.evaluate(({ app }: any) => {
//       // This runs in the main Electron process, first parameter is
//       // the result of the require('electron') in the main app script.
//       return app.getAppPath();
//     });
//     expect(true).toBeTruthy();
//   });

//   // it('window title', async () => {
//   //   // Return value of this.app.firstWindow a Playwright Page.
//   //   // See https://playwright.dev/#path=docs%2Fapi.md&q=class-page.

//   //   // Get a Playwright page for the first Electron window.
//   //   // It awaits for the page to be available. Alternatively use
//   //   // this.app.windows() or this.app.waitForEvent('window').
//   //   const page = await this.app.firstWindow();
//   //   assert.equal(await page.title(), 'Hello World!');
//   // });

//   // it('capture screenshot', async () => {
//   //   const page = await this.app.firstWindow();

//   //   // Capture window screenshot.
//   //   await page.screenshot({ path: 'intro.png' });
//   // });

//   // it('sniff console', async () => {
//   //   const page = await this.app.firstWindow();

//   //   // Collect console logs.
//   //   let consoleText;
//   //   page.on('console', message => (consoleText = message.text()));

//   //   // Click button.
//   //   await page.click('text=Click me');

//   //   // Check that click produced console message.
//   //   assert.equal(consoleText, 'click');
//   // });

//   // it('intercept network', async () => {
//   //   await this.app.firstWindow();

//   //   // Return value of this.app.context() is a Playwright BrowserContext.
//   //   // See https://playwright.dev/#path=docs%2Fapi.md&q=class-browsercontext.

//   //   await await this.app.context().route('**/empty.html', (route, request) => {
//   //     route.fulfill({
//   //       status: 200,
//   //       contentType: 'text/html',
//   //       body: '<title>Hello World</title>',
//   //     });
//   //   });

//   //   // Helper method to create BrowserWindow.
//   //   const page = await this.app.newBrowserWindow({ width: 800, height: 600 });
//   //   await page.goto('https://localhost:1000/empty.html');

//   //   assert.equal(await page.title(), 'Hello World');
//   // });

//   // it('should maximize window', async () => {
//   //   await this.app.firstWindow();

//   //   const page = await this.app.newBrowserWindow({ width: 800, height: 600 });
//   //   // page.browserWindow is a Playwright JSHandle pointing at Electron's
//   //   // BrowserWindow.
//   //   // https://playwright.dev/#path=docs%2Fapi.md&q=class-jshandle
//   //   await page.browserWindow.evaluate(browserWindow => browserWindow.maximize());
//   // });
// });
import { Application } from 'spectron';
import electronPath from 'electron';
import path from 'path';

describe('aaaaaaa', () => {
  let app: ElectronApplication;
  let page: ElectronPage;

  beforeAll(async () => {
    // app = new Application({
    //   path: electronPath as any,
    //   args: [path.join(__dirname, 'main.prod.js')],
    // });

    app = await electron.launch(electronPath as any, {
      // cwd: (electronPath as unknown) as string,
      args: [path.join(__dirname, 'main.prod.js')],
    });

    // return app.start();
  }, 30000);

  beforeEach(async () => {
    page = await app.firstWindow();
  });

  afterAll(async () => await app.close());
  // afterAll(() => {
  //   if (app && app.isRunning()) {
  //     return app.stop();
  //   }
  //   return null;
  // });

  test('Displays App window', async () => {
    await delay(1000);
    const c = page.browserWindow;

    // const mainFrame = await page.innerHTML('body');
    // console.log(mainFrame);
    // const btn = await mainFrame.$('[data-xxx]');
    // if (btn === null) throw new Error('btn null');
    // await btn.click();
    // await window.screenshot({ path: 'intro.png' });
    // console.log(window.);
    // await window.click('[data-xxx]');
    // const html = await buttons!.innerHTML();
    // console.log(html);
    // const xxx = await window.$('[data-test="btn-new-wallet"]');
    // const xxx = await window.$('body');
    // console.log(xxx);
    // if (xxx === null) throw new Error('element is null');
    // await xxx.click();
    await delay(30000);
    expect(1).toBe(1);
  }, 30_0000);
});
