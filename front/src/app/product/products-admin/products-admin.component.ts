import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import data from '../../../assets/products.json';
import { Product } from '../../product';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss'],
  styles: [ 
   
  ], 
})
export class ProductsAdminComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/api/products';
  products: Product[] = data.data;
  selectedProducts: Product[] = [];
  clonedProducts: { [s: string]: Product } = {};
  @ViewChild('dt') dt: Table;
  constructor(private http: HttpClient) { }
  cols: any[] = []; 
  editingRowIndex: number = -1;

  ngOnInit(): void {
    this.cols = [ 
      { field: "code", header: "Code" }, 
      { field: "name", header: "Name" }, ];
  }

  onInput(event: any, field: string, mode: string) {
    this.dt.filter(event.target.value, field, mode);
  }


  //Edit buttons
  isRowEditing(index: number)
  {
    return this.editingRowIndex === index;
  }
  onRowEditInit(index: number) { 
    this.clonedProducts[index] ={... this.products[index]} ;
    this.editingRowIndex = index; 
  } 

  onRowEditSave(product: Product, index: number) { 
    this.updateProduct(product.id,product);
    this.editingRowIndex = -1 ;
    delete this.clonedProducts[index]; 
  } 

  onRowEditCancel(index: number) { 
      this.products[ index] = {...this.clonedProducts[index]}; 
      this.editingRowIndex = -1 ;
  } 

  //----------------- Checkboxes functions
  onHeaderCheckboxToggle(event) {
    if (event.checked) {
      this.selectedProducts = this.products;
    }
  }

  onRowSelect(event) {
    this.selectedProducts.push(event.data);
  }

  onRowUnselect(event) {
      delete this.selectedProducts[event.data];
  }

  //--------------------------- send to back
  getProducts() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addProduct(product: any) {
    const lastProduct = this.products[this.products.length -1];
    const newId = lastProduct.id+1;
    const newProduct: Product = {
      id: newId,
      code: '0',
      name: '0',
      description: '0',
      image:'0',
      price: 0,
      category: '0',
      quantity: 0,
      inventoryStatus: '0',
      rating: 0
    };
    this.products.push(newProduct);
    
    return this.http.post<any>(this.apiUrl, newProduct).subscribe();
  }

  updateProduct(id: number, product: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, product).subscribe();
  }

  deleteSingleProduct(productId: number) {
      return this.http.delete<any>(`${this.apiUrl}/${productId}`).subscribe();
        }

  deleteProduct(){
    for (const product_checked of this.selectedProducts) {
      
      this.deleteSingleProduct(product_checked.id);
        }
    }
      
}
