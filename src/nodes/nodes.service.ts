import { Model, Types } from 'mongoose';
import { Node, NodeDocument } from './schemas/node.schema';
import { CreateNodeDTO } from './dto/createNode.dto';
import { UpdateBodyDTO } from './dto/updateNode.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NodesService {
  constructor(@InjectModel(Node.name) private nodeModel: Model<NodeDocument>) {}
  async findById(id: string): Promise<NodeDocument> {
    const node = await this.nodeModel.findById(id);
    if (!node) {
      throw new NotFoundException(`Nodo id ${id} no encontrado`);
    }
    return node;
  }
  async createNode(input: CreateNodeDTO): Promise<NodeDocument> {
    const newNode = new this.nodeModel({ name: input.name });
    if (input.parentId) {
      const { parentId } = input;
      const parent = await this.findById(parentId);
      if (!parent)
        throw new NotFoundException(`Node with id ${parentId} not found`);
      newNode.parent = parent._id;
    }
    newNode.save();
    return newNode;
  }
  async updateNode(id: string, fields: UpdateBodyDTO): Promise<NodeDocument> {
    const fieldToUpdate: Partial<Node> = { ...fields };
    if (fields.parentId) {
      const parentNode = await this.findById(fields.parentId);
      fieldToUpdate.parent = parentNode._id;
    } else if (fields.parentId === null) {
      fieldToUpdate.parent = null;
    }
    const updatedNode = await this.nodeModel.findByIdAndUpdate(
      id,
      { $set: fieldToUpdate },
      { new: true, runValidators: true },
    );
    return updatedNode;
  }
  async deleteNodeTree(id: string): Promise<Types.ObjectId[]> {
    const targetNode = await this.findById(id);
    const targetNodeTreeNodes = await this.getChildNodesRecursive(targetNode);
    targetNodeTreeNodes.push(targetNode);
    const nodeIdArray = targetNodeTreeNodes.map((node) => node._id);
    await this.nodeModel.deleteMany({ _id: { $in: nodeIdArray } });
    return nodeIdArray;
  }
  async getChildNodes(node: NodeDocument): Promise<NodeDocument[]> {
    try {
      const result = await this.nodeModel.find({
        parent: node._id,
      });

      return result;
    } catch (error) {
      throw new Error('Error to get children');
    }
  }

  async getChildNodesRecursive(node: NodeDocument): Promise<NodeDocument[]> {
    const result: NodeDocument[] = [];
    const childNodes = await this.getChildNodes(node);
    for (const child of childNodes) {
      const nodeTree = await this.getChildNodesRecursive(child);
      result.push(child, ...nodeTree);
    }
    return result;
  }
  async getParentNode(node: NodeDocument): Promise<NodeDocument | null> {
    try {
      const result = await this.nodeModel.findById(node.parent);
      return result;
    } catch (error) {
      throw new Error('Error to get parent');
    }
  }
  async getRootNodeById(id: string) {
    const initialNode = await this.findById(id);
    if (initialNode.parent === null) return initialNode;

    let result = await this.getParentNode(initialNode);
    while (result.parent) {
      result = await this.getParentNode(result);
    }
    return result;
  }
}
