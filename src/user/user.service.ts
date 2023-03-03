import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const getUser = await this.findByEmail(createUserDto.email);

    if (getUser)
      throw new HttpException('User Existed..!', HttpStatus.CONFLICT);

    const userData = this.usersRepository.create(createUserDto);

    const createUser = await this.usersRepository.save(userData);

    delete createUser.password;
    return createUser;
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email: email } });
  }

  async getUserById(id: number): Promise<User> {
    const user: User = await this.usersRepository.findOne({ where: { id } });
    if (!user)
      throw new HttpException('User Not Found..!', HttpStatus.NOT_FOUND);
    delete user.password;
    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
