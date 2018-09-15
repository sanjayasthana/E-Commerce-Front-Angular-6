import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductdataService {
  private apiurl:string;
  constructor(private http: HttpClient) {
    this.apiurl='http://localhost:62953/api/product/';
   }
    GetProduct(id:string) {
    return this.http.get(this.apiurl+'GetProduct?Id='+ id );
    }
    GetProductList(ProductName:string,CategoryId:number[]) {
      var url = this.apiurl+'GetProductList';
      if(ProductName!='')
        url +='?name='+ ProductName;

      return this.http.post(url,CategoryId);
    }

    GetCategoryList(){
      return this.http.get(this.apiurl+'GetCategoryList');
    }
    GetProductAttributeList(ProductId){
      return this.http.get(this.apiurl+'GetCategoryList?ProductId=' + ProductId);
    }
    GetProductAttributeLookupList(CategoryId){
      return this.http.get(this.apiurl+'GetroductAttributeLookupList?CategoryId=' + CategoryId);
    }

    SaveProduct(product){
      return this.http.post(this.apiurl+'Save',product);
    }
}
