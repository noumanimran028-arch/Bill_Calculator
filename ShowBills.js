async function getProducts() {
    const Response2 = await fetch("https://6a80061eec7a640e63ab875c.mockapi.io/user/user");
    const data2 = await Response2.json();
    console.log(data2);
    let show = document.querySelector("#show");
    show.innerHTML = "";

    data2.forEach((Data2) => {
        let Grand = 0;
        show.innerHTML += `
                 <h2>Customer: ${Data2.customerName}</h2>
                            `;
        Data2.products.forEach((product, index) => {
            // Safety: agar total missing/undefined hai to khud calculate karo
            let qty = Number(product.quant1) || 0;
            let price = Number(product.price1) || 0;
            let total = product.total !== undefined && !isNaN(Number(product.total))
                ? Number(product.total)
                : qty * price;

            Grand += total;

            show.innerHTML += `
<table class="bill-table">
    <thead>
        <tr>
            <th>Product Name</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>Total Bill</th>
            <th>Action</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <td>${product.product1 ?? "N/A"}</td>
            <td>${qty}</td>
            <td>${price}</td>
            <td>${total}</td>
            <td>
                <button onclick="editUser(${Data2.id}, ${index})">
                    Edit
                </button>

                <button onclick="Delete(${Data2.id}, ${index})">
                    Delete
                </button>
            </td>
        </tr>
    </tbody>
</table>
`;
        });
        show.innerHTML += `
<div class="grand-total">
    <strong>Grand Total: ${Grand}</strong>
</div>
`;
    });
}

async function Delete(ID, productIndex) {
    const Response3 = await fetch(`https://6a80061eec7a640e63ab875c.mockapi.io/user/user/${ID}`);
    const userData = await Response3.json();
    userData.products.splice(productIndex, 1);

    if (userData.products.length === 0) {
        await fetch(`https://6a80061eec7a640e63ab875c.mockapi.io/user/user/${ID}`, {
            method: "DELETE"
        });
    } else {
        await fetch(`https://6a80061eec7a640e63ab875c.mockapi.io/user/user/${ID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
    }
    await getProducts();
}

async function editUser(ID, productIndex) {
    const response = await fetch(`https://6a80061eec7a640e63ab875c.mockapi.io/user/user/${ID}`);
    const userData = await response.json();
    const product = userData.products[productIndex];

    let name = prompt("Product Name", product.product1);
    let quant = prompt("Quantity", product.quant1);
    let price = prompt("Price", product.price1);

    // Cancel dabaya to kuch na ho
    if (name === null || quant === null || price === null) return;

    let total = parseFloat(quant) * Number(price);

    userData.products[productIndex] = {
        product1: name,
        quant1: quant,
        price1: price,
        total: isNaN(total) ? 0 : total
    };

    await fetch(`https://6a80061eec7a640e63ab875c.mockapi.io/user/user/${ID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });

    await getProducts();
}

window.onload = getProducts;
