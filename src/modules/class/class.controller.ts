import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateDormitoryDto, CreateMemberDto } from './dto/create-class.dto';
import { UpdateMemberDto, UpdateRoomDto } from './dto/update-class.dto';
import { QueryClassDto } from './dto/query-class.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  // 创建寝室信息
  @Post('/createRoom')
  createRoom(@Body() createClassDto: CreateDormitoryDto) {
    return this.classService.createRoom(createClassDto);
  }
  // 创建同学信息
  @Post('/createMember')
  createMember(@Body() CreateMemberDto: CreateMemberDto) {
    return this.classService.createMember(CreateMemberDto);
  }
  // 分页查询（传参）
  @Get('/dorm/page')
  findRoomInfoPagination(@Query() queryDto: QueryClassDto) {
    return this.classService.findRoomInfoPagination(queryDto);
  }
  @Get('/member/page')
  findMemberInfoPagination(@Query() queryDto: QueryClassDto) {
    return this.classService.findMemberInfoPagination(queryDto);
  }
  @Get('/findAllClassPhotos')
  findAll() {
    return this.classService.getAllClassPhotos();
  }
  // 获取所有寝室ID
  @Get('/findAllRomIDs')
  findAllRomIDs() {
    return this.classService.getAllRomIDs();
  }
  @Get('/findOne/:id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id);
  }

  @Put('/updateMember/:id')
  updateMember(@Param('id') id: string, @Body() dto: UpdateMemberDto) {
    console.log('UpdateMemberDto', id, dto);
    return this.classService.updateMember(+id, dto);
  }
  @Put('/updateRoom')
  updateRoom(@Body() dto: UpdateRoomDto) {
    console.log('更新寝室信息', dto);
    return this.classService.updateRoom(dto);
  }

  @Delete('/deleteRoom/:id')
  removeRoom(@Param('id') id: string) {
    return this.classService.removeRoom(+id);
  }
  @Delete('/deleteMember/:id')
  removeMember(@Param('id') id: string) {
    return this.classService.removeMember(+id);
  }
}
