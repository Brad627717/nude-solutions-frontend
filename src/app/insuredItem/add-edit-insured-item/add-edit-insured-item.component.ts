import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { InsuredItemApiService } from 'src/app/insured-item-api.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-add-edit-insured-item',
  templateUrl: './add-edit-insured-item.component.html',
  styleUrls: ['./add-edit-insured-item.component.css']
})
export class AddEditInsuredItemComponent implements OnChanges {

  constructor(private service: InsuredItemApiService) {}

  @Input() selectedItem: any;
  @Input() categories: Category[];
  @Input() categoriesMap: Map<number, string>;
  @Input() modalTitle: string = '';
  @Input() actionName: string = '';
  @Output() changed = new EventEmitter<boolean>()

  insuredItemId: any = null;
  insuredItemName: any = null;
  insuredItemValue: any = null;
  insuredItemCategoryId: any = null;

  myModal:any

  ngOnChanges(changes: SimpleChanges): void {
    this.loadCategories();
      this.insuredItemId = this.selectedItem?.id;
      this.insuredItemName = this.selectedItem?.itemName;
      this.insuredItemValue = this.selectedItem?.value;
      this.insuredItemCategoryId = this.selectedItem?.categoryId;
  }

  loadCategories() {
    this.service.getCategories().subscribe((data: Category[]) => {
      this.categories = data;

      for(let i = 0; i < data.length; i++) {
        this.categoriesMap.set(this.categories[i].id, this.categories[i].categoryName);
      }
    })
  }

  saveInsuredItem() {
    let insuredItem = {
      id: this.insuredItemId, 
      itemName: this.insuredItemName, 
      value: this.insuredItemValue, 
      categoryId: this.insuredItemCategoryId
    }

    if (this.actionName == "Add") {
      this.service.addInsuredItem(insuredItem).subscribe(result => {
        this.createSuccessAlert()
        this.emitChangedEvent()
      }, (error) => {
        this.createErrorAlert()
      })
    } else if (this.actionName == "Edit") {
      this.service.updateInsuredItem(insuredItem.id, insuredItem).subscribe(result => {
        this.createSuccessAlert()
        this.emitChangedEvent()
      }, (error) => {
        this.createErrorAlert()
      })
    } else if (this.actionName == "Delete") {
      this.service.removeInsuredItem(insuredItem.id).subscribe(result => {
        this.createSuccessAlert()
        this.emitChangedEvent()
      }, (error) => {
        this.createErrorAlert()
      })
    }
    this.closeModal()
  }

  createSuccessAlert() {
    var alert = '<div class="alert alert-success d-flex align-items-center alert-dismissible fade show" role="alert">' 
      + '<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>' 
      + '<div>Your change was a success</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button</div>'

      var alertsAreaDiv = document.getElementById("alerts-area")
      alertsAreaDiv!.innerHTML = alert
  }

  createErrorAlert() {
    var alert = '<div class="alert alert-danger d-flex align-items-center alert-dismissible fade show" role="alert">' 
      + '<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/>' 
      + '</svg><div>An unexpected error occurred</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

      var alertsAreaDiv = document.getElementById("alerts-area")
      alertsAreaDiv!.innerHTML = alert
  }

  emitChangedEvent() {
    this.changed.emit(true)
  }

  closeModal() {
    var closeModalBtn = document.getElementById('btn-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }
  }
}
