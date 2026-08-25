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
                        Grand += Number(product.total);
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
                <td>${product.product1}</td>
                <td>${product.quant1}</td>
                <td>${product.price1}</td>
                <td>${product.total}</td>
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
                //console.log(data2);
                //console.log(data2[0].products[0].price1);
                //console.log(data2[0].products[0].product1);
                //console.log(data2[0].products[0].quant1);
            }

            async function Delete(ID, productIndex) {
                const Response3 = await fetch(`https://6a80061eec7a640e63ab875c.mockapi.io/user/user/${ID}`);

                const userData = await Response3.json();
                userData.products.splice(productIndex, 1);
                if (userData.products.length === 0) {
                    await fetch(`https://6a80061eec7a640e63ab875c.mockapi.io/user/user/${ID}`, {
                        method: "DELETE"
                    });
                    await getProducts();
                }else {
                    await fetch(`https://6a80061eec7a640e63ab875c.mockapi.io/user/user/${ID}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(userData)
                    });

                    await getProducts();
                }
            }
            //Edit Data

            /*async function editUser(ID) {
                                let name = prompt("Enter Product name");
                                let quant = prompt("Enter Quantity");
                                let price = prompt("Enter price");
                                let total = parseFloat(quant) * Number(price);
                                let productsData = {
                                    product1: name,
                                    quant1: quant,
                                    price1: price,
                                    total: total
                                };
                                    const Response3 = await fetch(`https://6a80061eec7a640e63ab875c.mockapi.io/user/user/${ID}`, {
                                        method: "PUT",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(productsData)
                                    });
                                    const editData = await Response3.json();
                                    console.log(editData);
                                }*/

            async function editUser(ID, productIndex) {
                // Customer ka poora data lao
                const response = await fetch(`https://6a80061eec7a640e63ab875c.mockapi.io/user/user/${ID}`);

                const userData = await response.json();

                // Jo product edit karna hai
                const product = userData.products[productIndex];

                // Purani values prompt mein dikhao
                let name = prompt("Product Name", product.product1);
                let quant = prompt("Quantity", product.quant1);
                let price = prompt("Price", product.price1);

                let total = parseFloat(quant) * Number(price);

                // Array ke andar product update karo
                userData.products[productIndex] = {
                    product1: name,
                    quant1: quant,
                    price1: price,
                    total: total
                };

                // Updated data save karo
                await fetch(`https://6a80061eec7a640e63ab875c.mockapi.io/user/user/${ID}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                });

                await getProducts();
            }
            window.onload = getProducts;
