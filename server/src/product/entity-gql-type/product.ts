import { BeforeInsert, Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { Field, ID, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ProductCategory } from '../../_enums/product-category';
import { nullOrValue } from '../../_utils/null-or-value';
import { MaxLength, MinLength } from 'class-validator';

registerEnumType(ProductCategory, { name: 'ProductCategory' });

/*
-- typeorm
-- @nestjs/graphql
-- class-validator
*/

@Entity('products')
@InputType('ProductInput')
@ObjectType('ProductType')
export class Product {

  // https://github.com/typeorm/typeorm/blob/master/docs/listeners-and-subscribers.md#beforeinsert
  @BeforeInsert()
  beforeInsertActions() {
    // during create/insert, defaults only work on dto if passed,
    // not on defaults as defined if entity
    this.avgReviewScore = this.avgReviewScore === null ? null : this.avgReviewScore;
    this.isDeleted = this.isDeleted === true ? true : false; // false, undefined, or null then, false
    this.deleteReason = nullOrValue(this.deleteReason);
    this.deletedAt = nullOrValue(this.deletedAt);
  }

  @ObjectIdColumn()
  _productId: ObjectID;

  @PrimaryColumn()
  @Field(type => ID)
  productId: string;

  @Column()
  @Field(type => ProductCategory)
  productCategory: ProductCategory;

  @Column()
  @Field({ nullable: true, defaultValue: null }) // TODO: temporary nullable
  sellerId?: string; // TODO: temporary nullable

  @Column()
  @Field()
  @MaxLength(200, { message: `200 characters max length for Product Name.` })
  @MinLength(3, { message: `3 characters minimum length for Product Name.` })
  name: string;

  @Column()
  @Field({ nullable: true, defaultValue: null })
  sku?: string;

  @Column()
  @Field({ nullable: true, defaultValue: null })
  image?: string;

  @Column()
  @Field({ nullable: true, defaultValue: null })
  description?: string;

  @Column()
  @Field({ defaultValue: 0 })
  sellingPrice: number;

  @Column()
  @Field({ nullable: true, defaultValue: null })
  avgReviewScore?: number;   // TODO: auto calculate average rating after new reviews left for this product.

  @Column()
  @Field()
  isDeleted: boolean;

  @Column()
  @Field({ nullable: true, defaultValue: null })
  deleteReason?: string;

  @Column({ type: 'timestamp' })
  @Field({ nullable: true, defaultValue: null })
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;
}