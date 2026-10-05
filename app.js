
"use strict";


// ==============================
// Initial Products
// ==============================

let inventory = [

    {
        id: "BK-201",
        name: "Programming Book",
        price: 35.99,
        inStock: true
    },

    {
        id: "ST-202",
        name: "Study Table",
        price: 120.00,
        inStock: true
    },

    {
        id: "BT-203",
        name: "Water Bottle",
        price: 18.50,
        inStock: false
    },

    {
        id: "BG-204",
        name: "Travel Backpack",
        price: 65.00,
        inStock: true
    }

];


let showOnlyAvailable = false;


// ==============================
// Get Available Products
// ==============================

function getAvailableProducts(products) {

    return products.filter(
        product => product.inStock
    );

}


// ==============================
// Remove Product
// ==============================

function removeProduct(productId) {

    inventory = inventory.filter(
        product =>
            String(product.id) !==
            String(productId)
    );

    renderInventory();

}


// ==============================
// Display Products
// ==============================

function renderInventory() {

    const tableBody =
        document.getElementById(
            "inventory-table-body"
        );


    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = "";


    const displayedProducts =
        showOnlyAvailable
            ? getAvailableProducts(inventory)
            : inventory;


    if (displayedProducts.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="5"
                    class="no-products">
                    No products found.
                </td>
            </tr>
        `;

        return;
    }


    displayedProducts.forEach(product => {

        const row =
            document.createElement("tr");


        const statusBadge =
            product.inStock

                ? `
                    <span class="badge badge-success">
                        In Stock
                    </span>
                  `

                : `
                    <span class="badge badge-danger">
                        Out of Stock
                    </span>
                  `;


        row.innerHTML = `

            <td>
                <strong>
                    ${product.id}
                </strong>
            </td>

            <td>
                ${product.name}
            </td>

            <td>
                $${product.price.toFixed(2)}
            </td>

            <td>
                ${statusBadge}
            </td>

            <td>

                <button
                    class="remove-btn"
                    data-id="${product.id}"
                >
                    Remove
                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });


    // Remove buttons

    const removeButtons =
        document.querySelectorAll(
            ".remove-btn"
        );


    removeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const productId =
                    button.getAttribute(
                        "data-id"
                    );

                removeProduct(productId);

            }
        );

    });

}


// ==============================
// Page Events
// ==============================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const form =
            document.getElementById(
                "product-form"
            );


        const showAllBtn =
            document.getElementById(
                "show-all-btn"
            );


        const showAvailableBtn =
            document.getElementById(
                "show-available-btn"
            );


        // ==========================
        // Add Product
        // ==========================

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const idInput =
                    document
                        .getElementById(
                            "product-id"
                        )
                        .value
                        .trim();


                const nameInput =
                    document
                        .getElementById(
                            "product-name"
                        )
                        .value
                        .trim();


                const priceInput =
                    parseFloat(
                        document
                            .getElementById(
                                "product-price"
                            )
                            .value
                    );


                const inStockInput =
                    document
                        .getElementById(
                            "product-instock"
                        )
                        .checked;


                // Check duplicate ID

                const exists =
                    inventory.some(
                        product =>
                            String(product.id) ===
                            String(idInput)
                    );


                if (exists) {

                    alert(
                        "A product with this ID already exists."
                    );

                    return;
                }


                // Create new product

                const newProduct = {

                    id: idInput,

                    name: nameInput,

                    price: priceInput,

                    inStock: inStockInput

                };


                inventory.push(
                    newProduct
                );


                renderInventory();


                form.reset();

            }
        );


        // ==========================
        // Show All
        // ==========================

        showAllBtn.addEventListener(
            "click",
            () => {

                showOnlyAvailable = false;

                showAllBtn.classList.add(
                    "active"
                );

                showAvailableBtn.classList.remove(
                    "active"
                );

                renderInventory();

            }
        );


        // ==========================
        // Show Available
        // ==========================

        showAvailableBtn.addEventListener(
            "click",
            () => {

                showOnlyAvailable = true;

                showAvailableBtn.classList.add(
                    "active"
                );

                showAllBtn.classList.remove(
                    "active"
                );

                renderInventory();

            }
        );


        // Initial Display

        renderInventory();

    }
);

