import '../styles/reset.css';
import '../styles/common.css';
import '../styles/index.css';
import '../styles/components/header.css';
import '../styles/components/clock.css';
import '../styles/components/information.css';
import '../styles/components/products.css';

import countDown from "./timer";
import setDate from "./clock";

setDate();

countDown();

class App{
	constructor(){
		this.productsList = document.querySelector('.products');
		document.querySelector('#products-quantity').addEventListener('change',this.updateList.bind(this));
		this.products = [];
	}

	init(){
		fetch('../public/example.json')
			.then(response => response.json())
			.then(data => this.products.push(...data.list))
			.then(() => this.mapProduct())
			.then(() => this.updateList());
	}

	mapProduct(){
		this.products = this.products.map(product => {
			const {
				availability: {name:availability},
				main_image: image,
				price: {
					gross: {
						promo_float: promo
					}
				},
				price: {
					gross: {
						base_float: base
					}
				},
				name: name,
				producer: {
					name: producer
				}
			} = product;
			return `
	<div class="product">
      <div class="product__top">
        <div class="product__bag">
          <div class="product__bag-wrapper">
            <img src="../public/assets/images/shopping_bag.png" alt="shopping_bag" class="product__icon">
            <p class="product__quantity">${availability}</p>
          </div>
        </div>
        <div class="product__save">Oszczędzasz: <strong class="product__save--bold"> ${base-promo}zł</strong></div>
      </div>
      <div class="product__image">
        <img
                src="https://www.outletmeblowy.pl/environment/cache/images/300_300_productGfx_${image}.jpg"
                alt="furniture"
                width="300"
                height="139"
                class="product__image-source"
        >
      </div>
      <div class="product__description">
        <p class="product__price">${promo} zł</p>
        <p class="product__price-old"><s>${base} zł</s></p>
        <p class="product__title">${name}</p>
        <p class="product__group">Grupa ${producer}</p>
      </div>
    </div>
`;
		});
	}
	updateList(e){
		const quantity = ((e !== undefined) ? e.target.value : 4);

		this.productsList.innerHTML = '';
		let index = 0;
		for(let i = 0; i<quantity;i++){
			this.productsList.insertAdjacentHTML('beforeend',this.products[index]);
			index++;
			if(index>4) index = 0;
		}
	}
}

const app = new App();
app.init();

/*const section = document.querySelector('.products');
const select = document.querySelector('#products-quantity');
let products = [];

function showProduct() {
	products = products.map(product => {
		const {
			availability: {name:availability},
			main_image: image,
			price: {
				gross: {
					promo_float: promo
				}
			},
			price: {
				gross: {
					base_float: base
				}
			},
			name: name,
			producer: {
				name: producer
			}
		} = product;
		return `
	<div class="product">
      <div class="product__top">
        <div class="product__bag">
          <div>
            <img src="../public/assets/images/shopping_bag.png" alt="shopping_bag" class="product__icon">
            <p class="product__quantity">${availability}</p>
          </div>
        </div>
        <div class="product__save">Oszczędzasz: <strong class="product__save--bold"> ${base-promo} zł</strong></div>
      </div>
      <div class="product__image">
        <img
                src="https://www.outletmeblowy.pl/environment/cache/images/300_300_productGfx_${image}.jpg"
                alt="furniture"
                class="product__image-source"
        >
      </div>
      <div class="product__description">
        <p class="product__price">${promo} zł</p>
        <p class="product__price-old"><s>${base} zł</s></p>
        <p class="product__title">${name}</p>
        <p class="product__group">Grupa ${producer}</p>
      </div>
    </div>
`;
	});
}

function updateList(){
	section.innerHTML = '';
	for(let i = 0; i<this.value;i++){
		section.insertAdjacentHTML('beforeend',products[i]);
	}
}

fetch('../../public/example.json')
	.then(response => response.json())
	.then(data => products.push(...data.list))
	.then(() => showProduct());


select.addEventListener('change',updateList);*/

