import { chromium } from 'playwright'
import { createApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
// @ts-expect-error cannot import
import htmltemplate from '~~/server/services/pdf-template.html'

function template(firstname: string, surname: string, birthdate: string) {
  console.log(htmltemplate)
  const app = createApp({
    template: htmltemplate,
    data() { return { firstname, surname, birthdate } },
  })

  return app
}

const pdfOptions = {
  format: 'A4',
  landscape: false,
  scale: 1,
  printBackground: true,
  margin: {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  },
}

export async function generatePdf(path: string) {
  const browser = await chromium.launch({ headless: true })

  let res: Buffer

  try {
    const page = await browser.newPage()

    const app = template('Charles', 'Martel', '12/12/1987')
    const content = await renderToString(app)

    await page.setContent(content, { waitUntil: 'networkidle' })
    await page.emulateMedia({ media: 'screen' })
    res = await page.pdf({ path, ...pdfOptions })
  }
  finally {
    await browser.close()
  }

  return res
};
