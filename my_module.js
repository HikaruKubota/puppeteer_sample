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

exports.dates_filter = (dates, nowDate) => {
  const result = dates.filter(date => {
    /*日付フィルター*/
    // 掲載日：YYYY年MM月DD日　→　YYYY年MM月DD日
    const DatPublished = date.DatPublished.replace(/\s+/g, '').split('：')[1];
    return nowDate.getDate() == DatPublished.slice(8,10);
  }).filter(date => {
    /*値段フィルター*/
    //報酬形態
    const payment_label = date.payment_label.replace(/\s+/g, '');
    //値段
    let amount = date.amount.replace(/\s+/g, '').replace(/,/g, '').replace(/円/g, '');
    const reg = /[^0-9]/;
    if(payment_label == '時間単価制') {
      if(amount.match(reg) && amount != '予算はメンバーと相談'){
        amount = amount.match(/[0-9]+/g).pop();
      }
      return +amount >= 3000 || amount == '予算はメンバーと相談';
    } else if(payment_label == '固定報酬制'){
      if(amount.match(reg) && amount != '予算はメンバーと相談'){
        amount = amount.match(/[0-9]+/g).pop();
      }
      return +amount >= 300000 || amount == '予算はメンバーと相談';
    }
  });
  return result;
}
