const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    handless: false,
    slowMo: 50,
  });

  const page = await browser.newPage({
    waitUntil: 'domcontentloaded'
  });
  //クラウドワークス 新着 プログラミング
  await page.goto('https://crowdworks.jp/public/jobs/search?search%5Bkeywords%5D=%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0&keep_search_criteria=true&order=new&hide_expired=true');
  var lists = await page.$$('.job_data_row');
  var datas = [];
  for (const list of lists) {
    const title = await list.$('.summary > h3');
    const href = await title.$('a');
    const entry_data = await list.$('.entry > .entry_data_row > .entry_data > .inner_cell');
    const payment_label  = await entry_data.$('.payment_label');
    const amount  = await entry_data.$('.amount');

    var data = {
      title: await (await title.getProperty('textContent')).jsonValue(),
      href: await (await href.getProperty('href')).jsonValue(),
      payment_label: await (await payment_label.getProperty('textContent')).jsonValue(),
      amount: await (await amount.getProperty('textContent')).jsonValue(),
    };
    datas.push(data);
  }
  console.log(datas);

  await browser.close();
})();
