// Product
export async function getAllProduct() {
	const response = await fetch('https://fakestoreapi.com/products');
	const allProduct = await response.json();
	return { allProduct };
}

export async function getSingleProduct(id: string) {
	const response = await fetch(`https://fakestoreapi.com/products/${id}`);
	const singleProduct = await response.json();
	return { singleProduct };
}

export async function getLimitResults(count: number) {
	const response = await fetch(`'https://fakestoreapi.com/products?limit=${count}`);
	const limitResults = await response.json();
	return { limitResults };
}

export async function getSortResults() {
	const response = await fetch(`https://fakestoreapi.com/products?sort=desc`);
	const sortResults = await response.json();
	return { sortResults };
}

export async function getAllCategories() {
	const response = await fetch('https://fakestoreapi.com/products/categories');
	const allCategoreis = await response.json();
	return { allCategoreis };
}

export async function getSpecificCategory(category: string) {
	const response = await fetch(`https://fakestoreapi.com/products/category${category}`);
	const specificCategory = await response.json();
	return { specificCategory };
}

interface ProdutData {
	title: string;
	price: number;
	description: string;
	image: string;
	category: string;
}

export async function addNewProduct({ title, price, description, image, category }: ProdutData) {
	const response = await fetch('https://fakestoreapi.com/products', {
		method: 'POST',
		body: JSON.stringify({
			title: title,
			price: price,
			description: description,
			image: image,
			category: category,
		}),
	});
	const newProduct = await response.json();
	return { newProduct };
}

export async function updataProduct({ title, price, description, image, category }: ProdutData) {
	const response = await fetch('https://fakestoreapi.com/products/7', {
		method: 'PUT',
		body: JSON.stringify({
			title: title,
			price: price,
			description: description,
			image: image,
			category: category,
		}),
	});
	const upProduct = await response.json();
	return { upProduct };
}

export async function deleteProdect(id: number) {
	const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
		method: 'DELETE',
	});

	const byeProduct = await response.json();
	return { byeProduct };
}

// Cart
