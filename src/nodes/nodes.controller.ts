import {
  Controller,
  Post,
  Put,
  Res,
  HttpStatus,
  Body,
  Delete,
  Get,
  Param,
} from '@nestjs/common';
import { GetNodeParamsDTO } from './dto/getNode.dto';
import { CreateNodeDTO } from './dto/createNode.dto';
import { DeleteNodeParamsDTO } from './dto/deleteNode.dto';
import { NodesService } from './nodes.service';
import { UpdateBodyDTO, UpdateParamsDTO } from './dto/updateNode.dto';
import { GetRootNodeDTO } from './dto/getRootNode.dto';
import { NodeDocument } from './schemas/node.schema';
import { Types } from 'mongoose';

@Controller('nodes')
export class NodesController {
  constructor(private nodesService: NodesService) {}

  @Post()
  async createNode(@Body() input: CreateNodeDTO): Promise<NodeDocument> {
    const newNode = await this.nodesService.createNode(input);
    return newNode;
  }

  @Put(':id')
  async updateNode(
    @Param() params: UpdateParamsDTO,
    @Body() body: UpdateBodyDTO,
  ): Promise<NodeDocument> {
    const updatedNode = await this.nodesService.updateNode(params.id, body);
    return updatedNode;
  }

  @Delete(':id')
  async deleteNode(
    @Param() params: DeleteNodeParamsDTO,
  ): Promise<Types.ObjectId[]> {
    const deletesNodes = await this.nodesService.deleteNodeTree(params.id);
    return deletesNodes;
  }

  @Get('root/:id')
  async getRootNode(@Param() params: GetRootNodeDTO): Promise<NodeDocument> {
    const result = await this.nodesService.getRootNodeById(params.id);
    return result;
  }

  @Get(':id')
  getNode(@Param() params: GetNodeParamsDTO) {
    return this.nodesService.findById(params.id);
  }
}
