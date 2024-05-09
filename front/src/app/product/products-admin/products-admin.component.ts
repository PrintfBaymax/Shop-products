import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import data from '../../../assets/products.json';
import { Product } from '../../product';
import { Table } from 'primeng/table';
import {SelectItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api'; 
import { MessageService } from 'primeng/api'; 

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss'],
  styles: [ 
    ` 
  :host ::ng-deep .p-cell-editing { 
    padding-top: 0 !important; 
    padding-bottom: 0 !important; 
  } 
  `, 
  ], 
})
export class ProductsAdminComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/api/products';
  products: Product[] = data.data;
  selectedProducts: Product[] = [];
  sortOptions: SelectItem[];
  clonedProducts: { [s: string]: Product } = {};
  @ViewChild('dt') dt: Table;
  constructor(private http: HttpClient) { }
  cols: any[] = []; 
  editingRowIndex: number = -1;

  ngOnInit(): void {
    this.cols = [ 
      { field: "code", header: "Code" }, 
      { field: "name", header: "Name" }, ];
      this.sortOptions = [
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'}
    ];
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
    console.log("onroweditinit")
  } 

  onRowEditSave(product: Product, index: number) { 
    this.updateProduct(product.id,product);
    this.editingRowIndex = -1 ;
    delete this.clonedProducts[index]; 
    console.log("onroweditSAave")
  } 

  onRowEditCancel(index: number) { 
      this.products[ index] = {...this.clonedProducts[index]}; 
      this.editingRowIndex = -1 ;
      console.log("onroweditcancel");
  } 

  //----------------- Checkboxes functions
  onHeaderCheckboxToggle(event) {
    console.log("HEADER CHECKBOX")
    if (event.checked) {
      this.selectedProducts = this.products;
    }
  }

  onRowSelect(event) {
    // Logique à exécuter lorsque la ligne est sélectionnée
    console.log('Row selected:', event.data);
    this.selectedProducts.push(event.data);
  }

  onRowUnselect(event) {
      // Logique à exécuter lorsque la ligne est désélectionnée
      console.log('Row unselected:', event.data);
      delete this.selectedProducts[event.data];
  }

  //--------------------------- send to back
  getProducts() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addProduct(product: any) {
    console.log("ADD PRODUCT")
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
    console.log("UPDATE PRODUCT")
    return this.http.put<any>(`${this.apiUrl}/${id}`, product).subscribe();
  }

  deleteSingleProduct(productId: number) {
    console.log("DELETE PRODUCT")
    console.log(productId)
      return this.http.delete<any>(`${this.apiUrl}/${productId}`).subscribe();
        }

  deleteProduct(){
    for (const product_checked of this.selectedProducts) {
      console.log(`${this.apiUrl}/${product_checked.id}`)
      this.deleteSingleProduct(product_checked.id);
        }
    }
      
}
