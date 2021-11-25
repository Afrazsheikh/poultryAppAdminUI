import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Router, NavigationExtras } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menus: any;
  restId: any = localStorage.getItem('restId');
  items: any;
  categories: any;
  toppingGroup: any;
  isLoading: boolean = true;
  options: any;
  toppings: any;
  item: any;
  addingCategory: any;
  addingOption: any;
  addingToppingGroup: any;
  addingTopping: any;
  selectedCategory: any;
  selectedOption: any;
  selectedTopping: any;
  selectedToppingGroup: any;
  selectedItem: any;
  addingItem: any;
  editingCategory: any;
  editingOption: any;
  editingTopping: any;
  editingToppingGroup: any;
  isCategoryFetched: boolean;
  category: any;
  catItem: any;



  constructor(private menuService: MenuService,private router: Router)
  {

this.menuService.getItems(this.restId).subscribe((response) => {
  console.log(response);
  if(response.success) {

    this.isLoading = false;
    this.items = response.data;
  }
}, err => {
  console.log(err);
})

  this.addingCategory = new FormGroup({"name": new FormControl(null, [Validators.required]),
                                       "description": new FormControl(null) });

  this.addingOption = new FormGroup({"name": new FormControl(null, [Validators.required]) });

  this.addingTopping = new FormGroup({"name": new FormControl(null, [Validators.required]),
                                      "price": new FormControl(null, [Validators.required]) });

  this.addingToppingGroup = new FormGroup({"name": new FormControl(null, [Validators.required]) });

  this.addingItem = new FormGroup({"name": new FormControl(null,[Validators.required]),
                                 "category": new FormControl(null,[Validators.required]),
                                 "toppingGroup": new FormControl(null,[Validators.required]),
                                 "option": new FormControl(null,[Validators.required]),
                                 "price": new FormControl(null,[Validators.required]),
                                 "description": new FormControl(null,[Validators.required])
                                                                                    });

  this.editingCategory = new FormGroup({"name": new FormControl(null, [Validators.required]),
                                        "description": new FormControl(null) });

  this.editingOption = new FormGroup({"name": new FormControl(null, [Validators.required]),
                                        "description": new FormControl(null) });

  this.editingTopping = new FormGroup({"name": new FormControl(null, [Validators.required]),
                                      "price": new FormControl(null, [Validators.required]) });

  }

  ngOnInit(): void {}

  getCategories()
  {
    if(!this.isCategoryFetched)
    {
      this.menuService.getCategory(this.restId).subscribe((response) => {
        console.log(response);
        if(response.success) {
          this.isCategoryFetched = true;
          this.categories = response.data;
          console.log(this.categories);
        }

       },
       (err) => {

        console.log(err);
      })
    }

  }


  getToppingGroup() {
    this.menuService.getToppingGroup(this.restId).subscribe((response) => {
      console.log(response);
      if(response.success) {
        this.toppingGroup= response.data;
        console.log(this.toppingGroup);
      }

     },
     (err) => {

      console.log(err);
    })
  }

  getOption() {
    this.menuService.getOption(this.restId).subscribe((response) => {
      console.log(response);
      if(response.success) {
        this.options= response.data;
        console.log(this.options);
      }

     },
     (err) => {

      console.log(err);
    })
  }

  getTopping() {
    this.menuService.getTopping(this.restId).subscribe((response) => {
      console.log(response);
      if(response.success) {
        this.toppings= response.data;
        console.log(this.toppings);
      }

     },
     (err) => {

      console.log(err);
    })
  }

  addItem() {
    console.log(this.addingItem.value);
    // this.menuService.addItem(this.restId, this.addingItem.value).subscribe((response) => {
    //   if(response.success) {
    //     document.getElementById("addItemClose").click();
    //     this.addingItem.patchValue({name:'',category:'',option:'',toppingGroup:'',price:''});
    //     console.log(response);
    //   }

    //  },
    //  (err) => {

    //   console.log(err);
    // })
  }

  updateItem() {
    this.menuService.updateItem(this.restId).subscribe((response) => {
      console.log(response);
      if(response.success) {
        this.item= response.data;
        this.isCategoryFetched = false;
        this.getCategories();
        console.log(this.item);
      }

     },
     (err) => {

      console.log(err);
    })
  }

  addTopping() {
    this.menuService.addTopping(this.restId, this.addingTopping.value).subscribe((response) => {
      if(response.success) {
        document.getElementById("addToppingsClose").click();
        this.addingTopping.patchValue({name:'',price:''});
        this.isCategoryFetched = false;
        this.getCategories();
        console.log(response);
      }

     },
     (err) => {

      console.log(err);
    })
  }

  addOption() {
    this.menuService.addOption(this.restId, this.addingOption.value).subscribe((response) => {
      if(response.success) {
        document.getElementById("addOptionClose").click();
        this.addingOption.patchValue({name: ''});
        this.isCategoryFetched = false;
        this.getCategories();
        console.log(response);
      }

     },
     (err) => {

      console.log(err);
    })
  }

  addToppingGroup() {
    this.menuService.addToppingGroup(this.restId, this.addingToppingGroup.value).subscribe((response) => {
      if(response.success) {
        document.getElementById("CreateToppingGroupsClose").click();
        this.addingToppingGroup.patchValue({name: ''});
        this.isCategoryFetched = false;
        this.getCategories();
        console.log(response);
      }

     },
     (err) => {

      console.log(err);
    })
  }

  addCategory() {

      this.menuService.addCategory(this.restId, this.addingCategory.value).subscribe((response) => {
        if(response.success) {
          document.getElementById("addCategoryClose").click();
          this.addingCategory.patchValue({name: '',description:''});
          this.isCategoryFetched = false;
          this.getCategories();
          console.log(response);
        }

      },
      (err) => {

        console.log(err);
      })
   }

   deleteCategory(catId){
    console.log(catId);
    this.menuService.deleteCategory(catId).subscribe((response) => {
      if(response.success) {
        this.isCategoryFetched = false;
        this.getCategories();
        console.log("Successfully Deleted");
      }

    },
    (err) => {

      console.log(err);
    })
 }

 deleteOption(optId){
  console.log(optId);
  this.menuService.deleteOption(optId).subscribe((response) => {
    if(response.success) {
      this.isCategoryFetched = false;
      this.getCategories();
      console.log("Successfully Deleted");
    }

  },
  (err) => {

    console.log(err);
  })
}

deleteTopping(id){
  console.log(id);
  this.menuService.deleteTopping(id).subscribe((response) => {
    if(response.success) {
      this.isCategoryFetched = false;
      this.getCategories();
      console.log("Successfully Deleted");
    }

  },
  (err) => {

    console.log(err);
  })
}

deleteToppingGroup(id){
  console.log(id);
  this.menuService.deleteToppingGroup(id).subscribe((response) => {
    if(response.success) {
      this.isCategoryFetched = false;
      this.getCategories();
      console.log("Successfully Deleted");
    }

  },
  (err) => {

    console.log(err);
  })
}

updateCategory() {

  console.log(this.editingCategory.value)
  this.menuService.updateCategory(this.selectedCategory._id, this.editingCategory.value).subscribe((response) => {
    console.log(response);
    if(response.success) {
      this.isCategoryFetched = false;
      this.getCategories();
    }

   },
   (err) => {

    console.log(err);
  })
}

updateOption() {

  console.log(this.editingOption.value)
  this.menuService.updateOption(this.selectedOption._id, this.editingOption.value).subscribe((response) => {
    console.log(response);
    if(response.success) {
      this.isCategoryFetched = false;
      this.getOption();
    }

   },
   (err) => {

    console.log(err);
  })
}

updateTopping() {

  console.log(this.editingOption.value)
  this.menuService.updateTopping(this.selectedTopping._id, this.editingTopping.value).subscribe((response) => {
    console.log(response);
    if(response.success) {
      this.isCategoryFetched = false;
      this.getTopping();
    }

   },
   (err) => {

    console.log(err);
  })
}

updateToppingGroup() {

  console.log(this.editingOption.value)
  this.menuService.updateToppingGroup(this.selectedToppingGroup._id, this.editingToppingGroup.value).subscribe((response) => {
    console.log(response);
    if(response.success) {
      this.isCategoryFetched = false;
      this.getToppingGroup();
    }

   },
   (err) => {

    console.log(err);
  })
}

   setSelectedCategory(index) {

     this.selectedCategory = this.categories[index];
     console.log(this.selectedCategory)
   }

   setSelectedOption(index) {

    this.selectedOption = this.options[index];
    console.log(this.selectedOption)
  }

  setSelectedTopping(index) {

    this.selectedTopping = this.toppings[index];
    console.log(this.selectedTopping)
  }

  setSelectedToppingGroup(index) {

    this.selectedToppingGroup = this.toppingGroup[index];
    console.log(this.selectedToppingGroup)
  }

  editItemList(index) {
    this.selectedItem = this.items[index];
    console.log(this.selectedItem)
  }

  setItemCategory(event, catName){
    let itemCat: any = document.getElementById('newItemCat');
    itemCat.value = catName;
    this.addingItem.patchValue({category: event.target.value});
    console.log(event.target.value);
    console.log(catName);
  }

  setItemTopping(event, toppName){
    let itemtopp: any = document.getElementById('newItemTopp');
    itemtopp.value = toppName;
    this.addingItem.patchValue({toppingGroup: event.target.value});
    console.log(event.target.value);
    console.log(toppName);
  }

  setItemOption(event, optionName){
    let itemOption: any = document.getElementById('newItemOption');
    itemOption.value = optionName;
    this.addingItem.patchValue({option: event.target.value});
    console.log(event.target.value);
    console.log(optionName);
  }

}
