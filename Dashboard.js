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
