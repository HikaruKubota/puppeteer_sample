const puppeteer = require('puppeteer');
const my_module = require('./my_module');

(async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage({
    waitUntil: 'domcontentloaded'
  });
  //クラウドワークス 新着 システム開発
  await page.goto('https://crowdworks.jp/public/jobs/search?category_id=226&keep_search_criteria=true&order=new&hide_expired=true');

  let items = await page.$$('.item_body');
  let datas = await my_module.create_datas(items);

  const nowDate = new Date();
  console.log(
    datas.filter(date => {
      const DatPublished = date.DatPublished.replace(/\s+/g, "").split('：')[1];
      return nowDate.getDate() == DatPublished.slice(8,10);
    })
  );

  //クラウドワークス 新着 アプリ・スマートフォン開発
  await page.goto('https://crowdworks.jp/public/jobs/search?category_id=242&keep_search_criteria=true&order=new&hide_expired=true');

  items = await page.$$('.item_body');
  datas = await my_module.create_datas(items);

  console.log(
    datas.filter(date => {
      const DatPublished = date.DatPublished.replace(/\s+/g, "").split('：')[1];
      return nowDate.getDate() == DatPublished.slice(8,10);
    })
  );

  await browser.close();
})();
