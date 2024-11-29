import * as cheerio from 'cheerio'

class CheerioScrapper {
  loadPage(content) {
    this.page = cheerio.load(content)
  }

  getData() {
    const result = {
      place: '',
      items: [],
      total: '',
      date: null
    }

    result.place = this.page('#u20').text()
    result.total = parseFloat(this.page('#linhaTotal.linhaShade > .totalNumb.txtMax')
      .text()
      .replace(',', '.'))

    let nfceDate = this.page('div#infos > div > h4 ~ ul >li')
      .text()
      .match(/(\d{2}\/\d{2}\/\d{4})/)[0]

    result.date = new Date(nfceDate.split('/').reverse().join('-'))

    this.page('#tabResult')
      .find('tr[id*="Item +"]')
      .each(function () {
        const item = cheerio.load(this)

        result.items.push({
          desc: item('span.txtTit').text(),
          qtd: item('.Rqtd').text()
            .replace('Qtde.:', '')
            .replace(',', '.')
            .trim(),
          val: parseFloat(item('.valor')
            .text()
            .replace(',', '.')),
          unType: item('.RUN').text()
            .replace('UN: ', '')
            .trim()
        })
      })

    return result
  }
}

export default new CheerioScrapper()