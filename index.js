let products = [];
let totalprice = 0;

const uimaker = () => {
    document.getElementById('tbody').innerHTML = '';
    document.getElementById('totalPrice').innerHTML = `Total Price: ${totalprice}`;

    for (let i = 0; i < products.length; i++) {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.innerHTML = products[i].name;
        let td2 = document.createElement('td');
        td2.innerHTML = products[i].price;
        let td3 = document.createElement('td');
        td3.innerHTML = products[i].quantity;
        let total = products[i].price * products[i].quantity;
        let td4 = document.createElement('td');
        td4.innerHTML = total.toFixed(2);
        let td5 = document.createElement('td');
        td5.innerHTML = 'Remove';
        td5.style.cursor = 'pointer';
        td5.addEventListener('click', () => removeproducts(i));
        tr.append(td1, td2, td3, td4, td5);
        document.getElementById('tbody').append(tr);
    }
};

const removeproducts = (index) => {
    let price = products[index].price * products[index].quantity;
    products.splice(index, 1);
    totalprice -= price;
    uimaker();
};

const handleData = (e) => {
    e.preventDefault();

    let product = {
        name: document.getElementById('Name').value,
        price:document.getElementById('price').value,
        quantity:document.getElementById('quantity').value,
    };
    
    products.push(product);
    totalprice += product.price * product.quantity;
    uimaker();
};

document.getElementById('buy').addEventListener('click', handleData);
