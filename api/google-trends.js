import Parser from 'rss-parser'

export default async function handler(request, response) {
  const parser = new Parser()

  try {
    // URL do feed do Google Trends (Brasil)
    const feedUrl = 'https://trends.google.com/trending/rss?geo=BR'
    const feed = await parser.parseURL(feedUrl)

    // Mapeia os dados para retornar apenas o que você precisa
    const items = feed.items.map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      // Se precisar de campos personalizados como a imagem:
      image: item.enclosure?.url || ''
    }))

    return response.status(200).json({
      feedTitle: feed.title,
      items: items
    })
  } catch (error) {
    console.error('Erro ao buscar feed:', error)
    return response.status(500).json({ error: 'Erro ao processar o feed' })
  }
}
