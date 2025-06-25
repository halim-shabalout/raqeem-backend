import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { handleMongooseError } from 'src/common/utils/handle-mongoose-error';
import { formatResponse } from 'src/common/utils/format-response';
import { Messages } from 'src/common/constants/messages.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { MethodsService } from '../methods/methods.service';
import { ResourcesService } from '../resources/resources.service';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private PermissionModel: Model<PermissionDocument>,

    private methodsService: MethodsService,
    private resourcesService: ResourcesService,
  ) {}

  async syncPermissions(): Promise<{
    statusCode: number;
    message: string;
  }> {
    try {
      const { data: methods } = await this.methodsService.findAll();
      const { data: resources } = await this.resourcesService.findAll();

      let createdCount = 0;

      for (const method of methods) {
        for (const resource of resources) {
          const key = `${method.key}_${resource.key}`.toLowerCase();
          const label = `${method.label} ${resource.label}`;

          const exists = await this.PermissionModel.findOne({ key });
          if (!exists) {
            const permission = new this.PermissionModel({
              key,
              label,
              method: [method._id],
              resource: [resource._id],
            });
            await permission.save();
            createdCount++;
          }
        }
      }

      return {
        statusCode: HttpStatus.CREATED,
        message: `${createdCount} new permissions created.`,
      };
    } catch (error) {
      return handleMongooseError(error);
    }
  }

  async create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<
    | { statusCode: number; message: string; data: PermissionDocument }
    | { statusCode: number; message: string }
  > {
    try {
      const createdPermission = new this.PermissionModel(createPermissionDto);
      const savedPermission = await createdPermission.save();

      return formatResponse(
        HttpStatus.CREATED,
        Messages.PERMISSION_CREATED,
        savedPermission,
      );
    } catch (error) {
      return handleMongooseError(error);
    }
  }

  async findAll(): Promise<{
    statusCode: number;
    message: string;
    data: PermissionDocument[];
  }> {
    const permissions =
      (await this.PermissionModel.find()
        .populate('method')
        .populate('resource')
        .exec()) ?? [];
    return formatResponse(
      HttpStatus.OK,
      Messages.PERMISSIONS_RETRIEVED,
      permissions,
    );
  }

  async findOne(id: string): Promise<{
    statusCode: number;
    message: string;
    data: PermissionDocument;
  }> {
    const permission = await this.PermissionModel.findById(id).exec();
    if (!permission) {
      throw new NotFoundException(`${Messages.PERMISSION_NOT_FOUND} id: ${id}`);
    }
    return formatResponse(
      HttpStatus.OK,
      Messages.PERMISSION_RETRIEVED,
      permission,
    );
  }

  async update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<{
    statusCode: number;
    message: string;
    data: PermissionDocument;
  }> {
    const updatedPermission = await this.PermissionModel.findByIdAndUpdate(
      id,
      updatePermissionDto,
      { new: true },
    ).exec();

    if (!updatedPermission) {
      throw new NotFoundException(`${Messages.PERMISSION_NOT_FOUND} id: ${id}`);
    }

    return formatResponse(
      HttpStatus.OK,
      Messages.PERMISSION_UPDATED,
      updatedPermission,
    );
  }

  async remove(id: string): Promise<{ statusCode: number; message: string }> {
    const deletedPermission =
      await this.PermissionModel.findByIdAndDelete(id).exec();

    if (!deletedPermission) {
      throw new NotFoundException(`${Messages.PERMISSION_NOT_FOUND} id: ${id}`);
    }

    return formatResponse(
      HttpStatus.OK,
      Messages.PERMISSION_DELETED,
      deletedPermission,
    );
  }
}
