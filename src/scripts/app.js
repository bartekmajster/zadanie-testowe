export default class App{
	constructor(){
		this.productsList = document.querySelector('.products');
		document.querySelector('#products-quantity').addEventListener('change',this.updateList.bind(this));
		this.products = [];
	}

	init(){
		window.fetch('../public/assets/example.json')
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
      <div class="product__description-top">
        <p class="product__price">${promo} zł</p>
        <p class="product__price-old"><s>${base} zł</s></p>
      </div>
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
