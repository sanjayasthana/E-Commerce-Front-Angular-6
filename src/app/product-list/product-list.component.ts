import { Component, OnInit } from '@angular/core';
import { ProductdataService } from '../productdata.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList$: Object;
  categoryList$: Object;
  ProductName:string;
  Category:number[];
  constructor(private data: ProductdataService) { }

  ngOnInit() {
    this.LoadProductList();

    this.data.GetCategoryList().subscribe(
      data => this.categoryList$ = data 
    );
  }
  LoadProductList(){
    this.Category=[];
    this.ProductName = (document.getElementById("txtSearch") as HTMLInputElement).value;
    var checks=   document.getElementsByClassName("icheck") as HTMLCollectionOf<Element>;
    for (var index = 0; index < checks.length; index++) {
      var element = checks[index];
      if(element.checked==true){
        this.Category.push(element.value);
      }
    }
    if(this.Category.length ==0)
      this.Category=null;
    this.data.GetProductList(this.ProductName,this.Category).subscribe(
      data => this.productList$ = data 
    );
  }
}
