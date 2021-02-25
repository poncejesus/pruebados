//  const puppeteer = require('puppeteer')

//  async function scrapeProduct(url){
//      const browser = await puppeteer.launch();
//      const page = await browser.newPage();
//      await page.goto(url);

//     //  const [el] = await page.$x('//*[@id="landingImage"]');
//     //  const src = await el.getProperty('src');
//     //  const srcTxt = await src.jsonValue();

//      const [el2] = await page.$x('/html/body/div[7]/div/center/p');
//      const txt = await el2.getProperty('textContent');
//      const rawTxt = await txt.jsonValue();

//      await page.evaluate((text) => { (document.getElementById('valor')).value = text; }, "46765262");
//      await page.keyboard.press("Tab");
//      await page.keyboard.press("Tab");
//      await page.keyboard.press("Tab");
//      await page.keyboard.press("Tab");
//      await page.keyboard.press("Tab");
//      await page.keyboard.press("Tab");
//      await page.keyboard.press("Tab");
//      await page.keyboard.press("Tab");
//      await page.keyboard.press("Tab");
//      await page.keyboard.press("Enter");
//      await page.waitFor(3000);
//      await page.screenshot({path: 'example.png', fullPage: true});
//      await page.screenshot({path: 'example2.png', fullPage: true});
//      await page.screenshot({path: 'example3.png', fullPage: true});
     
//      //  console.log({srcTxt, rawTxt});
     
//      console.log({rawTxt});

//      browser.close();
//  }
//  scrapeProduct('https://ventanillaunica.gob.mx/vucem/doda.html');


/* */



// const puppeteer = require('puppeteer')

// async function scrapeProduct(url){
//     const browser = await puppeteer.launch({headless:false});
//     const page = await browser.newPage();
//     await page.waitFor(3000);

//     await page.goto('https://ventanillaunica.gob.mx/vucem/doda.html');

//     await page.type('#valor', '46765262');
//     await page.waitFor(3000);

//     /*await Promise.all([
//         page.waitForNavigation(),
//         page.click('.container [onclick="buscar()"]')
//     ]);*/
// await page.click('.container [onclick="buscar()"]');
// await page.waitFor(3000);
// await page.click('.container [onclick="buscar()"]');
// await page.waitFor(3000);
// await page.waitFor(3000);
// await page.screenshot({path: 'example.png', fullPage: true});
// await page.screenshot({path: 'example2.png', fullPage: true});
// await page.screenshot({path: 'example3.png', fullPage: true});

// await page.waitFor(3000);

// await page.waitFor(3000);
// // const asd = document.getElementById('j_idt17:1:j_idt19:j_idt23')
// // console.log(asd)

// // const newPage = await page.evaluate(() => {

// //     return  document.getElementById("j_idt17:1:j_idt19:j_idt23").innerHTML;

// //     });
// //     console.log(newPage)

//     console.log('a')
//     console.log('b')
//     var idPost //define a global variable
// function updateVariables(){
//     idPost = document.querySelector("#j_idt12\\:1\\:j_idt13\\:j_idt15 > tbody > tr:nth-child(2) > td").innerText; //update the global variable
// }
// await page.waitFor(3000);
// console.log(idPost);

// //  const aHandle = await page.evaluateHandle(() => document.querySelectorAll('#j_idt17:1:j_idt19:j_idt23'> 'tbody' > 'tr' > 'tr' > 'td' > 'br'));
// //  const resultHandle = await page.evaluateHandle(body => body.innerHTML, aHandle);
// //  console.log(await resultHandle.jsonValue());
// //  await resultHandle.dispose();


// //    browser.close();
// }
// scrapeProduct('https://ventanillaunica.gob.mx/vucem/doda.html');








//--------------*probando directamente*--------------
const pruebaModulo = function () {
    const puppeteer = require('puppeteer')
    
    
    var numeroInt = '46765262' 
    
    async function scrapeProduct(url){
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.waitFor(3000);
        //46765262
        await page.goto('https://pecem.mat.sat.gob.mx/app/qr/ce/faces/pages/mobile/validadorqr.jsf?D1=16&D2=1&D3='+numeroInt);
        
        
        await page.waitFor(3000);
        await page.screenshot({path: 'example.png', fullPage: true});
        await page.screenshot({path: 'example2.png', fullPage: true});
        await page.screenshot({path: 'example3.png', fullPage: true});
        
        await page.waitFor(3000);
        console.log('***********************')
        
        await page.waitForSelector('#j_idt12\\:1\\:j_idt13\\:j_idt15 > tbody > tr:nth-child(2) > td');
        const textContent = await page.evaluate(() => {
            return document.querySelector('#j_idt12\\:1\\:j_idt13\\:j_idt15 > tbody > tr:nth-child(2) > td').innerText;
        });
        console.log(textContent); 
        
        await page.waitForSelector("#j_idt12\\:2\\:j_idt13\\:j_idt28 > li.ui-li.ui-li-static.ui-body-c.ui-corner-top");
        const cajaContent = await page.evaluate(() => {
            return document.querySelector("#j_idt12\\:2\\:j_idt13\\:j_idt28 > li.ui-li.ui-li-static.ui-body-c.ui-corner-top").innerText;
        });
        console.log(cajaContent); 
        
        
        browser.close();
    }
    scrapeProduct('https://pecem.mat.sat.gob.mx/app/qr/ce/faces/pages/mobile/validadorqr.jsf?D1=16&D2=1&D3='+numeroInt);
    
}
module.exports = pruebaModulo;