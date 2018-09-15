export class productModel{
  Name: string = '';
  Description: string = '';
  CategoryId:number  =0;
  ProductId: number  =0;
  ProductAttributes:ProductAttribute[]
}
export class ProductAttribute{
  AttributeName: string = '';
  AttributeValue: string = '';
  AttributeId: number  =0;
}
