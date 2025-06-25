import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RolePermission,
  RolePermissionDocument,
} from './entities/role-permission.entity';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { formatResponse } from 'src/common/utils/format-response';
import { Messages } from 'src/common/constants/messages.enum';

@Injectable()
export class RolePermissionsService {
  constructor(
    @InjectModel(RolePermission.name)
    private rolePermissionModel: Model<RolePermissionDocument>,
  ) {}

  async create(dto: CreateRolePermissionDto) {
    const created = new this.rolePermissionModel(dto);
    const saved = await created.save();
    return formatResponse(
      HttpStatus.CREATED,
      Messages.ROLE_PERMISSION_CREATED,
      saved,
    );
  }

  async findAll() {
    const list = await this.rolePermissionModel
      .find()
      .populate('organization role permission')
      .exec();

    return formatResponse(
      HttpStatus.OK,
      Messages.ROLE_PERMISSIONS_RETRIEVED,
      list,
    );
  }

  async findOne(id: string) {
    const item = await this.rolePermissionModel
      .findById(id)
      .populate('organization role permission')
      .exec();

    if (!item) {
      throw new NotFoundException(
        Messages.ROLE_PERMISSION_NOT_FOUND + ` id: ${id}`,
      );
    }

    return formatResponse(
      HttpStatus.OK,
      Messages.ROLE_PERMISSION_RETRIEVED,
      item,
    );
  }

  async update(id: string, dto: UpdateRolePermissionDto) {
    const updated = await this.rolePermissionModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(
        Messages.ROLE_PERMISSION_NOT_FOUND + ` id: ${id}`,
      );
    }

    return formatResponse(
      HttpStatus.OK,
      Messages.ROLE_PERMISSION_UPDATED,
      updated,
    );
  }

  async remove(id: string) {
    const deleted = await this.rolePermissionModel.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw new NotFoundException(
        Messages.ROLE_PERMISSION_NOT_FOUND + ` id: ${id}`,
      );
    }

    return formatResponse(
      HttpStatus.OK,
      Messages.ROLE_PERMISSION_DELETED,
      null,
    );
  }
}
