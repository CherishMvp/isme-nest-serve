import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateDormitoryDto, CreateMemberDto } from './dto/create-class.dto';
import { UpdateMemberDto, UpdateRoomDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassPhotos, Dormitory } from './entities/class.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(ClassPhotos) private classRepo: Repository<ClassPhotos>,
    @InjectRepository(Dormitory) private dormitoryRepo: Repository<Dormitory>,
  ) {}

  // 获取所有寝室以及成员信息
  async getAllClassPhotos() {
    const res = await this.dormitoryRepo.find({ relations: ['members'] });
    for (const dormitory of res) {
      dormitory.photo_nums = dormitory['members'].length;
      dormitory['swiper_list'] = dormitory['swiper_list'].split('\\n');
    }
    return res;
  }
  // 返回单个寝室的内容
  async findOne(id: number) {
    // const res = await this.dormitoryRepo.find({ relations: ['members'], where: { id } });
    const res = await this.dormitoryRepo
      .createQueryBuilder('dormitory')
      .leftJoinAndSelect('dormitory.members', 'members')
      .where('dormitory.id = :id', { id })
      .getMany();
    for (const dormitory of res) {
      dormitory['photo_nums'] = dormitory['members'].length;
      dormitory['swiper_list'] = dormitory['swiper_list'].split('\\n');
    }
    return res;
  }
  // 创建寝室信息
  async createRoom(createDormitoryDto: CreateDormitoryDto) {
    const isExist = await this.dormitoryRepo.exist({
      where: { dormitoryId: createDormitoryDto.dormitoryId, title: createDormitoryDto.title },
    }); //两个限制条件，防止重复
    // 再加个限制条件，判断title也是否相同
    console.log('isExist', isExist);
    if (isExist) {
      throw new BadRequestException('寝室已存在');
    }
    return await this.dormitoryRepo.save(createDormitoryDto);
  }

  // 更新寝室信息
  async updateRoom(updateClassDto: UpdateRoomDto): Promise<any> {
    console.log('updateClassDto', updateClassDto);
    const roomInfo = await this.dormitoryRepo.findOne({
      where: { dormitoryId: updateClassDto.dormitoryId },
    });
    if (!roomInfo) throw new BadRequestException('寝室信息不存在或者已删除');
    const newClass = this.dormitoryRepo.merge(roomInfo, updateClassDto);
    return await this.dormitoryRepo.save(newClass);
  }

  // 删除寝室
  async removeRoom(id: number) {
    const isExist = await this.dormitoryRepo.exist({ where: { dormitoryId: id } });
    if (!isExist) {
      throw new BadRequestException('寝室不存在或者已删除');
    }
    return await this.dormitoryRepo.delete(id);
  }

  // 创建成员信息
  async createMember(createMemberDto: CreateMemberDto) {
    const isExist = await this.dormitoryRepo.findOne({
      where: { dormitoryId: createMemberDto.dormitoryId },
    });
    if (!isExist) {
      throw new BadRequestException('寝室不存在');
    }
    return await this.classRepo.save(createMemberDto);
  }

  // 更新单个同学信息
  async updateMember(id: number, updateClassDto: UpdateMemberDto): Promise<any> {
    const classPhoto = await this.classRepo.findOne({ where: { id } });
    if (!classPhoto) throw new BadRequestException('成员信息不存在或者已删除');

    // 检查 dormitoryId 是否存在于 dormitory 表中
    const dormitory = await this.dormitoryRepo.findOne({
      where: { dormitoryId: updateClassDto.dormitoryId },
    });
    if (!dormitory) {
      throw new BadRequestException('寝室不存在');
    }
    const newClass = this.classRepo.merge(classPhoto, updateClassDto);
    return await this.classRepo.save(newClass);
  }
  // 删除单个同学
  async removeMember(id: number) {
    return await this.classRepo.delete(id);
  }

  // 获取所有寝室ID
  async getAllRomIDs() {
    const res = await this.dormitoryRepo.find({ select: ['id', 'dormitoryId', 'title', 'desc'] });
    return res;
  }
}
