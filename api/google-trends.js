import Parser from 'rss-parser'

export default async function handler(request, response) {
  const parser = new Parser()
  try {
    const feedUrl = 'https://trends.google.com/trending/rss?geo=BR'
    const feed = await parser.parseURL(feedUrl)
    const items = feed.items.map((item) => item.title)
    return response.status(200).json(items)
  } catch (error) {
    return response.status(500)
  }
}
