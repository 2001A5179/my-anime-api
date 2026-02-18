export default async function handler(req, res) {
  // 仅允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { prompt } = req.body;

    // 检查参数是否存在
    if (!prompt) {
      return res.status(400).json({ error: '缺少必要参数：prompt' });
    }

    // 返回测试响应
    return res.status(200).json({
      message: "API 运行正常",
      received_prompt: prompt
    });

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: '服务器内部错误' });
  }
}
