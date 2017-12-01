(function () {
   'use strict';

   var meals = [
     {
       "name":"Super cheesy burger",
       "description":"Discover our great cheesy burger with mozzarella, gorgonzola and pecorino",
       "price":8.5,
       "veggie":true,
       "quantity":0
     },
     {
       "name":"Bad beef burger",
       "description":"Full of angry beef, jalapeno peppers, fried onions and our special BBQ sauce",
       "price":12,
       "veggie":false,"quantity":0
     },
     {
       "name":"Spicy chili burger",
       "description":"HOT HOT HOT HOT HOT HOT",
       "price":10,
       "veggie":false,
       "quantity":0
     }
   ];

let foodMenu = new Vue({
  el: '#app',
  data: {
    meals: [],
    totalPrice: 0,
    totalQuantity: 0,
    isLoaded: false
  },
  methods: {
    getMeals(){
     var url = 'https://wt-902485dbb4fca4fccee3a0efcde5b34c-0.run.webtask.io/foodmenu';

     fetch(url)
       .then( (response) =>  {return response.json();} )
       .then ( (data) => {
          this.meals = data;
          this.isLoaded = true;
       })
       .catch( (error) => {
         console.log(`fetch error: ${error.message}`);
       });
    },
    add(meal) {
      meal.quantity++;
      this.calc();
    },
    remove(meal) {
      if (meal.quantity>=1) {
        meal.quantity--;
        this.calc();
      }
    },
    calc() {
      let total      = 0,
          quantities = 0;
      this.meals.forEach( (meal) => {
        total      += meal.price * meal.quantity;
        quantities += meal.quantity;
      });
      this.totalPrice    = total;
      this.totalQuantity = quantities;
    }
  },
  mounted() {
    this.getMeals();
  }
});


}());
