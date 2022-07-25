import { Request, Response } from 'express';
import * as puppeteer from 'puppeteer';
// import { Builder, Browser, By, Key, until } from 'selenium-webdriver';
// import chrome from 'selenium-webdriver/chrome';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';
import AppError from '@shared/errors/AppError';

export default class CrawlersController {
  public async newResearch(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { login, password, cpf } = request.body.data;

    //criar o Objeto que retornará os dados dos benefícios
    let beneficios: string[] = [];

    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();

    await page
      .goto(
        'http://ionic-application.s3-website-sa-east-1.amazonaws.com/login',
        {
          waitUntil: 'networkidle0',
          timeout: 60000,
        }
      )
      .then(async () => {
        //logando na plataforma
        await page.type('input[type="text"]', login);
        await page.type('input[type="password"]', password);
        await page.click('input[type="submit"]');

        await page.waitForTimeout(3000).then(async () => {
          //console.log('Carregado!!');

          //fechar o modal
          await page.click(
            '#ion-overlay-1 > div.modal-wrapper.ion-overlay-wrapper.sc-ion-modal-md > app-modal-fila > ion-button',
            { delay: 1000 }
          );

          //menu extrato
          await page.click(
            'body > app-root > app-home > ion-app > ion-menu > ion-content > ion-list > ion-item:nth-child(2)',
            { delay: 1000 }
          );
        });

        await page.waitForTimeout(3000).then(async () => {
          //botão de benefícios
          await page.click(
            '#menudeopcoes > ion-card > ion-row:nth-child(3) > ion-col:nth-child(1) > ion-button',
            { delay: 1000 }
          );

          //campo cpf
          await page.type(
            '#menudeopcoes > ion-grid > ion-row > ion-col > ion-card > ion-item > ion-input > input',
            cpf,
            { delay: 100 }
          );

          //botão de Procurar
          await page.click(
            '#menudeopcoes > ion-grid > ion-row > ion-col > ion-card > ion-button',
            { delay: 1000 }
          );
        });

        // esperar o carregamento dos dados
        await page
          .waitForTimeout(2000)
          .then(async () => {
            const beneficiosArray = await page.evaluate(() =>
              Array.from(
                document.querySelectorAll(
                  '#menudeopcoes > ion-grid > ion-row > ion-col > ion-card > ion-item'
                ),
                (element) => element.textContent
              )
            );

            //criar o JSON de retorno

            if (beneficiosArray.length > 1) {
              beneficiosArray.forEach((item) => {
                beneficios.push(String(item));
              });

              //remove o título
              beneficios.shift();

              return response.json({ data: classToClass({ cpf, beneficios }) });
            }

            return response.json({
              data: classToClass({
                cpf,
                beneficios: '<Benefícios não encotrados>',
              }),
            });
          })
          .catch(() => {
            throw new AppError(
              'Problemas no acesso a consulta. Tente novamente mais tarde.'
            );
          });
      })
      .catch(() => {
        throw new AppError(
          'Problemas no acesso a consulta. Tente novamente mais tarde.'
        );
      });

    await browser.close();

    // return response.json({ data: classToClass({ status: 'Ok' }) });
  }

  // public async findByCpf(
  //   request: Request,
  //   response: Response
  // ): Promise<Response> {
  //   const { cpf } = request.query;

  //   return response.json({ data: classToClass(cpf) });
  // }
}
