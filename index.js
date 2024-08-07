const StartWith = (number) => {
    return number < 10 ? '0' + number : number;
};

const calculateRemainingTime = (targetTime) => {
    let now = new Date();
    let timeDifference = targetTime - now;

    if (timeDifference <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 };
    }

    let hours = Math.floor(timeDifference / (1000 * 60 * 60));
    let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
};

const Countdown = (targetTime) => {
    return () => {
        let { hours, minutes, seconds } = calculateRemainingTime(targetTime);

        let hoursString = StartWith(hours);
        let minutesString = StartWith(minutes);
        let secondsString = StartWith(seconds);

        let timeString = `${hoursString}:${minutesString}:${secondsString}`;
        let countdown = document.getElementById('countdown');
        countdown.innerHTML = timeString;
    };
};

let targetTime = new Date();
targetTime.setHours(targetTime.getHours() + 24);

const updateCountdown = Countdown(targetTime);
setInterval(updateCountdown, 1000);
updateCountdown();

// Product form
let products = [];

const displayProduct = () => {
    let productSection2 = document.getElementById("product-section-2");
    productSection2.innerHTML = "";

    products.forEach((product, i) => {
        let div = document.createElement('div');
        div.className = "product-card";

        let img = document.createElement('img');
        img.src = product.PImgUrl || "Url";
        img.alt = product.Pname + " Image";

        let h5 = document.createElement('h5');
        h5.innerHTML = product.Pname;

        let pCategory = document.createElement('p');
        pCategory.textContent = "Category: " + product.PCategory;

        let pPrice = document.createElement('p');
        pPrice.className = "price";
        pPrice.textContent = "Price: $" + product.Pprice;

        let pDescription = document.createElement('p');
        pDescription.textContent = product.PDescription;

        let buyButton = document.createElement('button');
        buyButton.className = "buy-button";
        buyButton.textContent = "Buy";
        buyButton.onclick = showModal;

        let deleteButton = document.createElement('button');
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteProductSection2(i);

        let buttonContainer = document.createElement('div');
        buttonContainer.className = "button-container";
        buttonContainer.appendChild(buyButton);
        buttonContainer.appendChild(deleteButton);

        div.appendChild(img);
        div.appendChild(h5);
        div.appendChild(pCategory);
        div.appendChild(pPrice);
        div.appendChild(pDescription);
        div.appendChild(buttonContainer);

        productSection2.appendChild(div);
    });
};

const deleteProductSection1 = (index) => {
    let productSection1 = document.getElementById("product-section-1");
    let productCards1 = productSection1.getElementsByClassName('product-card');
    if (index < productCards1.length) {
        productSection1.removeChild(productCards1[index]);
    }
};

const deleteProductSection2 = (index) => {
    products.splice(index, 1);
    displayProduct();
};

const showModal = () => {
    let myModal = new bootstrap.Modal(document.getElementById('myModal'));
    myModal.show();
};

const handleProductData = (e) => {
    e.preventDefault();
    let Pname = document.getElementById("Name").value;
    let PCategory = document.getElementById("Category").value;
    let PimgFile = document.getElementById("ImgFile").files[0];
    let PImgUrl = document.getElementById("ImgUrl").value;
    let Pprice = document.getElementById("price").value;
    let PDescription = document.getElementById("Description").value;

    let newProduct = {
        Pname,
        PCategory,
        PimgFile,
        PImgUrl,
        Pprice,
        PDescription
    };

    products.push(newProduct);
    displayProduct();
    showModal();
    document.getElementById("Form").reset();
};

document.getElementById("Form").addEventListener("submit", handleProductData);

const toggleImageInput = () => {
    let fileOption = document.getElementById("fileOption").checked;
    let ImgFile = document.getElementById("ImgFile");
    let ImgUrl = document.getElementById("ImgUrl");

    if (fileOption) {
        ImgFile.disabled = false;
        ImgUrl.disabled = true;
        ImgUrl.value = "";
    } else {
        ImgFile.disabled = true;
        ImgUrl.disabled = false;
        ImgFile.value = "";
    }
};
