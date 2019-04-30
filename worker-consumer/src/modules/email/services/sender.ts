import { Injectable } from '@nestjs/common';
import fs from 'fs';
import inlineCss from 'inline-css';
import mailgunApi from 'mailgun-js';
import pug from 'pug';
import { IS_DEV, MAIL, SITE_DNS } from 'settings';

@Injectable()
export class SenderEmailService {
  private mailgun: ReturnType<typeof mailgunApi>;

  constructor() {
    if (MAIL.enabled) {
      this.mailgun = mailgunApi(MAIL.credentials);
    }
  }

  public async  send(to: string, subject: string, template: string, data: any): Promise<string> {
    data = this.setDefaultVariables(data);

    const html = await this.renderTemplate(template, data);
    const mail = { from: MAIL.from, to, subject, html };

    if (!MAIL.enabled) {
      return await this.outputFile(mail);
    }

    const { id } = await this.mailgun.messages().send(mail);
    return id;
  }

  private async  outputFile(mail: any): Promise<string> {
    const outputDir = './output-emails';

    await fs.promises.access(outputDir).catch(() => {
      return fs.promises.mkdir(outputDir);
    });

    const filePath = `${outputDir}/${Date.now()}.html`;
    await fs.promises.writeFile(filePath, mail.html);

    console.log(`********\nEmail created: ${filePath}\n*********`);
    return filePath;
  }

  private setDefaultVariables(data: any): any {
    data.urlSite = SITE_DNS;
    data.currentYear = new Date().getFullYear();
    return data;
  }

  private async renderTemplate(template: string, data: any): Promise<string> {
    const html = pug.renderFile(`${__dirname}/templates/${template}.pug`, {
      ...data,
      pretty: IS_DEV
    });

    return await inlineCss(html, { url: SITE_DNS });
  }
}