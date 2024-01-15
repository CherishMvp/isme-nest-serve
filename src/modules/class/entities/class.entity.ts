import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

// 寝室信息
@Entity()
export class Dormitory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '寝室ID' })
  dormitoryId: number;

  @Column({ comment: '相册的容量（可以保存的数量）' })
  contain_nums: number;

  @Column({ comment: '当前相册的数量' })
  photo_nums: number;

  @Column({ comment: '宿舍名称-导航名称，写宿舍号，如519' })
  title: string;

  @Column()
  desc: string;

  @Column({ type: 'text', nullable: true })
  swiper_list: any;

  @OneToMany(() => ClassPhotos, (classPhotos) => classPhotos.dormitory, { cascade: true })
  members: ClassPhotos[];
}

// 宿舍成员
@Entity()
export class ClassPhotos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Dormitory, (dormitory) => dormitory.members)
  @JoinColumn({ name: 'dormitory_id' })
  dormitory: Dormitory;

  @Column({ name: '寝室ID' })
  dormitoryId: number;

  @Column()
  imageUrl: string;
}
