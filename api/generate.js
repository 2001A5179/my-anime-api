// api/generate.js
module.exports = async (req, res) => {
  // 1. 允许跨域，适配小程序
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt, audio_url } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: '缺少推文内容' });
  }

  try {
    // 2. 从 Vercel 环境变量读取你的豆包 API Key
    const apiKey = process.env.DOUBAO_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: '未配置 DOUBAO_API_KEY 环境变量' });
    }

    // 3. 调用火山引擎（豆包）视频生成接口
    const endpoint = 'https://ark.cn-beijing.volces.com/api/v3';
    const model = 'doubao-video-1.0'; // 视频生成模型

    const response = await fetch(`${endpoint}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'user',
            content: `根据以下推文生成日系动漫视频：${prompt}，背景音乐：${audio_url || '默认音乐'}`
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || '豆包API调用失败');
    }

    // 4. 从返回结果中提取视频地址
    const videoUrl = data.video_url || data.data?.video_url;

    if (!videoUrl) {
      return res.status(500).json({ error: '豆包API未返回视频地址' });
    }

    // 5. 返回给小程序
    return res.status(200).json({
      code: 200,
      data: {
        video_url: videoUrl,
        prompt: prompt
      }
    });

  } catch (error) {
    console.error('生成失败:', error);
    return res.status(500).json({
      error: '生成失败',
      details: error.message
    });
  }
};
