// 生成文件名，作为 key 使用
const generateFileName = (ossData, file) => {
  const suffix = file.name.slice(file.name.lastIndexOf('.'))
  const filename = Date.now() + suffix
  return ossData.dir + filename
}
