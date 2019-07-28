const puppeteer = require('puppeteer');

exports.create_datas = async items => {
  const datas = [];
  for (const item of items) {
    const title = await item.$('.job_data_row > .summary > h3');
    const href = await title.$('a');
    const entry_data = await item.$('.job_data_row > .entry > .entry_data_row > .entry_data > .inner_cell');
    const payment_label = await entry_data.$('.payment_label');
    const amount = await entry_data.$('.amount');
    const DatPublished = await item.$('.item_meta > .post_date');

    let data = {
      title: await (await title.getProperty('textContent')).jsonValue(),
      href: await (await href.getProperty('href')).jsonValue(),
      payment_label: await (await payment_label.getProperty('textContent')).jsonValue(),
      amount: await (await amount.getProperty('textContent')).jsonValue(),
      DatPublished: await (await DatPublished.getProperty('textContent')).jsonValue(),
    };
    datas.push(data);
  }
  return datas;
}
