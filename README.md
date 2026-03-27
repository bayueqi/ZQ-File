# ZQ-TextUrl

一个基于 Cloudflare Workers 的极简文本/短链接托管服务，支持短链分享、自定义名称、在线编辑、删除、复制，适合用作订阅链接托管、代码片段分享、临时文本存储等。

## ✨ 功能特色
- 云端托管，无需服务器，永久免费
- 支持任意文本内容（如订阅、代码、配置等）
- 支持短链接功能，可将长链接转换为短链接
- 自动生成短链，支持自定义名称
- 支持自定义过期时间
- 现代化响应式前端，支持手机/PC
- 在线编辑、删除、复制内容和链接
- 支持二维码生成，方便扫码访问
- 首页展示全部托管内容，文本和短链接分开显示
- 登录保护，安全可靠

## 🚀 快速部署
1. Fork 或下载本项目代码
2. 在 Cloudflare Workers 新建 Worker，上传 `_worker.js` 代码
3. 绑定KV命名空间（如`texturl`），并在Worker设置中配置环境变量 `texturl`
4. 在KV中添加登录信息：
   - key: `user`，value: 你的用户名
   - key: `password`，value: 你的密码
5. 保存并部署，访问你的 Worker 域名即可使用

## 🛠️ API使用方法

### 登录获取token（token有效期为1个月）
```bash
curl -X POST "https://你的域名/api/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"你的用户名","password":"你的密码"}'
```
返回：
```json
{ "code": 1, "token": "xxxxxx" }
```
> 登录成功后，token 有效期为 1 个月（30天），到期需重新登录获取。

### 新建文本/订阅
```bash
curl -X POST "https://你的域名/api/paste" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 你的token" \
  -d '{"text":"你的内容","title":"可选自定义显示名称","name":"可选自定义名称","expireAt":"可选过期时间戳"}'
```

### 新建短链接
```bash
curl -X POST "https://你的域名/api/link" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 你的token" \
  -d '{"url":"原始链接","title":"可选自定义显示名称","name":"可选自定义名称","expireAt":"可选过期时间戳"}'
```

### 获取文本内容
```bash
curl "https://你的域名/api/paste?id=短链ID" -H "Authorization: Bearer 你的token"
```

### 获取短链接内容
```bash
curl "https://你的域名/api/link?id=短链ID" -H "Authorization: Bearer 你的token"
```

### 获取全部内容ID
```bash
curl "https://你的域名/api/list" -H "Authorization: Bearer 你的token"
```

### 获取自定义名称
```bash
curl "https://你的域名/api/name?id=短链ID" -H "Authorization: Bearer 你的token"
```

### 获取自定义显示名称
```bash
curl "https://你的域名/api/title?id=短链ID" -H "Authorization: Bearer 你的token"
```

### 获取过期时间
```bash
curl "https://你的域名/api/expire?id=短链ID" -H "Authorization: Bearer 你的token"
```

### 获取时间信息
```bash
curl "https://你的域名/api/time?id=短链ID" -H "Authorization: Bearer 你的token"
```

### 获取内容类型
```bash
curl "https://你的域名/api/type?id=短链ID" -H "Authorization: Bearer 你的token"
```

### 编辑文本内容
```bash
curl -X PUT "https://你的域名/api/paste" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 你的token" \
  -d '{"id":"短链ID","text":"新内容","title":"新显示名称","name":"新名称","expireAt":"新过期时间戳"}'
```

### 编辑短链接
```bash
curl -X PUT "https://你的域名/api/link" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 你的token" \
  -d '{"id":"短链ID","url":"新链接","title":"新显示名称","name":"新名称","expireAt":"新过期时间戳"}'
```

### 删除文本
```bash
curl -X DELETE "https://你的域名/api/paste" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 你的token" \
  -d '{"id":"短链ID"}'
```

### 删除短链接
```bash
curl -X DELETE "https://你的域名/api/link" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 你的token" \
  -d '{"id":"短链ID"}'
```

### 直接访问短链
```
GET https://你的域名/短链ID
```
- 如果是文本内容，返回纯文本内容
- 如果是短链接，会302重定向到目标链接

## 🖥️ 前端界面
- 标签页设计，分为文本和短链接两个功能模块
- 支持文本提交、短链接创建、全部内容列表展示
- 支持在线编辑、删除、复制内容和链接
- 支持二维码生成，方便扫码访问
- 文本和短链接分开显示，清晰明了
- 响应式设计，适配手机和PC
- 支持SVG favicon和自定义logo

## 🔒 安全说明
- 登录信息仅存储在你的 Cloudflare KV，前端只保存token
- token有效期为1个月，到期需重新登录
- 所有API接口（包括获取内容、获取短链列表和自定义名称）都需要token
- 除非你主动分享，内容不会被第三方看到
- 无第三方统计、广告、追踪代码




