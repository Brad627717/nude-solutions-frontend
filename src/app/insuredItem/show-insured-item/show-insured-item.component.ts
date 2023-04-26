import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { InsuredItem } from 'src/app/models/insured-item';
import { InsuredItemApiService } from 'src/app/insured-item-api.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-show-insured-item',
  templateUrl: './show-insured-item.component.html',
  styleUrls: ['./show-insured-item.component.css']
})
export class ShowInsuredItemComponent {

  insuredItems$!: Observable<InsuredItem[]>;
  insuredItems!: any[];
  categories$!: Observable<Category[]>;
  categories: any=[];

  categoriesMap: Map<number, string> = new Map();
  categoryTotalValueMap: any[] = [];

  totalInsuredItemsValue!: number;

  modalTitle:string = '';
  actionName: string = '';
  insuredItem: any;

  selectedItem: InsuredItem | null;
  insuredItemId: number = 0;
  insuredItemName: string = "";
  insuredItemValue: number = 0;
  insuredItemCategoryId: number = 0;

  categoryName: string;

  constructor(private service: InsuredItemApiService) {}

  ngOnInit(): void {
    this.loadInsuredItems();
    this.loadCategories();
    this.calculateCategoryTotals();
  }

  loadInsuredItems() {
    this.service.getInsuredItems().subscribe((data: InsuredItem[]) => {
      this.insuredItems = data;
    })
  }

  loadCategories() {
    this.service.getCategories().subscribe((data: Category[]) => {
      this.categories = data;

      for(let i = 0; i < data.length; i++) {
        this.categoriesMap.set(this.categories[i].id, this.categories[i].categoryName);
      }
    })
  }

  calculateCategoryTotals() {
    this.categoryTotalValueMap = []
    this.service.getCategories().subscribe((data: Category[]) => {
      this.categories = data;

      this.categories.forEach((category: Category) => {
        this.categoryTotalValueMap.push({"categoryId": category.id, "value": 0})
      });

      this.service.getInsuredItems().subscribe((data: InsuredItem[]) => {
        this.insuredItems = data;
  
        this.totalInsuredItemsValue = this.insuredItems.map(insuredItem => insuredItem.value).reduce(function(a, b)
        {
          return a + b;
        });
        this.totalInsuredItemsValue = Math.round((this.totalInsuredItemsValue + Number.EPSILON) * 100) / 100
  
        var result: any[] = []
        this.insuredItems.reduce((res, insuredItem) => {
          if (!res[insuredItem.categoryId]) {
            res[insuredItem.categoryId] = { categoryId: insuredItem.categoryId, value: 0 };
            result.push(res[insuredItem.categoryId])
          }
          res[insuredItem.categoryId].value += insuredItem.value;
          return res;
        }, {});

        this.categoryTotalValueMap = this.categoryTotalValueMap.map(item => {
          let exist = result.filter(c=>c.categoryId == item.categoryId)[0];
          if (exist != undefined) {
              item.value = exist.value;
              return item;
          } else {
              return item;
          }
       });
      })
    })
  }

  openModal(selectedItem: InsuredItem | null, action: string) {
    this.selectedItem = selectedItem;
    if (selectedItem == null && action == "Add") {
      this.modalTitle = "Add Insured Item"
    } else if (selectedItem != null && action == "Edit") {
      this.modalTitle = "Edit Insured Item"
    } else if (selectedItem != null && action == "Delete") {
      this.modalTitle = "Confirm Deleting Item"
    }

    this.actionName = action;
  }
  
  addNewCategory() {
    let category = new Category(this.categoryName)
    this.service.addCategory(category).subscribe(res => {
      this.loadCategories()
      this.calculateCategoryTotals()
      this.categoryName = ""
    })
  }

  refreshData(changed: boolean) {
    if (changed) {
      this.loadInsuredItems();
      this.loadCategories();
      this.calculateCategoryTotals();
    }
  }
}
