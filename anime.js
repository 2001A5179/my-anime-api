export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed')
  }

  const { prompt, style } = req.body

  // 这里转发到豆包/火山引擎AI
  const apiKey = process.env.DOUBAO_API_KEY
  const apiUrl = 'https://ark.cn-beijing.volces.com/api/xxx/xxx'

  try {
    const result = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: `${prompt}，日系动漫，高清，流畅`,
        style: style,
        duration: 5
      })
    })

    const data = await result.json()
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: '生成失败' })
  }
}
