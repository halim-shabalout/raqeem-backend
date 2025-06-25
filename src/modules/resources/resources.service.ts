import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resource, ResourceDocument } from './entities/resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { formatResponse } from 'src/common/utils/format-response';
import { Messages } from 'src/common/constants/messages.enum';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectModel(Resource.name)
    private resourceModel: Model<ResourceDocument>,
  ) {}

  async create(createResourceDto: CreateResourceDto): Promise<{
    statusCode: number;
    message: string;
    data: ResourceDocument;
  }> {
    const createdResource = new this.resourceModel(createResourceDto);
    const savedResource = await createdResource.save();
    return formatResponse(
      HttpStatus.CREATED,
      Messages.RESOURCE_CREATED,
      savedResource,
    );
  }

  async findAll(): Promise<{
    statusCode: number;
    message: string;
    data: ResourceDocument[];
  }> {
    const resources = await this.resourceModel.find().exec();
    return formatResponse(
      HttpStatus.OK,
      Messages.RESOURCES_RETRIEVED,
      resources,
    );
  }

  async findOne(id: string): Promise<{
    statusCode: number;
    message: string;
    data: ResourceDocument;
  }> {
    const resource = await this.resourceModel.findById(id).exec();
    if (!resource)
      throw new NotFoundException(`${Messages.RESOURCE_NOT_FOUND} id: ${id}`);
    return formatResponse(HttpStatus.OK, Messages.RESOURCE_RETRIEVED, resource);
  }

  async update(
    id: string,
    updateResourceDto: UpdateResourceDto,
  ): Promise<{
    statusCode: number;
    message: string;
    data: ResourceDocument;
  }> {
    const updatedResource = await this.resourceModel
      .findByIdAndUpdate(id, updateResourceDto, { new: true })
      .exec();
    if (!updatedResource)
      throw new NotFoundException(`${Messages.RESOURCE_NOT_FOUND} id: ${id}`);
    return formatResponse(
      HttpStatus.OK,
      Messages.RESOURCE_UPDATED,
      updatedResource,
    );
  }

  async remove(id: string): Promise<{ statusCode: number; message: string }> {
    const deletedResource = await this.resourceModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedResource)
      throw new NotFoundException(`${Messages.RESOURCE_NOT_FOUND} id: ${id}`);
    return formatResponse(HttpStatus.OK, Messages.RESOURCE_DELETED, null);
  }
}
