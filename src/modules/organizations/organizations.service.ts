import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Organization,
  OrganizationDocument,
} from './entities/organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { formatResponse } from 'src/common/utils/format-response';
import { Messages } from 'src/common/constants/messages.enum';

import { Role, RoleDocument } from 'src/modules/roles/entities/role.entity';
import { User, UserDocument } from 'src/modules/users/entities/user.entity';
import {
  Permission,
  PermissionDocument,
} from 'src/modules/permissions/entities/permission.entity';
import {
  RolePermission,
  RolePermissionDocument,
} from 'src/modules/role-permissions/entities/role-permission.entity';
import { CreateUserForOrganizationDto } from 'src/modules/users/dto/create-user-for-organization.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OrganizationsService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>,

    @InjectModel(Role.name)
    private roleModel: Model<RoleDocument>,

    @InjectModel(User.name)
    private userModel: Model<UserDocument>,

    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,

    @InjectModel(RolePermission.name)
    private rolePermissionModel: Model<RolePermissionDocument>,
  ) {}

  async createOrganization(
    createOrgDto: CreateOrganizationDto,
    createUserDto: CreateUserForOrganizationDto,
  ) {
    // 1. Create the organization
    const createdOrg = new this.organizationModel(createOrgDto);
    const savedOrg = await createdOrg.save();

    // 2. Create a Role named "owner" linked to the organization
    const ownerRole = new this.roleModel({
      organization: savedOrg._id,
      name: 'owner',
    });
    const savedRole = await ownerRole.save();

    // 3. Create a User linked to the organization and Role
    const newUser = new this.userModel({
      ...createUserDto,
      organization: savedOrg._id,
      role: savedRole._id,
      is_owner: true,
    });
    const savedUser = await newUser.save();

    // 4. Populate organization and role for the returned user
    const populatedUser = await this.userModel
      .findById(savedUser._id) // ✅ Fix: use _id not email
      .select('+password')
      .populate('organization', 'name subdomain')
      .populate('role', 'name')
      .lean();

    // 5. Assign all permissions to the "owner" role
    const allPermissions = await this.permissionModel.find().exec();
    const rolePermission = new this.rolePermissionModel({
      organization: savedOrg._id,
      role: savedRole._id,
      permissions: allPermissions.map((p) => p._id),
    });
    await rolePermission.save();

    // 6. Generate a JWT token to log in the new user automatically
    const payload = { email: savedUser.email, sub: savedUser._id };
    const access_token = this.jwtService.sign(payload);

    // 7. Return the full response
    return {
      statusCode: HttpStatus.CREATED,
      message:
        'Organization, Owner Role, User, and Permissions created successfully.',
      data: {
        organization: savedOrg,
        role: savedRole,
        user: populatedUser,
        access_token,
      },
    };
  }

  async create(createOrganizationDto: CreateOrganizationDto): Promise<{
    statusCode: number;
    message: string;
    data: OrganizationDocument;
  }> {
    const createdOrganization = new this.organizationModel(
      createOrganizationDto,
    );
    const savedOrganization = await createdOrganization.save();
    return formatResponse(
      HttpStatus.CREATED,
      Messages.ORGANIZATION_CREATED,
      savedOrganization,
    );
  }

  async findAll(): Promise<{
    statusCode: number;
    message: string;
    data: OrganizationDocument[];
  }> {
    const organizations = await this.organizationModel.find().exec();
    return formatResponse(
      HttpStatus.OK,
      Messages.ORGANIZATIONS_RETRIEVED,
      organizations,
    );
  }

  async findOne(id: string): Promise<{
    statusCode: number;
    message: string;
    data: OrganizationDocument;
  }> {
    const organization = await this.organizationModel.findById(id).exec();
    if (!organization) {
      throw new NotFoundException(
        `${Messages.ORGANIZATION_NOT_FOUND} id: ${id}`,
      );
    }
    return formatResponse(
      HttpStatus.OK,
      Messages.ORGANIZATION_RETRIEVED,
      organization,
    );
  }

  async update(
    id: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<{
    statusCode: number;
    message: string;
    data: OrganizationDocument;
  }> {
    const updatedOrganization = await this.organizationModel
      .findByIdAndUpdate(id, updateOrganizationDto, { new: true })
      .exec();
    if (!updatedOrganization) {
      throw new NotFoundException(
        `${Messages.ORGANIZATION_NOT_FOUND} id: ${id}`,
      );
    }
    return formatResponse(
      HttpStatus.OK,
      Messages.ORGANIZATION_UPDATED,
      updatedOrganization,
    );
  }

  async remove(id: string): Promise<{ statusCode: number; message: string }> {
    const deletedOrganization = await this.organizationModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedOrganization) {
      throw new NotFoundException(
        `${Messages.ORGANIZATION_NOT_FOUND} id: ${id}`,
      );
    }
    return formatResponse(
      HttpStatus.OK,
      Messages.ORGANIZATION_DELETED,
      deletedOrganization,
    );
  }
}
