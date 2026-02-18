export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只允许POST' })
  }

  const API_KEY = '9ecb9cc0-2834-473f-93ce-5d421614185c'
  const API_URL = 'https://ark.cn-beijing.volces.com/api/v3/videos/generations'

  try {
    const { prompt } = req.body

    const resp = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "doubao-seedance-1-0-pro",
        prompt: "日系动漫风格，" + prompt,
        duration: 5,
        ratio: "9:16"
      })
    })

    const data = await resp.json()
    res.status(200).json(data)

  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
