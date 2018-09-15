import { Component, OnInit } from '@angular/core';
import { ProductdataService } from '../productdata.service';
import { ActivatedRoute } from '@angular/router';
import { productModel, ProductAttribute } from '../app-model/product.model'

import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id: string;
  private sub: any;
  product: productModel;
  categoryList$: Object;
  registerForm: FormGroup;
  ProductAttributes: FormArray;
  submitted = false;
  CategoryId:number;

  constructor(private formBuilder: FormBuilder, private data: ProductdataService, private route: ActivatedRoute) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.product = new productModel();
      // In a real app: dispatch action to load the details here.
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      ProductId:0,
      Name: ['', Validators.required],
      Description: ['', Validators.required],
      CategoryId: ['', [Validators.required]],
      ProductAttributes: this.formBuilder.array([])
    });

    this.data.GetProduct(this.id).subscribe(
      (data: productModel) => {
        this.product = data,
          this.registerForm.patchValue({
            ProductId:data.ProductId,
            Name: data.Name,
            Description: data.Description,
            CategoryId: data.CategoryId
          })
        this.GetProductAttributeLookupList(data.CategoryId);
      });

    this.data.GetCategoryList().subscribe(
      data => this.categoryList$ = data
    );

  }
  AddControl(items: ProductAttribute[]) {
    this.ProductAttributes = this.registerForm.get('ProductAttributes') as FormArray;
    while(this.ProductAttributes.length !== 0){
      this.ProductAttributes.removeAt(0)
    }
    items.forEach(element => {
      this.ProductAttributes.push(this.formBuilder.group({
        AttributeId: [element.AttributeId],
        AttributeName: [element.AttributeName],
        AttributeValue: [element.AttributeValue, [Validators.required]]
      }));
    });
  }
  GetProductAttributeLookupList(CategoryId: number) {
    this.data.GetProductAttributeLookupList(CategoryId).subscribe((data: ProductAttribute[]) => {
      data.forEach(element => {
        var att = this.product.ProductAttributes.find(x => x.AttributeId == element.AttributeId)
        if (att != null) {
          att.AttributeName = element.AttributeName;
        } else {
          this.product.ProductAttributes.push(element);
        }
      });

      this.AddControl(this.product.ProductAttributes)
    });
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      debugger;
      return;
    }
    this.data.SaveProduct(this.registerForm.value).subscribe(data => {
      alert('Save Successfully!')
    });
    
  }
  onChange($event){
    this.product.ProductAttributes=[];
    this.GetProductAttributeLookupList(this.CategoryId)
  }

}
