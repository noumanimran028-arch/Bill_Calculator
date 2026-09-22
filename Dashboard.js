let Products = [];

function addProducts() {
    let name = document.querySelector("#Product1").value;
    let quant = document.querySelector("#Quant1").value;
    let price = document.querySelector("#Price1").value;

    if (!name || !quant || !price) {
        alert("Please fill all product fields before adding.");
        return;
    }

    let total = parseFloat(quant) * Number(price);
    let productsData = {
        product1: name,
        quant1: quant,
        price1: price,
        total: total
    };

    Products.push(productsData);
    let show1 = document.querySelector("#show1");

    show1.innerHTML += `
        <table class="bill-table">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Product Quantity</th>
                    <th>Product Price</th>
                    <th>Total Bill</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${productsData.product1}</td>
                    <td>${productsData.quant1}</td>
                    <td>${productsData.price1}</td>
                    <td>${productsData.total}</td>
                </tr>
            </tbody>
        </table>
    `;
}

async function finalBill() {
    let Name1 = document.querySelector("#Name1").value;

    if (!Name1) {
        alert("Please enter customer name.");
        return;
    }

    if (Products.length === 0) {
        alert("Please add at least one product before final bill.");
        return;
    }

    const billData = {
        customerName: Name1,
        products: Products
    };
    console.log(billData);
    const response = await fetch("https://6a80061eec7a640e63ab875c.mockapi.io/user/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(billData)
    });

    const data = await response.json();
    window.location.href = "ShowBills.html";
}
