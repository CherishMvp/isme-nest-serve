import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto, CreateDormitoryDto } from './create-class.dto';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {}
export class UpdateRoomDto extends PartialType(CreateDormitoryDto) {}
