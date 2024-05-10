import { Component, OnInit, ViewChild  } from '@angular/core';
import { Product } from '../../product';
import { SelectItem } from "primeng/api"; 
import { PrimeNGConfig } from "primeng/api"; 
import data from '../../../assets/products.json';
import { DataView } from 'primeng/dataview';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = data.data;
  filteredProducts : Product[] = [];
  sortOptions: SelectItem[];
  sortOrder: number;
  @ViewChild('dv') dv: DataView;
  sortField: string;
  sortKey: string ;
  constructor(private primengConfig: PrimeNGConfig) { }   

  ngOnInit(): void {
    this.sortOptions = [
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'}
    ];

    this.primengConfig.ripple = true;
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }
  onInput(event: any, filterMatchMode:string = "contains" ) {
    this.dv.filter( event.target.value, filterMatchMode );
  }
}
