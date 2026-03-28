// index.js
const html = `
<!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <link rel="icon" type="image/svg+xml" href='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect x="10" y="8" width="20" height="28" rx="4" fill="%23667eea"/><rect x="14" y="12" width="12" height="20" rx="2" fill="%23fff"/><path d="M34 32a8 8 0 1 0-2.5-15.6A10 10 0 1 0 8 34h26z" fill="%23a8edea" stroke="%23667eea" stroke-width="2"/><rect x="18" y="18" width="4" height="2" rx="1" fill="%23667eea"/><rect x="18" y="22" width="8" height="2" rx="1" fill="%23667eea"/><rect x="18" y="26" width="8" height="2" rx="1" fill="%23667eea"/></svg>'>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ZQ-TextUrl</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: #f0f8ff;
      min-height: 100vh;
      padding: 20px;
      color: #333;
    }
    
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    
    .header {
      background: #4a90e2;
      color: white;
      padding: 15px;
      text-align: center;
    }
    
    .header h1 {
      font-size: 1.8em;
      margin-bottom: 5px;
      font-weight: 300;
    }
    
    .header p {
      opacity: 0.9;
      font-size: 0.9em;
      margin: 0;
    }
    
    .content {
      padding: 30px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #555;
      font-size: 14px;
    }
    
    textarea {
      width: 100%;
      min-height: 150px;
      border: 2px solid #e1e5e9;
      border-radius: 8px;
      padding: 15px;
      font-size: 14px;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      resize: vertical;
      transition: all 0.3s ease;
      background: #fafbfc;
      max-height: 400px;
      overflow-y: auto;
      word-wrap: break-word;
      word-break: break-all;
    }
    
    textarea:focus {
      outline: none;
      border-color: #4a90e2;
      background: white;
      box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
    }
    
    .btn {
      background: #4a90e2;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(74, 144, 226, 0.3);
      margin-right: 10px;
      margin-bottom: 10px;
    }
    
    .btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
      background: #357abd;
    }
    
    .btn:active {
      transform: translateY(0);
    }
    
    .btn-danger {
      background: #e74c3c;
      box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
    }
    
    .btn-danger:hover {
      box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
      background: #c0392b;
    }
    
    .btn-success {
      background: #27ae60;
      box-shadow: 0 2px 8px rgba(39, 174, 96, 0.3);
    }
    
    .btn-success:hover {
      box-shadow: 0 4px 12px rgba(39, 174, 96, 0.4);
      background: #219a52;
    }
    
    .btn-secondary {
      background: #95a5a6;
      box-shadow: 0 2px 8px rgba(149, 165, 166, 0.3);
    }
    
    .btn-secondary:hover {
      box-shadow: 0 4px 12px rgba(149, 165, 166, 0.4);
      background: #7f8c8d;
    }
    
    .paste-link {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px 30px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 12px;
      color: #333;
      text-align: center;
      display: none;
      z-index: 10000;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      max-width: 90%;
      min-width: 300px;
    }
    
    .paste-link.show {
      display: block;
      animation: fadeIn 0.5s ease;
    }
    
    .paste-link .error {
      background: rgba(255, 238, 238, 0.9);
      color: #c33;
      border-left: 4px solid #c33;
    }
    
    .paste-link .success {
      background: rgba(238, 255, 238, 0.9);
      color: #3c3;
      border-left: 4px solid #3c3;
    }
    
    .paste-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.1em;
      word-break: break-all;
    }
    
    .paste-link a:hover {
      text-decoration: underline;
      color: #764ba2;
    }
    
    /* 新的简单提示框样式 */
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .toast {
      background: white;
      color: #333;
      padding: 12px 20px;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      font-size: 14px;
      animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
    
    .paste-content {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 12px;
      margin: 20px 0;
      border: 2px solid #4a90e2;
      display: none;
      max-height: 80vh;
      overflow-y: auto;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 14px;
      line-height: 1.6;
      word-wrap: break-word;
      word-break: break-all;
    }
    
    .paste-content.show {
      display: block;
      animation: slideIn 0.5s ease;
    }
    
    #paste-text {
      white-space: pre-wrap;
      margin-bottom: 15px;
      max-height: 300px;
      overflow-y: auto;
      word-wrap: break-word;
      word-break: break-all;
    }
    
    .paste-content::-webkit-scrollbar {
      width: 8px;
    }
    
    .paste-content::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }
    
    .paste-content::-webkit-scrollbar-thumb {
      background: #667eea;
      border-radius: 4px;
    }
    
    .paste-content::-webkit-scrollbar-thumb:hover {
      background: #5a6fd8;
    }
    
    .all-pastes {
      margin-top: 40px;
      padding-top: 30px;
      border-top: 2px solid #e1e5e9;
    }
    
    .all-pastes h3 {
      color: #555;
      margin-bottom: 20px;
      font-size: 1.5em;
      font-weight: 600;
    }
    
    .paste-item {
      background: #f8f9fa;
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 8px;
      border-left: 3px solid #4a90e2;
      transition: all 0.3s ease;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .paste-item:hover {
      background: #e9ecef;
      transform: translateX(5px);
    }
    
    .paste-item a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      word-break: break-all;
      flex: 1;
    }
    
    .paste-item a:hover {
      color: #764ba2;
    }
    
    .paste-actions {
      display: flex;
      gap: 8px;
      margin-left: 15px;
    }
    
    .action-btn {
      background: none;
      border: none;
      padding: 5px 8px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s ease;
    }
    
    .action-btn:hover {
      background: rgba(0,0,0,0.1);
    }
    
    .edit-btn {
      color: #667eea;
    }
    
    .copy-btn {
      color: #51cf66;
    }
    
    .delete-btn {
      color: #ff6b6b;
    }
    
    .stats {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding: 15px;
      background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
      border-radius: 12px;
      color: #555;
    }
    
    .loading {
      text-align: center;
      padding: 20px;
      color: #666;
    }
    
    .error {
      background: #fee;
      color: #c33;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #c33;
      margin: 20px 0;
    }
    
    .success {
      background: #efe;
      color: #3c3;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #3c3;
      margin: 20px 0;
    }
    
    .edit-form {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 12px;
      margin: 20px 0;
      border: 2px solid #667eea;
      display: none;
      max-height: 80vh;
      overflow-y: auto;
    }
    
    .edit-form.show {
      display: block;
      animation: slideIn 0.5s ease;
    }
    
    .edit-form textarea {
      height: 150px;
      margin-bottom: 15px;
      max-height: 300px;
      overflow-y: auto;
      word-wrap: break-word;
      word-break: break-all;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @media (max-width: 768px) {
      body {
        padding: 10px;
      }
      
      .container {
        border-radius: 12px;
      }
      
      .header {
        padding: 15px;
      }
      
      .header h1 {
        font-size: 1.6em;
      }
      
      .content {
        padding: 20px;
      }
      
      .form-group {
        margin-bottom: 20px;
      }
      
      textarea {
        min-height: 120px;
        font-size: 13px;
      }
      
      .btn {
        padding: 10px 20px;
        font-size: 14px;
      }
      
      .paste-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        padding: 12px;
      }
      
      .paste-actions {
        margin-left: 0;
        width: 100%;
        justify-content: flex-end;
        gap: 6px;
      }
      
      .action-btn {
        padding: 4px 6px;
        font-size: 12px;
      }
      
      #token-box {
        margin-top: 15px !important;
        max-width: none !important;
        min-width: auto !important;
        width: 100% !important;
      }
      
      #token-box .header {
        padding: 10px 12px !important;
      }
      
      #token-box .header span {
        font-size: 13px !important;
      }
      
      #token-box button {
        padding: 4px 8px !important;
        font-size: 11px !important;
      }
      
      #token-content {
        padding: 12px !important;
      }
      
      #token-value {
        font-size: 10px !important;
        padding: 6px !important;
      }
      
      .login-form {
        margin: 20px auto;
        padding: 24px 16px 16px 16px;
        max-width: 90%;
      }
      
      .login-form h2 {
        font-size: 1.2em;
        margin-bottom: 12px;
      }
      
      .login-form input {
        font-size: 14px !important;
        padding: 10px !important;
      }
      
      .login-form .btn {
        font-size: 14px !important;
        padding: 10px !important;
      }
    }
    
    @media (max-width: 480px) {
      .header {
        padding: 12px;
      }
      
      .header h1 {
        font-size: 1.4em;
      }
      
      .header p {
        font-size: 0.8em;
      }
      
      .content {
        padding: 15px;
      }
      
      textarea {
        min-height: 120px;
        padding: 12px;
      }
      
      .btn {
        padding: 8px 16px;
        font-size: 13px;
        margin-right: 8px;
      }
      
      .paste-item {
        padding: 10px;
      }
    }
    .login-form {
      max-width: 350px;
      margin: 40px auto;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      padding: 32px 24px 24px 24px;
      text-align: center;
      display: none;
    }
    .login-form h2 {
      margin-bottom: 18px;
      color: #4a90e2;
      font-weight: 600;
    }
    .login-form input {
      width: 100%;
      padding: 12px;
      border: 2px solid #e1e5e9;
      border-radius: 8px;
      font-size: 15px;
      margin-bottom: 15px;
      outline: none;
      transition: border 0.2s;
    }
    .login-form input:focus {
      border-color: #4a90e2;
    }
    .login-form .btn {
      width: 100%;
      margin: 0;
    }
    .login-form #login-error {
      color: #ff6b6b;
      margin-top: 10px;
      min-height: 22px;
    }
    
    .help-text {
      font-size: 12px;
      color: #666;
      margin-top: 5px;
      margin-bottom: 15px;
    }
    
    /* 标签页样式 */
    .tab-container {
      margin-bottom: 30px;
    }
    
    .tab-buttons {
      display: flex;
      margin-bottom: 20px;
      border-bottom: 2px solid #e1e5e9;
    }
    
    .tab-btn {
      background: none;
      border: none;
      padding: 12px 24px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      color: #666;
      border-bottom: 3px solid transparent;
    }
    
    .tab-btn:hover {
      color: #4a90e2;
    }
    
    .tab-btn.active {
      color: #4a90e2;
      border-bottom: 3px solid #4a90e2;
    }
    
    .tab-content {
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
  </style>
  <script async src="https://cdn.jsdelivr.net/npm/qrcode-svg@1.1.0/dist/qrcode.min.js"></script>
</head>
<body>
  <div class="login-form" id="login-form">
    <h2>登录</h2>
    <input type="text" id="login-username" placeholder="用户名" autocomplete="username">
    <input type="password" id="login-password" placeholder="密码" autocomplete="current-password">
    <button class="btn btn-success" onclick="login()">登录</button>
    <div id="login-error"></div>
  </div>
  <div class="container">
    <div class="header">
      <h1>
         ZQ-TextUrl
      </h1>
      <p>Cloudflare Workers 驱动的文本托管和短链接生成服务</p>
    </div>
    
    <div class="content">
      <!-- 标签页 -->
      <div class="tab-container">
        <div class="tab-buttons">
          <button class="tab-btn active" onclick="switchTab('text', event)">文本</button>
          <button class="tab-btn" onclick="switchTab('link', event)">短链接</button>
        </div>
        
        <!-- 文本功能 -->
        <div class="tab-content" id="text-tab">
          <form id="paste-form">
            <div class="form-group">
              <label for="text">在这里输入你的文本...</label>
              <textarea id="text" placeholder="请输入文本内容..."></textarea>
            </div>
            <div class="form-group">
              <label for="custom-title">自定义显示名称（可选）</label>
              <input type="text" id="custom-title" placeholder="例如: 我的重要笔记，留空则显示链接" style="width: 100%; padding: 12px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; margin-bottom: 15px;">
              <div class="help-text">用于在列表中显示，支持任意字符，长度1-50字符</div>
            </div>
            <div class="form-group">
              <label for="custom-name">自定义链接后缀（可选）</label>
              <input type="text" id="custom-name" placeholder="例如: my-note-123，留空则自动生成" style="width: 100%; padding: 12px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px;">
              <div class="help-text">支持字母、数字、连字符(-)、下划线(_)、点号(.)；其他字符会自动删除</div>
            </div>
            <div class="form-group">
              <label for="expire-time">过期时间（可选）</label>
              <input type="datetime-local" id="expire-time" style="width: 100%; padding: 12px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px;">
              <div class="help-text">留空则永不过期，设置后文本将在指定时间后自动删除</div>
            </div>
            <button type="submit" class="btn">提交</button>
          </form>
        </div>
        
        <!-- 短链接功能 -->
        <div class="tab-content" id="link-tab" style="display: none;">
          <form id="link-form">
            <div class="form-group">
              <label for="original-link">原始链接</label>
              <input type="url" id="original-link" placeholder="请输入要缩短的链接..." style="width: 100%; padding: 12px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; margin-bottom: 15px;">
              <div class="help-text">请输入完整的URL，包括http://或https://</div>
            </div>
            <div class="form-group">
              <label for="link-custom-title">自定义显示名称（可选）</label>
              <input type="text" id="link-custom-title" placeholder="例如: 我的博客链接，留空则显示链接" style="width: 100%; padding: 12px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; margin-bottom: 15px;">
              <div class="help-text">用于在列表中显示，支持任意字符，长度1-50字符</div>
            </div>
            <div class="form-group">
              <label for="link-custom-name">自定义链接后缀（可选）</label>
              <input type="text" id="link-custom-name" placeholder="例如: my-blog，留空则自动生成" style="width: 100%; padding: 12px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; margin-bottom: 15px;">
              <div class="help-text">支持字母、数字、连字符(-)、下划线(_)、点号(.)；其他字符会自动删除</div>
            </div>
            <div class="form-group">
              <label for="link-expire-time">过期时间（可选）</label>
              <input type="datetime-local" id="link-expire-time" style="width: 100%; padding: 12px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px;">
              <div class="help-text">留空则永不过期，设置后链接将在指定时间后自动失效</div>
            </div>
            <button type="submit" class="btn">创建短链接</button>
          </form>
        </div>
      </div>
      
  <div class="toast-container" id="toast-container"></div>
  <div class="paste-content" id="paste-content">
    <h4>文本内容</h4>
    <div id="paste-text"></div>
    <div style="margin-top: 20px;">
      <h5>二维码</h5>
      <div id="paste-qrcode" style="margin: 10px 0;"></div>
      <p style="font-size: 12px; color: #666;">扫描二维码访问此文本</p>
    </div>
    <button class="btn btn-success" onclick="copyPasteContent()">复制</button>
    <button class="btn btn-secondary" onclick="closePasteContent()">取消</button>
  </div>
      
      
      <div class="all-pastes" id="all-pastes">
        <div class="loading">加载中...</div>
      </div>
    </div>
  </div>

  <script>
    const form = document.getElementById('paste-form');
    const linkForm = document.getElementById('link-form');
    const pasteContent = document.getElementById('paste-content');
    const allPastes = document.getElementById('all-pastes');
    
    let currentEditId = null;
    
    // 标签页切换函数
    function switchTab(tabName, event) {
      // 隐藏所有标签内容
      document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
      });
      
      // 移除所有标签按钮的活动状态
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // 显示选中的标签内容
      document.getElementById(tabName + '-tab').style.display = 'block';
      
      // 设置选中的标签按钮为活动状态
      event.currentTarget.classList.add('active');
    }
    
    // 处理与验证自定义链接格式
    function sanitizeCustomName(name) {
      if (!name) return '';
      return name.replace(/[^a-zA-Z0-9._-]/g, '');
    }
    function validateCustomName(name) {
      if (!name) return true; // 允许为空
      const regex = /^[a-zA-Z0-9._-]+$/;
      return regex.test(name);
    }
    
    // 验证自定义显示名称格式
    function validateCustomTitle(title) {
      if (!title) return true; // 允许为空
      return title.length >= 1 && title.length <= 50;
    }
    
    form.onsubmit = async (e) => {
      e.preventDefault();
      const text = document.getElementById('text').value.trim();
      const customTitle = document.getElementById('custom-title').value.trim();
      let customName = document.getElementById('custom-name').value.trim();
      // 自动清理非法字符
      customName = sanitizeCustomName(customName);
      // 回写清理后的值，便于用户看到最终结果
      document.getElementById('custom-name').value = customName;
      
      if (!text) {
        showError('请输入内容');
        return;
      }
      
      // 验证自定义显示名称格式
      if (customTitle && !validateCustomTitle(customTitle)) {
        showError('自定义显示名称格式无效，长度1-50字符');
        return;
      }
      
      // 验证自定义链接格式
      if (customName && !validateCustomName(customName)) {
        showError('自定义链接格式无效，支持字母、数字、连字符(-)、下划线(_)、点号(.)');
        return;
      }
      
      try {
      const expireTime = document.getElementById('expire-time').value;
      const res = await authFetch('/api/paste', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            text: text,
            title: customTitle || null,
            name: customName || null,
            expireAt: expireTime ? new Date(expireTime).getTime() : null
          })
      });
        
      const data = await res.json();
        
        if(data.code === 1 && data.id){
          showToast('创建成功');
          pasteContent.classList.remove('show');
          
          // 清空输入框
          document.getElementById('text').value = '';
          document.getElementById('custom-title').value = '';
          document.getElementById('custom-name').value = '';
          document.getElementById('expire-time').value = '';
          
          // 刷新列表
          loadAllPastes();
        } else {
          showError('创建失败');
        }
      } catch (error) {
        showError('创建失败');
      }
    };
    
    // 短链接表单提交处理
    linkForm.onsubmit = async (e) => {
      e.preventDefault();
      const originalLink = document.getElementById('original-link').value.trim();
      const customTitle = document.getElementById('link-custom-title').value.trim();
      let customName = document.getElementById('link-custom-name').value.trim();
      // 自动清理非法字符
      customName = sanitizeCustomName(customName);
      // 回写清理后的值，便于用户看到最终结果
      document.getElementById('link-custom-name').value = customName;
      
      if (!originalLink) {
        showError('请输入原始链接');
        return;
      }
      
      // 验证链接格式
      try {
        new URL(originalLink);
      } catch {
        showError('请输入有效的URL，包括http://或https://');
        return;
      }
      
      // 验证自定义显示名称格式
      if (customTitle && !validateCustomTitle(customTitle)) {
        showError('自定义显示名称格式无效，长度1-50字符');
        return;
      }
      
      // 验证自定义链接格式
      if (customName && !validateCustomName(customName)) {
        showError('自定义链接格式无效，支持字母、数字、连字符(-)、下划线(_)、点号(.)');
        return;
      }
      
      try {
        const expireTime = document.getElementById('link-expire-time').value;
        const res = await authFetch('/api/link', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            url: originalLink,
            title: customTitle || null,
            name: customName || null,
            expireAt: expireTime ? new Date(expireTime).getTime() : null
          })
        });
        
        const data = await res.json();
        
        if(data.code === 1 && data.id){
          showToast('创建成功');
          
          // 清空输入框
          document.getElementById('original-link').value = '';
          document.getElementById('link-custom-title').value = '';
          document.getElementById('link-custom-name').value = '';
          document.getElementById('link-expire-time').value = '';
          
          // 刷新列表
          loadAllPastes();
        } else {
          showError('创建失败');
        }
      } catch (error) {
        showError('创建失败');
      }
    };
    
    function showToast(message) {
      const toastContainer = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;
      toastContainer.appendChild(toast);
      
      setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
          toast.remove();
        }, 300);
      }, 2500);
    }
    
    function showError(message) {
      showToast(message);
    }
    
    function showSuccess(message) {
      showToast(message);
    }
    
    function showCopyMessage(id, message, isSuccess) {
      // 找到对应的复制按钮
      const copyBtn = document.querySelector('[data-id="' + id + '"].copy-btn');
      if (copyBtn) {
        // 移除现有的提示
        const existingTip = document.querySelector('.copy-tip');
        if (existingTip) {
          existingTip.remove();
        }
        
        // 创建新的提示
        const tip = document.createElement('div');
        tip.className = 'copy-tip';
        tip.style = 'position:fixed;background:' + (isSuccess ? '#51cf66' : '#ff6b6b') + ';color:white;padding:6px 10px;border-radius:6px;font-size:11px;z-index:10000;box-shadow:0 4px 12px rgba(0,0,0,0.3);pointer-events:none;white-space:nowrap;';
        tip.innerHTML = message;
        
        // 添加到body
        document.body.appendChild(tip);
        
        // 计算位置（按钮上方）
        const rect = copyBtn.getBoundingClientRect();
        tip.style.left = (rect.left + rect.width / 2 - tip.offsetWidth / 2) + 'px';
        tip.style.top = (rect.top - tip.offsetHeight - 8) + 'px';
        
        // 2秒后自动移除
        setTimeout(() => {
          if (tip.parentNode) {
            tip.remove();
          }
        }, 2000);
      }
    }
    
    let currentEditType = null;
    
    async function editPaste(id) {
      try {
        // 获取内容类型
        const typeRes = await authFetch('/api/type?id=' + id);
        const type = typeRes.ok ? await typeRes.text() : 'text';
        
        // 根据类型获取内容
        let contentRes, content;
        if (type === 'link') {
          contentRes = await authFetch('/api/link?id=' + id);
        } else {
          contentRes = await authFetch('/api/paste?id=' + id);
        }
        
        const nameRes = await authFetch('/api/name?id=' + id);
        const titleRes = await authFetch('/api/title?id=' + id);
        const expireRes = await authFetch('/api/expire?id=' + id);
        
        if (contentRes.ok) {
          content = await contentRes.text();
          const name = nameRes.ok ? await nameRes.text() : '';
          const title = titleRes.ok ? await titleRes.text() : '';
          const expireAt = expireRes.ok ? await expireRes.text() : '';
          
          // 隐藏其他可能显示的内容
          pasteContent.classList.remove('show');
          
          // 移除现有的编辑框
          const existingEditForm = document.querySelector('.edit-form');
          if (existingEditForm) {
            existingEditForm.remove();
          }
          
          // 找到对应的paste-item
          const pasteItem = document.querySelector('[data-id="' + id + '"]').closest('.paste-item');
          if (pasteItem) {
            // 创建编辑框
            const editForm = document.createElement('div');
            editForm.className = 'edit-form show';
            
            // 根据类型设置不同的编辑框
            let contentField = '';
            if (type === 'link') {
              contentField = '<div class="form-group">' +
                '<label for="edit-text">链接地址</label>' +
                '<input type="url" id="edit-text" placeholder="请输入完整的URL，包括http://或https://" style="width: 100%; padding: 12px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; margin-bottom: 15px;">' +
                '<div class="help-text">请输入有效的URL，包括http://或https://</div>' +
              '</div>';
            } else {
              contentField = '<div class="form-group">' +
                '<label for="edit-text">文本内容</label>' +
                '<textarea id="edit-text" placeholder="编辑你的内容..."></textarea>' +
              '</div>';
            }
            
            editForm.innerHTML = 
              '<h4>编辑' + (type === 'link' ? '链接' : '内容') + '</h4>' +
              '<div class="form-group">' +
                '<label for="edit-title">自定义显示名称</label>' +
                '<input type="text" id="edit-title" placeholder="例如: 我的重要笔记" style="width: 100%; padding: 12px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; margin-bottom: 15px;">' +
                '<div class="help-text">用于在列表中显示，支持任意字符，长度1-50字符</div>' +
              '</div>' +
              '<div class="form-group">' +
                '<label for="edit-name">自定义链接后缀</label>' +
                '<input type="text" id="edit-name" placeholder="例如: my-note-123" style="width: 100%; padding: 12px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; margin-bottom: 15px;">' +
              '<div class="help-text">支持字母、数字、连字符(-)、下划线(_)、点号(.)；其他字符会自动删除</div>' +
              '</div>' +
              '<div class="form-group">' +
                '<label for="edit-expire-time">过期时间</label>' +
                '<input type="datetime-local" id="edit-expire-time" style="width: 100%; padding: 12px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; margin-bottom: 15px;">' +
                '<div class="help-text">留空则永不过期，设置后' + (type === 'link' ? '链接' : '文本') + '将在指定时间后自动删除</div>' +
              '</div>' +
              contentField +
              '<button class="btn btn-success" onclick="saveEdit()">保存</button>' +
              '<button class="btn btn-secondary" onclick="cancelEdit()">取消</button>';

            
            // 在对应的paste-item后面插入编辑框
            pasteItem.parentNode.insertBefore(editForm, pasteItem.nextSibling);
            
            // 设置编辑内容
            document.getElementById('edit-text').value = content;
            document.getElementById('edit-title').value = title;
            document.getElementById('edit-name').value = name;
            if (expireAt) {
              const date = new Date(Number(expireAt));
              const formattedDate = date.toISOString().slice(0, 16);
              document.getElementById('edit-expire-time').value = formattedDate;
            }
            currentEditId = id;
            currentEditType = type;
            
            // 滚动到编辑框
            editForm.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          showError('获取内容失败');
        }
      } catch (error) {
        showError('获取内容失败: ' + error.message);
      }
    }
    
    async function saveEdit() {
      const editTextElement = document.getElementById('edit-text');
      const editTitleElement = document.getElementById('edit-title');
      const editNameElement = document.getElementById('edit-name');
      const editExpireTimeElement = document.getElementById('edit-expire-time');
      
      if (!currentEditId || !currentEditType || !editTextElement || !editTextElement.value.trim()) {
        showError('请先选择要编辑的内容并输入新内容');
        return;
      }
      
      const customTitle = editTitleElement ? editTitleElement.value.trim() : '';
      let customName = editNameElement ? editNameElement.value.trim() : '';
      const expireTime = editExpireTimeElement ? editExpireTimeElement.value : '';
      // 自动清理非法字符
      customName = sanitizeCustomName(customName);
      if (editNameElement) editNameElement.value = customName;
      
      // 验证自定义显示名称格式
      if (customTitle && !validateCustomTitle(customTitle)) {
        showError('自定义显示名称格式无效，长度1-50字符');
        return;
      }
      
      // 验证自定义链接格式
      if (customName && !validateCustomName(customName)) {
        showError('自定义链接格式无效，支持字母、数字、连字符(-)、下划线(_)、点号(.)');
        return;
      }
      
      // 验证链接格式（如果是短链接）
      if (currentEditType === 'link') {
        try {
          new URL(editTextElement.value.trim());
        } catch {
          showError('请输入有效的URL，包括http://或https://');
          return;
        }
      }
      
      try {
        let endpoint, body;
        if (currentEditType === 'link') {
          endpoint = '/api/link';
          body = {
            id: currentEditId,
            url: editTextElement.value.trim(),
            title: customTitle || null,
            name: customName || null,
            expireAt: expireTime ? new Date(expireTime).getTime() : null
          };
        } else {
          endpoint = '/api/paste';
          body = {
            id: currentEditId,
            text: editTextElement.value.trim(),
            title: customTitle || null,
            name: customName || null,
            expireAt: expireTime ? new Date(expireTime).getTime() : null
          };
        }
        
        const res = await authFetch(endpoint, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body)
        });
        
        const data = await res.json();
        
        if (data.code === 1) {
          showToast('编辑成功');
          cancelEdit();
          loadAllPastes();
        } else {
          showError('编辑失败');
        }
      } catch (error) {
        showError('编辑失败');
      }
    }
    
    function cancelEdit() {
      const editForm = document.querySelector('.edit-form');
      if (editForm) {
        editForm.remove();
      }
      pasteContent.classList.remove('show');
      currentEditId = null;
      currentEditType = null;
    }
    
    async function showPasteContent(id, element) {
      try {
        const res = await authFetch('/api/paste?id=' + id);
        if (res.ok) {
          const text = await res.text();
          document.getElementById('paste-text').innerText = text;
          
          // 生成二维码
          const qrCodeContainer = document.getElementById('paste-qrcode');
          if (qrCodeContainer) {
            qrCodeContainer.innerHTML = '';
            const qrCodeUrl = location.origin + '/' + id;
            const qr = new QRCode({
              content: qrCodeUrl,
              padding: 4,
              width: 200,
              height: 200,
              color: '#000000',
              background: '#FFFFFF'
            });
            qrCodeContainer.innerHTML = qr.svg();
          }
          
          // 隐藏其他可能显示的内容
          const editForm = document.querySelector('.edit-form');
          if (editForm) {
            editForm.remove();
          }
          
          // 将paste-content移动到点击的链接下方
          if (element) {
            const pasteItem = element.closest('.paste-item');
            if (pasteItem) {
              pasteItem.parentNode.insertBefore(pasteContent, pasteItem.nextSibling);
            }
          }
          
          pasteContent.classList.add('show');
          
          // 滚动到内容区域
          pasteContent.scrollIntoView({ behavior: 'smooth' });
        } else {
          showError('获取内容失败');
        }
      } catch (error) {
        showError('获取内容失败: ' + error.message);
      }
    }
    
    function closePasteContent() {
      pasteContent.classList.remove('show');
      const editForm = document.querySelector('.edit-form');
      if (editForm) {
        editForm.remove();
      }
      document.getElementById('paste-text').innerText = '';
      
      // 将paste-content恢复到原来的位置（在all-pastes之前）
      const allPastes = document.getElementById('all-pastes');
      if (allPastes && pasteContent.parentNode !== allPastes.parentNode) {
        allPastes.parentNode.insertBefore(pasteContent, allPastes);
      }
    }
    
    function showQRCode(id) {
      // 创建二维码模态框
      const qrModal = document.createElement('div');
      qrModal.className = 'qr-modal';
      qrModal.style = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;';
      
      const qrContent = document.createElement('div');
      qrContent.style = 'background: white; padding: 30px; border-radius: 12px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.15);';
      
      const qrCodeUrl = location.origin + '/' + id;
      const qrCodeContainer = document.createElement('div');
      qrCodeContainer.id = 'modal-qrcode';
      qrCodeContainer.style = 'margin: 20px 0;';
      
      const closeBtn = document.createElement('button');
      closeBtn.className = 'btn btn-secondary';
      closeBtn.innerText = '关闭';
      closeBtn.style = 'margin-top: 20px;';
      closeBtn.onclick = function() {
        qrModal.remove();
      };
      
      qrContent.innerHTML = '<h3>二维码</h3><p style="margin-bottom: 20px;">扫描二维码访问</p>';
      qrContent.appendChild(qrCodeContainer);
      qrContent.appendChild(closeBtn);
      qrModal.appendChild(qrContent);
      document.body.appendChild(qrModal);
      
      // 生成二维码
      try {
        const qr = new QRCode({
          content: qrCodeUrl,
          padding: 4,
          width: 250,
          height: 250,
          color: '#000000',
          background: '#FFFFFF'
        });
        qrCodeContainer.innerHTML = qr.svg();
      } catch (error) {
        console.error('生成二维码失败:', error);
        qrCodeContainer.innerHTML = '<p style="color: #ff6b6b;">生成二维码失败</p>';
      }
    }
    
    function copyPasteContent() {
      const text = document.getElementById('paste-text').innerText;
      if (text) {
        // 使用现代浏览器的Clipboard API
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(function() {
            showSuccess('内容已复制到剪贴板！');
          }).catch(function() {
            // 如果Clipboard API失败，使用传统方法
            fallbackCopyTextToClipboard(text);
          });
        } else {
          // 传统方法
          fallbackCopyTextToClipboard(text);
        }
      }
    }
    
    function copyPasteLink(id) {
      const link = location.origin + '/' + id;
      
      // 使用现代浏览器的Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(link).then(function() {
          showCopyMessage(id, '链接已复制到剪贴板！', true);
        }).catch(function() {
          // 如果Clipboard API失败，使用传统方法
          fallbackCopyTextToClipboard(link, id);
        });
      } else {
        // 传统方法
        fallbackCopyTextToClipboard(link, id);
      }
    }
    
    function fallbackCopyTextToClipboard(text, id) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          if (id) {
            showCopyMessage(id, '已复制', true);
          } else {
            showToast('已复制');
          }
        } else {
          if (id) {
            showCopyMessage(id, '复制失败', false);
          } else {
            showError('复制失败');
          }
        }
      } catch (err) {
        if (id) {
          showCopyMessage(id, '复制失败', false);
        } else {
          showError('复制失败');
        }
      }
      
      document.body.removeChild(textArea);
    }
    
    async function deletePaste(id) {
      if (!confirm('确定要删除这个文本吗？此操作不可恢复。')) {
        return;
      }
      
      try {
        const res = await authFetch('/api/paste', {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({id})
        });
        
        const data = await res.json();
        
        if (data.code === 1) {
          showToast('删除成功');
          loadAllPastes();
        } else {
          showError('删除失败');
      }
      } catch (error) {
        showError('删除失败');
      }
    }
    
    function loadAllPastes() {
      authFetch('/api/list')
        .then(function(r) { return r.ok ? r.json() : []; })
        .then(function(list) {
          if(Array.isArray(list) && list.length){
            // 获取所有名称、标题、时间、过期时间和类型
            Promise.all(list.map(function(id, index) {
              return Promise.all([
                authFetch('/api/name?id=' + id)
                  .then(function(r) { return r.ok ? r.text() : null; })
                  .catch(function() { return null; }),
                authFetch('/api/title?id=' + id)
                  .then(function(r) { return r.ok ? r.text() : null; })
                  .catch(function() { return null; }),
                authFetch('/api/time?id=' + id)
                  .then(function(r) { return r.ok ? r.json() : {}; })
                  .catch(function() { return {}; }),
                authFetch('/api/expire?id=' + id)
                  .then(function(r) { return r.ok ? r.text() : null; })
                  .catch(function() { return null; }),
                // 获取类型
                authFetch('/api/type?id=' + id)
                  .then(function(r) { return r.ok ? r.text() : 'text'; })
                  .catch(function() { return 'text'; })
              ]).then(function(results){
                return { id: id, name: results[0], title: results[1], time: results[2], expireAt: results[3], type: results[4] };
              });
            })).then(function(infoList) {
              // 分离文本和短链接
              const textItems = [];
              const linkItems = [];
              
              for(var i = 0; i < list.length; i++){
                const item = {
                  id: list[i],
                  name: infoList[i].name,
                  title: infoList[i].title,
                  time: infoList[i].time,
                  expireAt: infoList[i].expireAt,
                  type: infoList[i].type
                };
                if (item.type === 'link') {
                  linkItems.push(item);
                } else {
                  textItems.push(item);
                }
              }
              
              var html = '';
              
              // 显示文本
              if (textItems.length > 0) {
                html += 
                  '<div class="stats">' +
                  '<span> 总共 ' + textItems.length + ' 个文本</span>' +
                  '</div>' +
                  '<h3> 全部文本</h3>';
                
                for(var i = 0; i < textItems.length; i++){
                  var item = textItems[i];
                  var id = item.id;
                  var name = item.name;
                  var title = item.title;
                  var time = item.time || {};
                  var expireAt = item.expireAt;
                  var ts = time.updatedAt || time.createdAt || null;
                  var link = location.origin + '/' + id;
                  var timeText = ts ? new Date(ts).toLocaleString() : '';
                  var expireText = expireAt ? new Date(Number(expireAt)).toLocaleString() : '永不过期';
                  var isExpired = expireAt ? Number(expireAt) < Date.now() : false;
                  var expireColor = isExpired ? '#ff6b6b' : (expireAt ? '#f59f00' : '#51cf66');
                  var displayName = title ? (i + 1) + '. ' + title + ' (' + link + ')' : 
                                   name ? (i + 1) + '. ' + name + ' (' + link + ')' : 
                                   (i + 1) + '. ' + link;
                  
                  html += 
                    '<div class="paste-item">' +
                    '<a href="javascript:void(0)" data-id="' + id + '" class="paste-link-item text-item" style="cursor: pointer;">' + displayName + '</a>' +
                    (timeText ? '<div style="color:#666;font-size:12px;margin-left:10px;white-space:nowrap;">' + timeText + '</div>' : '') +
                    '<div style="color:' + expireColor + ';font-size:12px;margin-left:10px;white-space:nowrap;">' + (isExpired ? '已过期' : (expireAt ? '过期: ' + expireText : expireText)) + '</div>' +
                    '<div class="paste-actions">' +
                  '<button class="action-btn copy-btn" data-id="' + id + '" title="复制链接">复制</button>' +
                  '<button class="action-btn qr-btn" data-id="' + id + '" title="显示二维码">二维码</button>' +
                  '<button class="action-btn edit-btn" data-id="' + id + '" title="编辑">编辑</button>' +
                  '<button class="action-btn delete-btn" data-id="' + id + '" title="删除">删除</button>' +
                  '</div>' +
                  '</div>';
                }
              }
              
              // 显示短链接
              if (linkItems.length > 0) {
                html += 
                  '<div style="margin-top: 40px;">' +
                  '<div class="stats">' +
                  '<span> 总共 ' + linkItems.length + ' 个短链接</span>' +
                  '</div>' +
                  '<h3> 全部短链接</h3>';
                
                for(var i = 0; i < linkItems.length; i++){
                  var item = linkItems[i];
                  var id = item.id;
                  var name = item.name;
                  var title = item.title;
                  var time = item.time || {};
                  var expireAt = item.expireAt;
                  var ts = time.updatedAt || time.createdAt || null;
                  var link = location.origin + '/' + id;
                  var timeText = ts ? new Date(ts).toLocaleString() : '';
                  var expireText = expireAt ? new Date(Number(expireAt)).toLocaleString() : '永不过期';
                  var isExpired = expireAt ? Number(expireAt) < Date.now() : false;
                  var expireColor = isExpired ? '#ff6b6b' : (expireAt ? '#f59f00' : '#51cf66');
                  var displayName = title ? (i + 1) + '. ' + title + ' (' + link + ')' : 
                                   name ? (i + 1) + '. ' + name + ' (' + link + ')' : 
                                   (i + 1) + '. ' + link;
                  
                  html += 
                    '<div class="paste-item">' +
                    '<a href="' + link + '" target="_blank" data-id="' + id + '" class="paste-link-item link-item" style="cursor: pointer;">' + displayName + '</a>' +
                    (timeText ? '<div style="color:#666;font-size:12px;margin-left:10px;white-space:nowrap;">' + timeText + '</div>' : '') +
                    '<div style="color:' + expireColor + ';font-size:12px;margin-left:10px;white-space:nowrap;">' + (isExpired ? '已过期' : (expireAt ? '过期: ' + expireText : expireText)) + '</div>' +
                    '<div class="paste-actions">' +
                  '<button class="action-btn copy-btn" data-id="' + id + '" title="复制链接">复制</button>' +
                  '<button class="action-btn qr-btn" data-id="' + id + '" title="显示二维码">二维码</button>' +
                  '<button class="action-btn edit-btn" data-id="' + id + '" title="编辑">编辑</button>' +
                  '<button class="action-btn delete-btn" data-id="' + id + '" title="删除">删除</button>' +
                  '</div>' +
                  '</div>';
                }
                html += '</div>';
              }
              
              allPastes.innerHTML = html;
              
              // 添加事件监听器
              var textLinks = allPastes.querySelectorAll('.text-item');
              for(var j = 0; j < textLinks.length; j++){
                textLinks[j].addEventListener('click', function() {
                  showPasteContent(this.getAttribute('data-id'), this);
                });
              }
              
              var editBtns = allPastes.querySelectorAll('.edit-btn');
              for(var k = 0; k < editBtns.length; k++){
                editBtns[k].addEventListener('click', function() {
                  editPaste(this.getAttribute('data-id'));
                });
              }
              
              var copyBtns = allPastes.querySelectorAll('.copy-btn');
              for(var m = 0; m < copyBtns.length; m++){
                copyBtns[m].addEventListener('click', function() {
                  copyPasteLink(this.getAttribute('data-id'));
                });
              }
              
              var deleteBtns = allPastes.querySelectorAll('.delete-btn');
              for(var l = 0; l < deleteBtns.length; l++){
                deleteBtns[l].addEventListener('click', function() {
                  deletePaste(this.getAttribute('data-id'));
                });
              }
              
              // 添加二维码按钮事件监听器
              var qrBtns = allPastes.querySelectorAll('.qr-btn');
              for(var n = 0; n < qrBtns.length; n++){
                qrBtns[n].addEventListener('click', function() {
                  showQRCode(this.getAttribute('data-id'));
                });
              }
            });
          } else {
            allPastes.innerHTML = '<h3>暂无内容</h3><p style="color: #666; text-align: center;">还没有任何内容，快来创建第一个文本或短链接吧！</p>';
          }
        })
        .catch(function(error) {
          console.error('加载失败:', error);
          allPastes.innerHTML = '<div class="error"> 加载失败: ' + error.message + '</div>';
        });
    }
    
    // 如果是访问特定文本
    if(location.pathname.length > 1 && !location.pathname.startsWith('/api')){
      const id = location.pathname.slice(1);
      authFetch('/api/paste?id=' + id)
        .then(r => r.ok ? r.text() : '')
        .then(t => {
          if(t) {
            document.getElementById('paste-text').innerText = t;
            pasteContent.classList.add('show');
            
            // 隐藏其他可能显示的内容
            const editForm = document.querySelector('.edit-form');
            if (editForm) {
              editForm.remove();
            }
            
            // 滚动到内容区域
            pasteContent.scrollIntoView({ behavior: 'smooth' });
          }
        })
        .catch(error => {
          showError('加载内容失败: ' + error.message);
        });
    }
    
    // 页面加载时显示全部文本
    loadAllPastes();

    // 封装fetch，自动带token
    function authFetch(url, options = {}) {
      const token = localStorage.getItem('token') || '';
      options.headers = options.headers || {};
      options.headers['Authorization'] = 'Bearer ' + token;
      return fetch(url, options);
    }

    // 登录逻辑
    async function login() {
      const username = document.getElementById('login-username').value.trim();
      const password = document.getElementById('login-password').value;
      if (!username || !password) {
        document.getElementById('login-error').innerText = '请输入用户名和密码';
        return;
      }
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.code === 1) {
        localStorage.setItem('token', data.token);
        showMain();
        if (typeof loadAllPastes === 'function') loadAllPastes();
        // 显示token
        renderTokenBox();
      } else {
        document.getElementById('login-error').innerText = data.message;
      }
    }

    function showLogin() {
      document.getElementById('login-form').style.display = 'block';
      document.querySelector('.container').style.display = 'none';
    }
    function showMain() {
      document.getElementById('login-form').style.display = 'none';
      document.querySelector('.container').style.display = 'block';
      renderTokenBox();
    }
    function checkLoginDisplay() {
      if (!localStorage.getItem('token')) {
        showLogin();
      } else {
        showMain();
      }
    }
    // 兼容DOMContentLoaded已触发和未触发的情况
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkLoginDisplay);
    } else {
      checkLoginDisplay();
    }

    function renderTokenBox() {
      let token = localStorage.getItem('token');
      let tokenBox = document.getElementById('token-box');
      if (!token) {
        if (tokenBox) tokenBox.remove();
        return;
      }
      if (!tokenBox) {
        tokenBox = document.createElement('div');
        tokenBox.id = 'token-box';
        tokenBox.style = 'margin:20px auto 0 auto;background:rgba(74, 144, 226, 0.1);backdrop-filter:blur(10px);border:1px solid rgba(74, 144, 226, 0.2);border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.08);padding:0;overflow:hidden;transition:all 0.3s ease;max-width:400px;min-width:250px;';
        
        // 创建头部（始终显示）
        const header = document.createElement('div');
        header.style = 'padding:12px 16px;background:#4a90e2;color:white;display:flex;align-items:center;justify-content:space-between;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2);';
        header.innerHTML = 
          '<div style="display:flex;align-items:center;gap:8px;">' +

            '<span style="font-size:14px;font-weight:500;">API Token</span>' +
          '</div>' +
          '<div style="display:flex;align-items:center;gap:8px;">' +
            '<button id="copy-token-btn" style="padding:6px 12px;border-radius:4px;border:none;background:rgba(255,255,255,0.2);color:white;cursor:pointer;font-size:12px;transition:all 0.2s;">复制</button>' +
            '<button id="logout-btn" style="padding:6px 12px;border-radius:4px;border:none;background:#e74c3c;color:white;cursor:pointer;font-size:12px;transition:all 0.2s;">退出</button>' +
            '<span id="toggle-icon" style="font-size:12px;transition:transform 0.3s ease;">▼</span>' +
          '</div>';
        
        // 创建内容区域（可折叠）
        const content = document.createElement('div');
        content.id = 'token-content';
        content.style = 'padding:16px;background:white;border-top:1px solid rgba(74, 144, 226, 0.2);display:none;';
        content.innerHTML = 
          '<div style="margin-bottom:12px;">' +
            '<div style="font-size:12px;color:#666;margin-bottom:6px;">完整 Token:</div>' +
            '<div id="token-value" style="font-family:monospace;font-size:11px;background:#f8f9fa;border:1px solid #e9ecef;border-radius:6px;padding:8px;word-break:break-all;line-height:1.4;color:#333;">' + token + '</div>' +
          '</div>' +
          '<div style="font-size:11px;color:#999;text-align:center;">点击头部可折叠/展开</div>';
        
        tokenBox.appendChild(header);
        tokenBox.appendChild(content);
        document.querySelector('.header').appendChild(tokenBox);
        
        // 添加悬停效果
        tokenBox.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-2px)';
          this.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
        });
        tokenBox.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
          this.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
        });
        
        // 折叠/展开功能
        header.addEventListener('click', function() {
          const content = document.getElementById('token-content');
          const icon = document.getElementById('toggle-icon');
          if (content.style.display === 'none') {
            content.style.display = 'block';
            icon.style.transform = 'rotate(180deg)';
          } else {
            content.style.display = 'none';
            icon.style.transform = 'rotate(0deg)';
          }
        });
        
        // 按钮事件
        document.getElementById('copy-token-btn').onclick = function(e) {
          e.stopPropagation();
          navigator.clipboard.writeText(token).then(function(){
            const btn = document.getElementById('copy-token-btn');
            const originalText = btn.innerText;
            btn.innerText = '已复制';
            btn.style.background = 'rgba(81,207,102,0.8)';
            setTimeout(() => {
              btn.innerText = originalText;
              btn.style.background = 'rgba(255,255,255,0.2)';
            }, 1500);
          });
        };
        
        document.getElementById('logout-btn').onclick = function(e) {
          e.stopPropagation();
          if (confirm('确定要退出登录吗？')) {
            localStorage.removeItem('token');
            location.reload();
          }
        };
      } else {
        document.getElementById('token-value').innerText = token;
      }
    }
  </script>
</body>
</html>
`;

export default {
  async fetch(request, env, ctx) {
    try {
    const url = new URL(request.url);
      
      // 添加CORS头
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-From',
      };
      // 统一返回工具
      const respond = {
        json(data, init = {}) {
          return new Response(JSON.stringify(data), { headers: { 'content-type': 'application/json', ...corsHeaders }, ...init });
        },
        text(data, init = {}) {
          return new Response(data, { headers: { 'content-type': 'text/plain; charset=utf-8', ...corsHeaders }, ...init });
        },
        html(data, init = {}) {
          return new Response(data, { headers: { 'content-type': 'text/html; charset=utf-8', ...corsHeaders }, ...init });
        }
      };
      
      // 处理OPTIONS请求
      if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
      }
      
    // 前端页面
    if (url.pathname === '/' || url.pathname === '') {
        return respond.html(html);
    }
      
      // 登录接口
      if (url.pathname === '/api/login' && request.method === 'POST') {
        const { username, password } = await request.json();
        const realUser = await env.texturl.get('user');
        const realPwd = await env.texturl.get('password');
        if (realUser && realPwd && username === realUser && password === realPwd) {
          // 先查是否已有token
          let token = await env.texturl.get('user_token:' + username);
          if (token) {
            // 检查token是否还有效
            const user = await env.texturl.get('token:' + token);
            if (user === username) return respond.json({ code: 1, token });
          }
          // 没有token或token已失效，生成新token
          token = Math.random().toString(36).slice(2) + Date.now().toString(36);
          await env.texturl.put('token:' + token, username, { expirationTtl: 2592000 });
          await env.texturl.put('user_token:' + username, token, { expirationTtl: 2592000 });
          return respond.json({ code: 1, token });
        } else {
          return respond.json({ code: 0, message: '用户名或密码错误' });
        }
      }

      // token校验函数（异步）
      async function checkAuth(request, env) {
        const auth = request.headers.get('Authorization') || '';
        if (!auth.startsWith('Bearer ')) return false;
        const token = auth.slice(7);
        const user = await env.texturl.get('token:' + token);
        return !!user;
      }

      // 检查是否过期的函数
      async function checkExpired(id, env) {
        const expireAt = await env.texturl.get(id + '_expireAt');
        if (expireAt) {
          const now = Date.now();
          if (Number(expireAt) < now) {
            // 内容已过期，删除它
            const deleteOperations = [];
            deleteOperations.push(env.texturl.delete(id));
            deleteOperations.push(env.texturl.delete(id + '_name'));
            deleteOperations.push(env.texturl.delete(id + '_title'));
            deleteOperations.push(env.texturl.delete(id + '_createdAt'));
            deleteOperations.push(env.texturl.delete(id + '_updatedAt'));
            deleteOperations.push(env.texturl.delete(id + '_expireAt'));
            deleteOperations.push(env.texturl.delete(id + '_type'));
            
            await Promise.all(deleteOperations);
            
            // 从列表中移除
            let list = await env.texturl.get('list');
            if (list) {
              list = JSON.parse(list);
              list = list.filter(item => item !== id);
              await env.texturl.put('list', JSON.stringify(list));
            }
            return true;
          }
        }
        return false;
      }

      // API: 新建/获取/编辑/删除短链接
      if (url.pathname.startsWith('/api/link')) {
        // 判断是否来自ZQ-SubLink指定域名
        const fromZQSubLink = 
          request.headers.get('X-From') === 'ZQ-SubLink' &&
          (
            request.headers.get('Origin') === 'https://sublink.vpnjacky.dpdns.org' ||
            (request.headers.get('Referer') && request.headers.get('Referer').startsWith('https://sublink.vpnjacky.dpdns.org'))
          );
        // 只有PUT/DELETE需要token，POST需要token但ZQ-SubLink可以免token
        if (['PUT','DELETE'].includes(request.method) || (request.method === 'POST' && !fromZQSubLink)) {
          const authed = await checkAuth(request, env);
          if (!authed) return respond.json({ code: 0, message: '未登录' }, { status: 401 });
        }
        
        if (request.method === 'POST') {
          try {
            let { url: originalUrl, title, name, expireAt } = await request.json();
            if (!originalUrl) return respond.json({ code: 0, message: '链接不能为空' }, { status: 400 });
            
            // 验证链接格式
            try {
              new URL(originalUrl);
            } catch {
              return respond.json({ code: 0, message: '请输入有效的URL，包括http://或https://' }, { status: 400 });
            }
            
            // 验证自定义显示名称格式
            if (title && (title.length < 1 || title.length > 50)) {
              return respond.json({ 
                code: 0, 
                message: '自定义显示名称格式无效，长度1-50字符' 
              }, { status: 400 });
            }
            
            // 服务器端清理并验证自定义链接后缀格式
            if (name) {
              name = name.replace(/[^a-zA-Z0-9._-]/g, '');
            }
            if (name && !/^[a-zA-Z0-9._-]+$/.test(name)) {
              return respond.json({ 
                code: 0, 
                message: '自定义链接格式无效，支持字母、数字、连字符(-)、下划线(_)、点号(.)' 
              }, { status: 400 });
            }
            
            // 生成唯一ID（如果提供了自定义名称，则使用它作为ID）
            const reserved = ['user', 'password', 'list', 'api'];
            let id;
            
            if (name) {
              // 使用自定义名称作为ID
              if (reserved.includes(name)) {
                return respond.json({ 
                  code: 0, 
                  message: '该名称为系统保留字，请更换其他名称' 
                }, { status: 400 });
              }
              
              // 检查ID是否已存在
              const existing = await env.texturl.get(name);
              if (existing) {
                return respond.json({ 
                  code: 0, 
                  message: '该链接已存在，请更换其他名称' 
                }, { status: 409 });
              }
              
              id = name;
            } else {
              // 自动生成ID
              do {
                id = Math.random().toString(36).slice(2, 8);
              } while (reserved.includes(id));
            }
            
            const operations = [];
            
            // 并行执行所有 KV 写入操作
            operations.push(env.texturl.put(id, originalUrl));
            operations.push(env.texturl.put(id + '_createdAt', Date.now().toString()));
            operations.push(env.texturl.put(id + '_type', 'link'));
            
            if (title) {
              operations.push(env.texturl.put(id + '_title', title));
            }
            
            if (name) {
              operations.push(env.texturl.put(id + '_name', name));
            }
            
            if (expireAt) {
              operations.push(env.texturl.put(id + '_expireAt', expireAt.toString()));
            }
            
            // 并行执行所有 KV 写入
            await Promise.all(operations);
            
            // 获取并更新列表
            let list = await env.texturl.get('list');
            list = list ? JSON.parse(list) : [];
            list.unshift(id);
            if (list.length > 100) list = list.slice(0, 100);
            await env.texturl.put('list', JSON.stringify(list));
            
            return respond.json({ code: 1, id });
          } catch (error) {
            return respond.json({ code: 0, message: '处理请求失败: ' + error.message }, { status: 500 });
          }
        } else if (request.method === 'PUT') {
          try {
            let { id, url: originalUrl, title, name, expireAt } = await request.json();
            if (!id || !originalUrl) return respond.json({ code: 0, message: 'ID和链接不能为空' }, { status: 400 });
            
            // 验证链接格式
            try {
              new URL(originalUrl);
            } catch {
              return respond.json({ code: 0, message: '请输入有效的URL，包括http://或https://' }, { status: 400 });
            }
            
            // 检查原ID是否存在
            const existing = await env.texturl.get(id);
            if (!existing) return respond.json({ code: 0, message: '链接不存在' }, { status: 404 });
            
            // 验证自定义显示名称格式
            if (title && (title.length < 1 || title.length > 50)) {
              return respond.json({ 
                code: 0, 
                message: '自定义显示名称格式无效，长度1-50字符' 
              }, { status: 400 });
            }
            
            // 如果要修改名称（链接后缀）
            let newId = id;
            let needUpdateContent = true;
            
            if (name !== undefined && name !== (await env.texturl.get(id + '_name') || '')) {
              // 验证新名称格式
              if (name) {
                name = name.replace(/[^a-zA-Z0-9._-]/g, '');
              }
              if (name && !/^[a-zA-Z0-9._-]+$/.test(name)) {
                return respond.json({ 
                  code: 0, 
                  message: '自定义链接格式无效，支持字母、数字、连字符(-)、下划线(_)、点号(.)' 
                }, { status: 400 });
              }
              
              const reserved = ['user', 'password', 'list', 'api'];
              
              // 如果提供了新名称且与原ID不同
              if (name && name !== id) {
                if (reserved.includes(name)) {
                  return respond.json({ 
                    code: 0, 
                    message: '该名称为系统保留字，请更换其他名称' 
                  }, { status: 400 });
                }
                
                // 检查新ID是否已存在
                const nameExists = await env.texturl.get(name);
                if (nameExists) {
                  return respond.json({ 
                    code: 0, 
                    message: '该链接已存在，请更换其他名称' 
                  }, { status: 409 });
                }
                
                // 迁移数据到新ID
                newId = name;
                
                // 复制原数据到新ID，并更新内容
                const copyOperations = [];
                copyOperations.push(env.texturl.put(newId, originalUrl));
                
                // 复制时间戳
                const createdAt = await env.texturl.get(id + '_createdAt');
                if (createdAt) copyOperations.push(env.texturl.put(newId + '_createdAt', createdAt));
                
                // 复制类型标记
                copyOperations.push(env.texturl.put(newId + '_type', 'link'));
                
                // 并行执行复制操作
                await Promise.all(copyOperations);
                
                // 删除原ID数据（包括所有相关字段）
                const deleteOperations = [];
                deleteOperations.push(env.texturl.delete(id));
                deleteOperations.push(env.texturl.delete(id + '_name'));
                deleteOperations.push(env.texturl.delete(id + '_title'));
                deleteOperations.push(env.texturl.delete(id + '_createdAt'));
                deleteOperations.push(env.texturl.delete(id + '_updatedAt'));
                deleteOperations.push(env.texturl.delete(id + '_expireAt'));
                deleteOperations.push(env.texturl.delete(id + '_type'));
                
                // 并行执行删除操作
                await Promise.all(deleteOperations);
                
                // 更新列表中的ID
                let list = await env.texturl.get('list');
                if (list) {
                  list = JSON.parse(list);
                  list = list.map(item => item === id ? newId : item);
                  await env.texturl.put('list', JSON.stringify(list));
                }
                
                needUpdateContent = false;
              } else if (!name) {
                // 如果清空名称，不改变ID，但仍需更新内容
                await env.texturl.delete(id + '_name');
              }
            }
            
            const updateOperations = [];
            
            // 更新内容（如果还没有更新过）
            if (needUpdateContent) {
              updateOperations.push(env.texturl.put(newId, originalUrl));
            }
            
            // 记录修改时间（毫秒）
            updateOperations.push(env.texturl.put(newId + '_updatedAt', Date.now().toString()));
            
            // 处理自定义显示名称
            if (title !== undefined) {
              if (title) {
                updateOperations.push(env.texturl.put(newId + '_title', title));
              } else {
                updateOperations.push(env.texturl.delete(newId + '_title'));
              }
            }
            
            // 处理过期时间
            if (expireAt !== undefined) {
              if (expireAt) {
                updateOperations.push(env.texturl.put(newId + '_expireAt', expireAt.toString()));
              } else {
                updateOperations.push(env.texturl.delete(newId + '_expireAt'));
              }
            }
            
            // 处理自定义链接后缀
            if (name !== undefined) {
              if (name) {
                updateOperations.push(env.texturl.put(newId + '_name', name));
              } else {
                updateOperations.push(env.texturl.delete(newId + '_name'));
              }
            }
            
            // 并行执行所有更新操作
            await Promise.all(updateOperations);
            
            return respond.json({ code: 1, message: '更新成功', id: newId });
          } catch (error) {
            return respond.json({ code: 0, message: '更新失败: ' + error.message }, { status: 500 });
          }
        } else if (request.method === 'DELETE') {
          try {
            const { id } = await request.json();
            if (!id) return respond.json({ code: 0, message: 'ID不能为空' }, { status: 400 });
            const existing = await env.texturl.get(id);
            if (!existing) return respond.json({ code: 0, message: '链接不存在' }, { status: 404 });
            
            const deleteOperations = [];
            deleteOperations.push(env.texturl.delete(id));
            deleteOperations.push(env.texturl.delete(id + '_name'));
            deleteOperations.push(env.texturl.delete(id + '_title'));
            deleteOperations.push(env.texturl.delete(id + '_createdAt'));
            deleteOperations.push(env.texturl.delete(id + '_updatedAt'));
            deleteOperations.push(env.texturl.delete(id + '_expireAt'));
            deleteOperations.push(env.texturl.delete(id + '_type'));
            
            await Promise.all(deleteOperations);
            
            let list = await env.texturl.get('list');
            if (list) {
              list = JSON.parse(list);
              list = list.filter(item => item !== id);
              await env.texturl.put('list', JSON.stringify(list));
            }
            return respond.json({ code: 1, message: '删除成功' });
          } catch (error) {
            return respond.json({ code: 0, message: '删除失败: ' + error.message }, { status: 500 });
          }
        } else if (request.method === 'GET') {
          // 获取内容也需要token校验
          const authed = await checkAuth(request, env);
          if (!authed) {
            return respond.json({ code: 0, message: '未授权' }, { status: 401 });
          }
          const id = url.searchParams.get('id');
          if (!id) return respond.json({ code: 0, message: 'Not found' }, { status: 404 });
          
          // 检查是否过期
          const expired = await checkExpired(id, env);
          if (expired) return respond.json({ code: 0, message: 'Not found' }, { status: 404 });
          
          const linkUrl = await env.texturl.get(id);
          if (!linkUrl) return respond.json({ code: 0, message: 'Not found' }, { status: 404 });
            return respond.text(linkUrl);
          }
        }
      
      // API: 新建/获取/编辑/删除文本
    if (url.pathname.startsWith('/api/paste')) {
        // 判断是否来自ZQ-SubLink指定域名
        const fromZQSubLink = 
          request.headers.get('X-From') === 'ZQ-SubLink' &&
          (
            request.headers.get('Origin') === 'https://sublink.vpnjacky.dpdns.org' ||
            (request.headers.get('Referer') && request.headers.get('Referer').startsWith('https://sublink.vpnjacky.dpdns.org'))
          );
        // 只有PUT/DELETE需要token，POST需要token但ZQ-SubLink可以免token
        if (['PUT','DELETE'].includes(request.method) || (request.method === 'POST' && !fromZQSubLink)) {
          const authed = await checkAuth(request, env);
          if (!authed) return respond.json({ code: 0, message: '未登录' }, { status: 401 });
        }
      if (request.method === 'POST') {
          try {
            let { text, title, name, expireAt } = await request.json();
            if (!text) return respond.json({ code: 0, message: '内容不能为空' }, { status: 400 });
            
            // 验证自定义显示名称格式
            if (title && (title.length < 1 || title.length > 50)) {
              return respond.json({ 
                code: 0, 
                message: '自定义显示名称格式无效，长度1-50字符' 
              }, { status: 400 });
            }
            
            // 服务器端清理并验证自定义链接后缀格式
            if (name) {
              name = name.replace(/[^a-zA-Z0-9._-]/g, '');
            }
            if (name && !/^[a-zA-Z0-9._-]+$/.test(name)) {
              return respond.json({ 
                code: 0, 
                message: '自定义链接格式无效，支持字母、数字、连字符(-)、下划线(_)、点号(.)' 
              }, { status: 400 });
            }
            
            // 生成唯一ID（如果提供了自定义名称，则使用它作为ID）
            const reserved = ['user', 'password', 'list', 'api'];
            let id;
            
            if (name) {
              // 使用自定义名称作为ID
              if (reserved.includes(name)) {
                return respond.json({ 
                  code: 0, 
                  message: '该名称为系统保留字，请更换其他名称' 
                }, { status: 400 });
              }
              
              // 检查ID是否已存在
              const existing = await env.texturl.get(name);
              if (existing) {
                return respond.json({ 
                  code: 0, 
                  message: '该链接已存在，请更换其他名称' 
                }, { status: 409 });
              }
              
              id = name;
            } else {
              // 自动生成ID
              do {
                id = Math.random().toString(36).slice(2, 8);
              } while (reserved.includes(id));
            }
            
            const operations = [];
            
            // 并行执行所有 KV 写入操作
            operations.push(env.texturl.put(id, text));
            operations.push(env.texturl.put(id + '_createdAt', Date.now().toString()));
            operations.push(env.texturl.put(id + '_type', 'text'));
            
            if (title) {
              operations.push(env.texturl.put(id + '_title', title));
            }
            
            if (name) {
              operations.push(env.texturl.put(id + '_name', name));
            }
            
            if (expireAt) {
              operations.push(env.texturl.put(id + '_expireAt', expireAt.toString()));
            }
            
            // 并行执行所有 KV 写入
            await Promise.all(operations);
            
            // 获取并更新列表
            let list = await env.texturl.get('list');
            list = list ? JSON.parse(list) : [];
            list.unshift(id);
            if (list.length > 100) list = list.slice(0, 100);
            await env.texturl.put('list', JSON.stringify(list));
            
            return respond.json({ code: 1, id });
          } catch (error) {
            return respond.json({ code: 0, message: '处理请求失败: ' + error.message }, { status: 500 });
          }
        } else if (request.method === 'PUT') {
          try {
            let { id, text, title, name, expireAt } = await request.json();
            if (!id || !text) return respond.json({ code: 0, message: 'ID和内容不能为空' }, { status: 400 });
            
            // 检查原ID是否存在
            const existing = await env.texturl.get(id);
            if (!existing) return respond.json({ code: 0, message: '文本不存在' }, { status: 404 });
            
            // 验证自定义显示名称格式
            if (title && (title.length < 1 || title.length > 50)) {
              return respond.json({ 
                code: 0, 
                message: '自定义显示名称格式无效，长度1-50字符' 
              }, { status: 400 });
            }
            
            // 如果要修改名称（链接后缀）
            let newId = id;
            let needUpdateContent = true;
            
            if (name !== undefined && name !== (await env.texturl.get(id + '_name') || '')) {
              // 验证新名称格式
              if (name) {
                name = name.replace(/[^a-zA-Z0-9._-]/g, '');
              }
              if (name && !/^[a-zA-Z0-9._-]+$/.test(name)) {
                return respond.json({ 
                  code: 0, 
                  message: '自定义链接格式无效，支持字母、数字、连字符(-)、下划线(_)、点号(.)' 
                }, { status: 400 });
              }
              
              const reserved = ['user', 'password', 'list', 'api'];
              
              // 如果提供了新名称且与原ID不同
              if (name && name !== id) {
                if (reserved.includes(name)) {
                  return respond.json({ 
                    code: 0, 
                    message: '该名称为系统保留字，请更换其他名称' 
                  }, { status: 400 });
                }
                
                // 检查新ID是否已存在
                const nameExists = await env.texturl.get(name);
                if (nameExists) {
                  return respond.json({ 
                    code: 0, 
                    message: '该链接已存在，请更换其他名称' 
                  }, { status: 409 });
                }
                
                // 迁移数据到新ID
                newId = name;
                
                // 复制原数据到新ID，并更新内容
                const copyOperations = [];
                copyOperations.push(env.texturl.put(newId, text));
                
                // 复制时间戳
                const createdAt = await env.texturl.get(id + '_createdAt');
                if (createdAt) copyOperations.push(env.texturl.put(newId + '_createdAt', createdAt));
                
                // 复制类型标记
                copyOperations.push(env.texturl.put(newId + '_type', 'text'));
                
                // 并行执行复制操作
                await Promise.all(copyOperations);
                
                // 删除原ID数据（包括所有相关字段）
                const deleteOperations = [];
                deleteOperations.push(env.texturl.delete(id));
                deleteOperations.push(env.texturl.delete(id + '_name'));
                deleteOperations.push(env.texturl.delete(id + '_title'));
                deleteOperations.push(env.texturl.delete(id + '_createdAt'));
                deleteOperations.push(env.texturl.delete(id + '_updatedAt'));
                deleteOperations.push(env.texturl.delete(id + '_expireAt'));
                deleteOperations.push(env.texturl.delete(id + '_type'));
                
                // 并行执行删除操作
                await Promise.all(deleteOperations);
                
                // 更新列表中的ID
                let list = await env.texturl.get('list');
                if (list) {
                  list = JSON.parse(list);
                  list = list.map(item => item === id ? newId : item);
                  await env.texturl.put('list', JSON.stringify(list));
                }
                
                needUpdateContent = false;
              } else if (!name) {
                // 如果清空名称，不改变ID，但仍需更新内容
                await env.texturl.delete(id + '_name');
              }
            }
            
            const updateOperations = [];
            
            // 更新内容（如果还没有更新过）
            if (needUpdateContent) {
              updateOperations.push(env.texturl.put(newId, text));
            }
            
            // 记录修改时间（毫秒）
            updateOperations.push(env.texturl.put(newId + '_updatedAt', Date.now().toString()));
            
            // 处理自定义显示名称
            if (title !== undefined) {
              if (title) {
                updateOperations.push(env.texturl.put(newId + '_title', title));
              } else {
                updateOperations.push(env.texturl.delete(newId + '_title'));
              }
            }
            
            // 处理过期时间
            if (expireAt !== undefined) {
              if (expireAt) {
                updateOperations.push(env.texturl.put(newId + '_expireAt', expireAt.toString()));
              } else {
                updateOperations.push(env.texturl.delete(newId + '_expireAt'));
              }
            }
            
            // 处理自定义链接后缀
            if (name !== undefined) {
              if (name) {
                updateOperations.push(env.texturl.put(newId + '_name', name));
              } else {
                updateOperations.push(env.texturl.delete(newId + '_name'));
              }
            }
            
            // 并行执行所有更新操作
            await Promise.all(updateOperations);
            
            return respond.json({ code: 1, message: '更新成功', id: newId });
          } catch (error) {
            return respond.json({ code: 0, message: '更新失败: ' + error.message }, { status: 500 });
          }
        } else if (request.method === 'DELETE') {
          try {
            const { id } = await request.json();
            if (!id) return respond.json({ code: 0, message: 'ID不能为空' }, { status: 400 });
            const existing = await env.texturl.get(id);
            if (!existing) return respond.json({ code: 0, message: '文本不存在' }, { status: 404 });
            
            const deleteOperations = [];
            deleteOperations.push(env.texturl.delete(id));
            deleteOperations.push(env.texturl.delete(id + '_name'));
            deleteOperations.push(env.texturl.delete(id + '_title'));
            deleteOperations.push(env.texturl.delete(id + '_createdAt'));
            deleteOperations.push(env.texturl.delete(id + '_updatedAt'));
            deleteOperations.push(env.texturl.delete(id + '_expireAt'));
            deleteOperations.push(env.texturl.delete(id + '_type'));
            
            await Promise.all(deleteOperations);
            
            let list = await env.texturl.get('list');
            if (list) {
              list = JSON.parse(list);
              list = list.filter(item => item !== id);
              await env.texturl.put('list', JSON.stringify(list));
            }
            return respond.json({ code: 1, message: '删除成功' });
          } catch (error) {
            return respond.json({ code: 0, message: '删除失败: ' + error.message }, { status: 500 });
          }
        } else if (request.method === 'GET') {
        // 获取内容也需要token校验
        const authed = await checkAuth(request, env);
        if (!authed) {
          return respond.json({ code: 0, message: '未授权' }, { status: 401 });
        }
        const id = url.searchParams.get('id');
        if (!id) return respond.json({ code: 0, message: 'Not found' }, { status: 404 });
        
        // 检查是否过期
        const expired = await checkExpired(id, env);
        if (expired) return respond.json({ code: 0, message: 'Not found' }, { status: 404 });
        
        const text = await env.texturl.get(id);
        if (!text) return respond.json({ code: 0, message: 'Not found' }, { status: 404 });
          return respond.text(text);
        }
      }
      
      // API: 获取所有文本
      if (url.pathname === '/api/list') {
        const authed = await checkAuth(request, env);
        if (!authed) return new Response('Unauthorized', { status: 401 });
        try {
          let list = await env.texturl.get('list');
          list = list ? JSON.parse(list) : [];
          return respond.json(list);
        } catch (error) {
          return respond.json([]);
        }
      }
      
      // API: 获取自定义名称
      if (url.pathname === '/api/name') {
        const authed = await checkAuth(request, env);
        if (!authed) return respond.json({ code: 0, message: '未授权' }, { status: 401 });
        const id = url.searchParams.get('id');
        if (!id) return respond.json({ code: 0, message: 'Not found' }, { status: 404 });
        const name = await env.texturl.get(id + '_name');
        if (!name) return respond.text('');
        return respond.text(name);
      }
      
      // API: 获取自定义显示名称
      if (url.pathname === '/api/title') {
        const authed = await checkAuth(request, env);
        if (!authed) return respond.json({ code: 0, message: '未授权' }, { status: 401 });
        const id = url.searchParams.get('id');
        if (!id) return respond.json({ code: 0, message: 'Not found' }, { status: 404 });
        const title = await env.texturl.get(id + '_title');
        if (!title) return respond.text('');
        return respond.text(title);
      }
      
      // API: 获取过期时间
      if (url.pathname === '/api/expire') {
        const authed = await checkAuth(request, env);
        if (!authed) return respond.json({ code: 0, message: '未授权' }, { status: 401 });
        const id = url.searchParams.get('id');
        if (!id) return respond.json({ code: 0, message: 'Not found' }, { status: 404 });
        const expireAt = await env.texturl.get(id + '_expireAt');
        if (!expireAt) return respond.text('');
        return respond.text(expireAt);
      }

      // API: 获取单条时间信息（createdAt/updatedAt）
      if (url.pathname === '/api/time') {
        const authed = await checkAuth(request, env);
        if (!authed) return respond.json({ code: 0, message: '未授权' }, { status: 401 });
        const id = url.searchParams.get('id');
        if (!id) return respond.json({ code: 0, message: 'Not found' }, { status: 404 });
        const createdAt = await env.texturl.get(id + '_createdAt');
        const updatedAt = await env.texturl.get(id + '_updatedAt');
        const result = { createdAt: createdAt ? Number(createdAt) : null, updatedAt: updatedAt ? Number(updatedAt) : null };
        return respond.json(result);
      }
      
      // API: 获取内容类型
      if (url.pathname === '/api/type') {
        const authed = await checkAuth(request, env);
        if (!authed) return respond.json({ code: 0, message: '未授权' }, { status: 401 });
        const id = url.searchParams.get('id');
        if (!id) return respond.json({ code: 0, message: 'Not found' }, { status: 404 });
        const type = await env.texturl.get(id + '_type');
        if (!type) return respond.text('text');
        return respond.text(type);
      }
      
    // 直接访问短链
    if (url.pathname.length > 1) {
      const id = url.pathname.slice(1);
      
      // 检查是否过期
      const expired = await checkExpired(id, env);
      if (expired) return new Response('Not found', { status: 404 });
      
      const content = await env.texturl.get(id);
      if (!content) return new Response('Not found', { status: 404 });
      
      // 检查类型
      const type = await env.texturl.get(id + '_type');
      if (type === 'link') {
        // 是短链接，重定向
        return new Response(null, {
          status: 302,
          headers: {
            'Location': content,
            ...corsHeaders
          }
        });
      } else {
        // 是文本，显示内容
        return new Response(content, { 
          headers: { 
            'content-type': 'text/plain; charset=utf-8',
            ...corsHeaders
          } 
        });
      }
    }
      
      return respond.html(html);
      
    } catch (error) {
      return new Response('Worker Error: ' + error.message, { status: 500 });
    }
  }
}
