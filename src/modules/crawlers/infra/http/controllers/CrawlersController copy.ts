import { Request, Response } from 'express';
import * as puppeteer from 'puppeteer';
// import { Builder, Browser, By, Key, until } from 'selenium-webdriver';
// import chrome from 'selenium-webdriver/chrome';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';
import ICreateCrawlersDTO from '@modules/crawlers/dtos/ICreateCrawlersDTO';

export default class CrawlersController {
  public async newResearch(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { login, password, cpf } = request.body.data;

    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();

    await page
      .goto(
        'http://ionic-application.s3-website-sa-east-1.amazonaws.com/login',
        {
          waitUntil: 'networkidle0',
        }
      )
      .then(async () => {
        //logando na plataforma
        await page.type('input[type="text"]', login);
        await page.type('input[type="password"]', password);
        await page.click('input[type="submit"]');

        await page.waitForTimeout(6000).then(async () => {
          //console.log('Carregado!!');

          //fechar o modal
          await page.click(
            '#ion-overlay-1 > div.modal-wrapper.ion-overlay-wrapper.sc-ion-modal-md > app-modal-fila > ion-button',
            { delay: 2000 }
          );

          await page.click(
            'body > app-root > app-home > ion-app > ion-menu > ion-content > ion-list > ion-item:nth-child(2)',
            { delay: 2000 }
          );

          // const elem = await page.$('#main');

          // const rect = await page.evaluate((el) => {
          //   const { top, left, width, height } = el.getBoundingClientRect();
          //   return { top, left, width, height };
          // }, elem);

          // let x = null;
          // let y = null;

          // // Use given position or default to center
          // const _x = x !== null ? x : rect.width / 2;
          // const _y = y !== null ? y : rect.height / 2;

          // await page.mouse.click(rect.left + _x, rect.top + _y, {
          //   delay: 2000,
          // });

          //botão de benefícios
          await page.click(
            '#menudeopcoes > ion-card > ion-row:nth-child(3) > ion-col:nth-child(1) > ion-button',
            { delay: 1000 }
          );

          // //campo cpf
          // await page.type(
          //   '#menudeopcoes > ion-grid > ion-row > ion-col > ion-card > ion-item > ion-input > input',
          //   cpf
          // );
        });
      });

    return response.json({ data: classToClass({ login, password, cpf }) });
  }

  public async findByCpf(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { cpf } = request.query;

    return response.json({ data: classToClass(cpf) });
  }
}
