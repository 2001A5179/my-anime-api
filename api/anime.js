export default async function handler(req, res) {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 从请求体获取参数
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: '缺少必要参数：prompt' });
    }

    // 这里替换成你实际的豆包API地址和密钥
    const apiUrl = 'https://your-doubao-api-endpoint';
    const apiKey = 'your-doubao-api-key';

    // 转发请求到豆包API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: prompt,
        // 其他API参数，如生成视频的配置
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API 请求失败');
    }

    // 返回结果给小程序
    return res.status(200).json(data);

  } catch (error) {
    console.error('API 处理错误:', error);
    return res.status(500).json({ error: '服务器内部错误' });
  }
}
