import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto, CreateDormitoryDto } from './create-class.dto';
import { IsOptional } from 'class-validator';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {}
export class UpdateRoomDto extends PartialType(CreateDormitoryDto) {
  @IsOptional()
  id: number;
}
