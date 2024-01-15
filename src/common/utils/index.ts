function generateExampleJson(text: string): any {
  let result: any = {};

  const fieldRegex = /@IsNotEmpty\([^)]*\)\s*([\w_]+):\s*([^;\n]+)/g;
  let match;
  while ((match = fieldRegex.exec(text)) !== null) {
    const [fullMatch, fieldName, fieldType] = match;
    result[fieldName] = getExampleValueByType(fieldType);
  }

  // 单独处理没有装饰器的字段
  const swiperListRegex = /([\w_]+):\s*([^;\n]+)/g;
  while ((match = swiperListRegex.exec(text)) !== null) {
    const [fullMatch, fieldName, fieldType] = match;
    if (!(fieldName in result)) {
      result[fieldName] = getExampleValueByType(fieldType);
    }
  }

  return result;
}

function parseTypeAnnotation(typeAnnotation: string): string {
  const fieldType = typeAnnotation
    .trim()
    .replace(/@IsNotEmpty\([^)]*\)/, '')
    .trim();
  return fieldType;
}
function getExampleValueByType(type: string): any {
  switch (type) {
    case 'string':
      return '示例字符串';
    case 'number':
      return 123;
    case 'boolean':
      return true;
    case 'object':
      return {};
    case 'array':
      return [];
    default:
      return null;
  }
}

// 示例使用
const text = `{
  @IsNotEmpty({ message: '寝室名称不能为空' })
  title: string;
  @IsNotEmpty({ message: '寝室编码不能为空' })
  dormitoryId: number;
  @IsNotEmpty({ message: '寝室宣传语不能为空' })
  desc: string;
  @IsOptional()
  swiper_list: string;
}`;

const exampleJson = generateExampleJson(text);
console.log(exampleJson);
