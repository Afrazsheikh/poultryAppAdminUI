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
  allergyGroup: any;
  isLoading: boolean = false;
  isLoadingItem: boolean = true;
  options: any;
  toppings: any;
  allergies: any;
  item: any;
  itemCatName: any = "";
  itemToppName: any = "";
  itemOptionName: any = "";
  toppGroup: any = "";
  addingCategory: any;
  addingOption: any;
  addingToppingGroup: any;
  addingTopping: any;
  selectedCategory: any;
  selectedOption: any;
  selectedTopping: any;
  selectedAllergy: any;
  selectedToppingGroup: any;
  selectedAllergyGroup: any;
  selectedItem: any;
  addingItem: any;
  editingItem: any;
  editingCategory: any;
  editingOption: any;
  editingTopping: any;
  editingToppingGroup: any;
  addingAllergy: any;
  addingAllergyGroup: any;
  isCategoryFetched: boolean;
  category: any;
  catItem: any;
  isItemFatched: boolean;
  value: any;
  selectedToppingIds: any[] = [];
  selectedAllergyIds: any[] = [];
  editingAllergy: any;


  constructor(private menuService: MenuService,private router: Router)
  {

  this.getItems();

  this.addingCategory = new FormGroup({"name": new FormControl(null, [Validators.required]),
                                       "description": new FormControl(null) });

  this.addingOption = new FormGroup({"name": new FormControl(null, [Validators.required]) });

  this.addingTopping = new FormGroup({"name": new FormControl(null, [Validators.required]),
                                      "price": new FormControl(null, [Validators.required]) });

  this.addingToppingGroup = new FormGroup({"name": new FormControl(null, [Validators.required]),
                                           "toppings": new FormControl([])});

  this.addingItem = new FormGroup({"name": new FormControl(null,[Validators.required]),
                                 "category": new FormControl(null,[Validators.required]),
                                 "toppingGroup": new FormControl(null,[Validators.required]),
                                 "options": new FormControl([],[Validators.required]),
                                 "price": new FormControl(null,[Validators.required]),
                                 "description": new FormControl(null,[Validators.required])
                                                                                    });

  this.editingCategory = new FormGroup({"name": new FormControl(null, [Validators.required]),
                                        "description": new FormControl(null) });

  this.editingOption = new FormGroup({"name": new FormControl(null, [Validators.required]),
                                        "description": new FormControl(null) });

  this.editingTopping = new FormGroup({"name": new FormControl(null, [Validators.required]),
                                      "price": new FormControl(null, [Validators.required]) });

  this.addingAllergy = new FormGroup({"name": new FormControl(null, [Validators.required]),
                                      "description": new FormControl(null) });

  this.addingAllergyGroup = new FormGroup({"name": new FormControl(null, [Validators.required])});

  this.editingAllergy = new FormGroup({"name": new FormControl(null, [Validators.required]),
                                      "description": new FormControl(null) });

  }

  ngOnInit(): void {}

  getItems(){

      this.menuService.getItems(this.restId).subscribe((response) => {
        console.log(response);
        if(response.success) {
          this.isLoadingItem = false;
          this.items = response.data;
          console.log(this.items);
        }

       },
       (err) => {
        console.log(err);
      })

  }

  getCategories()
  {
    if(!this.isCategoryFetched)
    {
      document.getElementById("getCategories").classList.add("getCategoriesModal");
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
    document.getElementById("getToppingGroup").classList.add("getCategoriesModal");
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

  getAllergyGroup() {
    // document.getElementById("getAllergyGroup").classList.add("getCategoriesModal");
    this.menuService.getAllergyGroup(this.restId).subscribe((response) => {
      console.log(response);
      if(response.success) {
        this.allergyGroup= response.data;
        console.log(this.allergyGroup);
      }

     },
     (err) => {

      console.log(err);
    })
  }

  getOption() {
    document.getElementById("getOption").classList.add("getCategoriesModal");
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

  getTopping(checkCheckedToppings) {
    this.menuService.getTopping(this.restId).subscribe((response) => {
      console.log(response);
      if(response.success) {
        this.toppings= response.data;
        if(checkCheckedToppings) {
          this.setCheckedToppings();
        }
        console.log(this.toppings);
      }

     },
     (err) => {

      console.log(err);
    })
  }

  addItem() {
    this.isLoading = true;
    console.log(this.addingItem.value);
    this.menuService.addItem(this.restId, this.addingItem.value).subscribe((response) => {
      if(response.success) {
        this.isLoading = false;
        document.getElementById("addItemClose").click();
        this.getItems();
        this.addingItem.patchValue({name:null,category:null,toppingGroup:null,options:[],price:null,description:null});
        let elem: any = document.getElementById('newItemCat');
        elem.value = null;
        elem = document.getElementById('newItemTopp');
        elem.value = null;
        elem = document.getElementById('newItemOption');
        elem.value = [];

        console.log(response);
      }

     },
     (err) => {

      console.log(err);
    })
  }

  updateItem(){
  console.log(this.addingItem.value);
    this.menuService.updateItem(this.selectedItem._id, this.addingItem.value).subscribe((response) => {
      console.log(response);
      if(response.success) {
        this.item = response.data;
        this.isCategoryFetched = false;
        this.getItems();
        console.log(this.item);
      }

     },
     (err) => {

      console.log(err);
    })
  }

  addTopping() {
    this.isLoading = true;
    this.menuService.addTopping(this.restId, this.addingTopping.value).subscribe((response) => {
      if(response.success) {
        this.isLoading = false;
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

  addAllergy() {
    this.isLoading = true;
    this.menuService.addAllergy(this.restId, this.addingAllergy.value).subscribe((response) => {
      if(response.success) {
        this.isLoading = false;
        document.getElementById("addAllergyClose").click();
        this.addingAllergy.patchValue({name:'',description:''});
        this.isCategoryFetched = false;
        this.getCategories();
        console.log(response);
      }

     },
     (err) => {

      console.log(err);
    })
  }

  getAllergy(checkCheckedAllergies) {
    this.menuService.getAllergy(this.restId).subscribe((response) => {
      console.log(response);
      if(response.success) {
        this.allergies = response.data;
        if(checkCheckedAllergies) {
          this.setCheckedAllergies();
        }
        console.log(this.allergies);
      }

     },
     (err) => {

      console.log(err);
    })
  }

  addOption() {
    this.isLoading = true;
    this.menuService.addOption(this.restId, this.addingOption.value).subscribe((response) => {
      if(response.success) {
        this.isLoading = false;
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
    this.isLoading = true;
    this.addingToppingGroup.patchValue({toppings: this.selectedToppingIds});
    console.log(this.addingToppingGroup.value);
    this.menuService.addToppingGroup(this.restId, this.addingToppingGroup.value).subscribe((response) => {
      if(response.success) {
        this.isLoading = false;
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

   addAllergyGroup() {
    this.isLoading = true;
    this.addingAllergyGroup.patchValue({allergies: this.selectedAllergyIds});
    console.log(this.addingToppingGroup.value);
    this.menuService.addToppingGroup(this.restId, this.addingToppingGroup.value).subscribe((response) => {
      if(response.success) {
        this.isLoading = false;
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
      this.isLoading = true;
      this.menuService.addCategory(this.restId, this.addingCategory.value).subscribe((response) => {
        if(response.success) {
          document.getElementById("addCategoryClose").click();
          this.isLoading = false;
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

   deleteItem(){
    console.log(this.selectedItem._id);
    this.menuService.deleteItem(this.selectedItem._id).subscribe((response) => {
      if(response.success) {
        this.isItemFatched = false;
        this.getItems();
        console.log("Successfully Deleted");
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

deleteAllergy(id){
  console.log(id);
  this.menuService.deleteAllergy(id).subscribe((response) => {
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
      this.getTopping(false);
    }

   },
   (err) => {

    console.log(err);
  })
}

updateAllergy() {

  this.menuService.updateAllergy(this.selectedAllergy._id, this.editingAllergy.value).subscribe((response) => {
    console.log(response);
    if(response.success) {
      this.isCategoryFetched = false;
      this.getAllergy(false);
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
    this.selectedTopping = this.toppingGroup[index];
    console.log(this.selectedTopping)
  }

  setSelectedToppingGroup(index) {
    this.getTopping(true);
    this.selectedToppingGroup = this.toppingGroup[index];
    console.log(this.selectedToppingGroup);

  }

  setSelectedAllergy(index) {
    this.selectedAllergy = this.allergyGroup[index];
    console.log(this.selectedAllergy)
  }

  setSelectedAllergyGroup(index) {
    this.getAllergy(true);
    this.selectedAllergyGroup = this.allergyGroup[index];
    console.log(this.selectedAllergyGroup);

  }

  setCheckedToppings() {

    this.selectedToppingGroup.toppings.forEach(groupTopping => {

      for(let i = 0; i < this.toppings.length; i++)
      {
        if(groupTopping._id == this.toppings[i]._id) {
          this.toppings[i]['isSelected'] = true;

          console.log(this.toppings);
        }
      }
    });
}

setCheckedAllergies() {

  this.selectedAllergyGroup.allergies.forEach(groupAllergy => {

    for(let i = 0; i < this.allergies.length; i++)
    {
      if(groupAllergy._id == this.allergies[i]._id) {
        this.allergies[i]['isSelected'] = true;

        console.log(this.allergies);
      }
    }
  });
}

  editItemList(index) {
    this.selectedItem = this.items[index];
    this.addingItem.patchValue({"name":this.selectedItem.name,"category":this.selectedItem.category,
    "toppingGroup":this.selectedItem.toppingGroup,"options":this.selectedItem.options,"price":this.selectedItem.price,
    "description":this.selectedItem.description});
    console.log("Patched value....." +  this.addingItem.value);
    console.log(this.selectedItem);
  }


  setItemCategory(event, catName){
    let itemCat: any = document.getElementById('newItemCat');
    itemCat.value = catName;
    this.itemCatName = catName;
    this.addingItem.patchValue({category: event.target.value});
    console.log(event.target.value);
    console.log(catName);
    // document.getElementById("getCategories").classList.remove("getCategoriesModal");
    document.getElementById("categoryCloseButton").click();
  }

  setItemTopping(event, toppName){
    let itemtopp: any = document.getElementById('newItemTopp');
    itemtopp.value = toppName;
    this.itemToppName = toppName;
    this.addingItem.patchValue({toppingGroup: event.target.value});
    console.log(event.target.value);
    console.log(toppName);
    document.getElementById("toppingCloseButton").click();
  }

  setItemOption(event, optionName){
    let itemOption: any = document.getElementById('newItemOption');
    itemOption.value = optionName;
    this.itemOptionName = optionName;
    this.addingItem.patchValue({option: event.target.value});
    console.log(event.target.value);
    console.log(optionName);
    document.getElementById("optionCloseButton").click();
  }

  addItemToppingGroup(toppGroupId, index){

    let toppGroup: any = document.getElementsByClassName('newToppingGroup')[index] as HTMLInputElement;
    console.log(toppGroup.checked);
    if(toppGroup.checked == true){
      this.selectedToppingIds.push(toppGroupId);
    }
    else{
      var index: any = this.selectedToppingIds.indexOf(toppGroupId);

      this.selectedToppingIds.splice(index, 1);
    }
    console.log(this.selectedToppingIds);

  }

  addItemAllergyGroup(allergyGroupId, index){

    let allergyGroup: any = document.getElementsByClassName('newAllergyGroup')[index] as HTMLInputElement;
    console.log(allergyGroup.checked);
    if(allergyGroup.checked == true){
      this.selectedAllergyIds.push(allergyGroupId);
    }
    else{
      var index: any = this.selectedAllergyIds.indexOf(allergyGroupId);

      this.selectedAllergyIds.splice(index, 1);
    }
    console.log(this.selectedAllergyIds);

  }

  clearCheckData(){

    this.selectedToppingIds = [];

  }

  clearCheckDataAllergy(){

    this.selectedAllergyIds = [];
  }


  editform(){
    this.addingItem.patchValue({name:null,category:null,toppingGroup:null,options:[],price:null,description:null});
  }

}
