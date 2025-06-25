import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { formatResponse } from 'src/common/utils/format-response';
import { Messages } from 'src/common/constants/messages.enum';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private roleModel: Model<RoleDocument>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<{
    statusCode: number;
    message: string;
    data: RoleDocument;
  }> {
    const createdRole = new this.roleModel(createRoleDto);
    const savedRole = await createdRole.save();
    return formatResponse(HttpStatus.CREATED, Messages.ROLE_CREATED, savedRole);
  }

  async findAll(): Promise<{
    statusCode: number;
    message: string;
    data: RoleDocument[];
  }> {
    const roles = await this.roleModel.find().exec();
    return formatResponse(HttpStatus.OK, Messages.ROLES_RETRIEVED, roles);
  }

  async findOne(id: string): Promise<{
    statusCode: number;
    message: string;
    data: RoleDocument;
  }> {
    const role = await this.roleModel.findById(id).exec();
    if (!role)
      throw new NotFoundException(`${Messages.ROLE_NOT_FOUND} id: ${id}`);
    return formatResponse(HttpStatus.OK, Messages.ROLE_RETRIEVED, role);
  }

  async update(
    id: string,
    updateRoleDto: UpdateRoleDto,
  ): Promise<{
    statusCode: number;
    message: string;
    data: RoleDocument;
  }> {
    const updatedRole = await this.roleModel
      .findByIdAndUpdate(id, updateRoleDto, { new: true })
      .exec();
    if (!updatedRole)
      throw new NotFoundException(`${Messages.ROLE_NOT_FOUND} id: ${id}`);
    return formatResponse(HttpStatus.OK, Messages.ROLE_UPDATED, updatedRole);
  }

  async remove(id: string): Promise<{ statusCode: number; message: string }> {
    const deletedRole = await this.roleModel.findByIdAndDelete(id).exec();
    if (!deletedRole)
      throw new NotFoundException(`${Messages.ROLE_NOT_FOUND} id: ${id}`);
    return formatResponse(HttpStatus.OK, Messages.ROLE_DELETED, null);
  }
}
