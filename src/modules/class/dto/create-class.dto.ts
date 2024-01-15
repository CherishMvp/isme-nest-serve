import { Allow, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export interface CreateClassDto {
  name: string;
  dormitoryId: number;
  imageUrl: string;
}
export class CreateMemberDto {
  @IsNotEmpty({ message: '角色名不能为空' })
  name: string;
  @IsNotEmpty({ message: '寝室编码不能为空' })
  dormitoryId: number;
  @IsOptional()
  // @IsArray()
  imageUrl: string;
}
export class CreateDormitoryDto {
  @IsNotEmpty({ message: '寝室名称不能为空' })
  title: string;
  @IsNotEmpty({ message: '寝室编码不能为空' })
  dormitoryId: number;
  @IsNotEmpty({ message: '寝室宣传语不能为空' })
  desc: string;
  @IsOptional()
  // @IsArray()
  swiper_list: string;
}
