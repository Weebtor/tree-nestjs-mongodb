import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Node {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Node', default: null })
  parent: Types.ObjectId;
}

export type NodeDocument = Node & Document;
export const NodeSchema = SchemaFactory.createForClass(Node);
