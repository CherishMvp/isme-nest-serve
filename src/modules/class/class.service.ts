import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateDormitoryDto, CreateMemberDto } from './dto/create-class.dto';
import { UpdateMemberDto, UpdateRoomDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassPhotos, Dormitory } from './entities/class.entity';
import { Like, Repository, getRepository } from 'typeorm';
import { isArray } from 'class-validator';
import { QueryClassDto } from './dto/query-class.dto';

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
      for (const dormitory of res) {
        dormitory['photo_nums'] = dormitory['members'].length;
        dormitory['members'].forEach((member) => {
          member['dormitoryId'] = dormitory.dormitoryId;
        });
      }
      // dormitory['swiper_list'] = dormitory['swiper_list'].split('\\n');
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

  // 更新寝室信息(还是要根据主键去更新)
  async updateRoom(updateClassDto: UpdateRoomDto): Promise<any> {
    console.log('updateClassDto', updateClassDto);
    const roomInfo = await this.dormitoryRepo.findOne({
      where: { id: updateClassDto.id },
    });
    if (!roomInfo) throw new BadRequestException('寝室信息不存在或者已删除');
    if (isArray(updateClassDto.swiper_list)) {
      updateClassDto.swiper_list = updateClassDto.swiper_list.join('\\n');
    }
    const newClass = this.dormitoryRepo.merge(roomInfo, updateClassDto);
    return await this.dormitoryRepo.save(newClass);
  }

  // 删除寝室（修改成主键删除即可）
  async removeRoom(id: number) {
    const isExist = await this.dormitoryRepo.exist({ where: { id } });
    if (!isExist) {
      throw new BadRequestException('寝室不存在或者已删除');
    }
    return await this.dormitoryRepo.delete(id);
  }

  // 创建成员信息
  async createMember(createMemberDto: CreateMemberDto) {
    // 寝室表查询是否存在
    const isExist = await this.dormitoryRepo.findOne({
      where: { dormitoryId: createMemberDto.dormitoryId },
    });
    if (!isExist) {
      throw new BadRequestException('寝室不存在');
    }
    // console.log('isExist', isExist);

    // 创建 ClassPhotos 实例
    const classPhotos = new ClassPhotos();
    classPhotos.name = createMemberDto.name || '';
    classPhotos.imageUrl = createMemberDto.imageUrl;
    const dormitoryId = createMemberDto.dormitoryId; // 假设宿舍的 dormitoryId 为 1
    const dormitory = await this.dormitoryRepo.findOne({ where: { dormitoryId } });
    // 设置 ClassPhotos 实例的 dormitory 属性
    classPhotos.dormitory = dormitory;

    // 保存 ClassPhotos 实例到数据库中
    return await this.classRepo.save(classPhotos);
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
    const isExist = await this.classRepo.exist({ where: { id } });
    if (!isExist) {
      throw new BadRequestException('成员不存在或者已删除');
    }
    return await this.classRepo.delete(id);
  }

  // 获取所有寝室ID
  async getAllRomIDs() {
    const res = await this.dormitoryRepo.find({ select: ['id', 'dormitoryId', 'title', 'desc'] });
    return res;
  }
  // 分页查询带参数
  async findRoomInfoPagination(query: QueryClassDto) {
    const pageSize = query.pageSize || 10;
    const pageNo = query.pageNo || 1;
    const [data, total] = await this.dormitoryRepo.findAndCount({
      where: {
        title: Like(`%${query.title || ''}%`),
        dormitoryId: query.dormitoryId,
      },
      relations: { members: true },
      order: {
        id: 'ASC',
      },
      take: pageSize,
      skip: (pageNo - 1) * pageSize,
    });
    const pageData = data.map((item) => {
      const permissionIds = item.members.map((p) => p.id);
      item.swiper_list = item.swiper_list.split('\\n');
      item.photo_nums = item.members.length;
      delete item.members;
      return { ...item, permissionIds };
    });
    return { pageData, total };
  }
  // 分页查询带参数（成员信息）
  async findMemberInfoPagination(query: QueryClassDto) {
    const pageSize = query.pageSize || 10;
    const pageNo = query.pageNo || 1;
    const [data, total] = await this.classRepo.findAndCount({
      where: {
        name: Like(`%${query.name || ''}%`),
        dormitory: {
          dormitoryId: query.dormitoryId,
        },
      },
      relations: ['dormitory'],
      order: {
        id: 'ASC',
      },
      take: pageSize,
      skip: (pageNo - 1) * pageSize,
    });
    const pageData = data.map((item) => {
      const dormitoryId = item.dormitory.dormitoryId;
      // item.swiper_list = item.swiper_list.split('\\n');
      delete item.dormitory;
      return { ...item, dormitoryId };
    });
    return { pageData, total };
  }
}
