import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Method, MethodDocument } from './entities/method.entity';
import { CreateMethodDto } from './dto/create-method.dto';
import { UpdateMethodDto } from './dto/update-method.dto';
import { formatResponse } from 'src/common/utils/format-response';
import { Messages } from 'src/common/constants/messages.enum';

@Injectable()
export class MethodsService {
  constructor(
    @InjectModel(Method.name)
    private methodModel: Model<MethodDocument>,
  ) {}

  async create(createMethodDto: CreateMethodDto): Promise<{
    statusCode: number;
    message: string;
    data: MethodDocument;
  }> {
    const createdMethod = new this.methodModel(createMethodDto);
    const savedMethod = await createdMethod.save();
    return formatResponse(
      HttpStatus.CREATED,
      Messages.METHOD_CREATED,
      savedMethod,
    );
  }

  async findAll(): Promise<{
    statusCode: number;
    message: string;
    data: MethodDocument[];
  }> {
    const methods = await this.methodModel.find().exec();
    return formatResponse(HttpStatus.OK, Messages.METHODS_RETRIEVED, methods);
  }

  async findOne(id: string): Promise<{
    statusCode: number;
    message: string;
    data: MethodDocument;
  }> {
    const method = await this.methodModel.findById(id).exec();
    if (!method)
      throw new NotFoundException(`${Messages.METHOD_NOT_FOUND} id: ${id}`);
    return formatResponse(HttpStatus.OK, Messages.METHOD_RETRIEVED, method);
  }

  async update(
    id: string,
    updateMethodDto: UpdateMethodDto,
  ): Promise<{
    statusCode: number;
    message: string;
    data: MethodDocument;
  }> {
    const updatedMethod = await this.methodModel
      .findByIdAndUpdate(id, updateMethodDto, { new: true })
      .exec();
    if (!updatedMethod)
      throw new NotFoundException(`${Messages.METHOD_NOT_FOUND} id: ${id}`);
    return formatResponse(
      HttpStatus.OK,
      Messages.METHOD_UPDATED,
      updatedMethod,
    );
  }

  async remove(id: string): Promise<{ statusCode: number; message: string }> {
    const deletedMethod = await this.methodModel.findByIdAndDelete(id).exec();
    if (!deletedMethod)
      throw new NotFoundException(`${Messages.METHOD_NOT_FOUND} id: ${id}`);
    return formatResponse(HttpStatus.OK, Messages.METHOD_DELETED, null);
  }
}
