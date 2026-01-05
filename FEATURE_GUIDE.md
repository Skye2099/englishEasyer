# 单词管理功能使用指南

## 功能概述

现在你可以在单词列表页面上直接添加、管理和导出自定义单词了！所有的用户自定义单词会保存在浏览器的本地存储中，并且可以方便地导出为代码格式，粘��到 `words.ts` 文件中实现持久化。

## 新增功能

### 1. 添加单词
- **位置**：进入任意分类的单词列表页，右上角有 "+ 添加" 按钮
- **操作**：
  1. 点击右上角的 "+ 添加" 按钮
  2. 在弹出的表单中填写：
     - 单词（必填）
     - 注解（必填）：格式建议为 "中文意思 - 英文解释"
     - 音标（可选）：例如 `/ˈæpl/`
  3. 点击"添加"按钮

### 2. 导出单词
- **位置**：进入任意分类的单词列表页，右上角有 "↓ 导出" 按钮
- **操作**：
  1. 点击右上角的 "↓ 导出" 按钮
  2. 查看当前分类的所有自定义单词统计
  3. 点击"复制代码"按钮
  4. 打开 `src/data/words.ts` 文件
  5. 找到对应的分类数组（如 `basicWords`、`phrases`、`pronunciation`）
  6. 粘贴代码到数组中（注意添加逗号分隔）
  7. 保存文件，单词将成为默认数据，提交到 Git

### 3. 查看单词
- 用户自定义的单词会以**粉红色渐变**显示，与默认单词区分开
- 自定义单词上会显示"自定义"标签

### 4. 删除单词
- **操作**：
  1. 点击任意自定义单词查看详情
  2. 在弹出的详情框底部会显示"删除单词"按钮
  3. 点击按钮并确认即可删除

### 5. 数据持久化
- **临时存储**：所有自定义单词都保存在浏览器的 localStorage 中
- **永久存储**：使用"导出"功能将单词代码复制到 `words.ts` 文件中

## 数据存储说明

### 📦 本地存储（localStorage）
- **位置**：浏览器缓存中（不在项目文件夹）
- **持久性**：
  - ✅ 同一台电脑、同一个浏览器
  - ✅ 刷新页面
  - ✅ 关闭浏览器重新打开
  - ✅ 重启电脑
- **会丢失的情况**：
  - ❌ 清除浏览器缓存/数据
  - ❌ 使用隐私模式/无痕模式
  - ❌ 换一个浏览器
  - ❌ 换一台电脑

### 💾 Git 项目持久化
如果想让单词永久保存到项目中：
1. 点击"导出"按钮
2. 复制生成的代码
3. 粘贴到 [src/data/words.ts](src/data/words.ts) 对应的数组中
4. 提交到 Git 仓库

**好处**：
- ✅ 成为默认数据，所有用户都能看到
- ✅ 提交到 Git，永久保存
- ✅ 换设备、换浏览器都不会丢失

## 技术实现

### 新增文件

1. **[src/utils/storage.ts](src/utils/storage.ts)**
   - 本地存储管理工具
   - 提供 CRUD 操作函数

2. **[src/contexts/WordContext.tsx](src/contexts/WordContext.tsx)**
   - React Context API 实现的全局状态管理
   - 统一管理默认单词和用户自定义单词

3. **[src/components/AddWordModal.tsx](src/components/AddWordModal.tsx)**
   - 添加单词的表单弹窗组件

4. **[src/components/AddWordModal.css](src/components/AddWordModal.css)**
   - 添加单词弹窗的样式

5. **[src/components/ExportModal.tsx](src/components/ExportModal.tsx)**
   - 导出单词数据的弹窗组件
   - 生成可直接粘贴到 words.ts 的代码

6. **[src/components/ExportModal.css](src/components/ExportModal.css)**
   - 导出弹窗的样式

### 更新的文件

1. **[src/App.tsx](src/App.tsx)**
   - 集成 WordProvider 提供全局状态

2. **[src/components/HomePage.tsx](src/components/HomePage.tsx)**
   - 简化为单纯的分类选择页

3. **[src/components/HomePage.css](src/components/HomePage.css)**
   - 恢复原来的简洁样式

4. **[src/components/WordList.tsx](src/components/WordList.tsx)**
   - 添加"添加单词"和"导出"按钮到右上角
   - 支持删除自定义单词功能
   - 区分显示自定义单词和默认单词

5. **[src/components/WordList.css](src/components/WordList.css)**
   - 添加自定义单词的特殊样式
   - 添加按钮布局样式

## 导出功能详解

### 导出数据格式示例

假设你在"基础3000词汇"分类中添加了以下单词：
- test / 测试 - A procedure to assess quality / /test/
- hello / 你好 - A greeting

点击"导出"后，会生成：

```javascript
// 复制以下代码到 src/data/words.ts 对应的分类数组中

  { word: 'test', annotation: '测试 - A procedure to assess quality', pronunciation: '/test/' },
  { word: 'hello', annotation: '你好 - A greeting' }
```

### 如何粘贴到 words.ts

打开 [src/data/words.ts](src/data/words.ts)，找到对应的数组：

```typescript
export const basicWords: Word[] = [
  { word: 'apple', annotation: '苹果 - A fruit that is typically red or green.' },
  // ... 其他单词
  { word: 'people', annotation: '人们 - Human beings in general or considered collectively.' },

  // 👇 在这里粘贴导出的代码（注意添加逗号）
  { word: 'test', annotation: '测试 - A procedure to assess quality', pronunciation: '/test/' },
  { word: 'hello', annotation: '你好 - A greeting' }
];
```

保存后，这些单词就成为默认数据了！

## 数据结构

### UserWord 接口
```typescript
interface UserWord extends Word {
  id: string;           // 唯一标识符
  categoryIndex: number; // 所属分类索引
  createdAt: string;     // 创建时间
}
```

### 存储格式
```json
{
  "userWords": [
    {
      "word": "example",
      "annotation": "示例 - An example word",
      "pronunciation": "/ɪɡˈzɑːmpl/",
      "id": "1704451200000-abc123",
      "categoryIndex": 0,
      "createdAt": "2026-01-05T10:00:00.000Z"
    }
  ]
}
```

## 使用建议

1. **添加单词时**：
   - 注解建议按照"中文意思 - 英文解释"的格式填写
   - 音标可以从在线词典复制（如 Cambridge Dictionary）

2. **定期导出**：
   - 建议定期使用"导出"功能备份数据
   - 重要单词及时导出到 words.ts 中

3. **数据管理**：
   - localStorage 中的数据仅供临时使用
   - 想要永久保存，请导出到 words.ts

## 未来可能的扩展

- [ ] 编辑已有的自定义单词
- [ ] 批量导入/导出功能
- [ ] 搜索和筛选功能
- [ ] 单词学习进度追踪
- [ ] 多设备同步（需要后端支持）

