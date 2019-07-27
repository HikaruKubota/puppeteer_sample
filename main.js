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
    var data = {
      title: await (await title.getProperty('textContent')).jsonValue(),
      href: await (await href.getProperty('href')).jsonValue(),
    };
    datas.push(data);
  }
  console.log(datas);


  await browser.close();
})();
