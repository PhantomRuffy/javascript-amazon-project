import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { formatCurrency } from "./utils/money.js";
import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";

function renderOrdersGrid() {
  function generateOrderHeader(order) {
    return `
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${dayjs(order.orderTime).format("MMMM M")}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.totalCostCents)}</div>
          </div>
        </div>
        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>
    `;
  }

  function generateOrderItems(order) {
    let html = "";
    order.products.forEach((item) => {
      const product = getProduct(item.productId);

      if (!product) return;

      html += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${dayjs(item.estimatedDeliveryTime).format("MMMM M")}
          </div>
          <div class="product-quantity">
            Quantity: ${item.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${item.productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });
    return html;
  }

  const orderGrid = document.querySelector(".js-orders-grid");
  let html = "";

  if (orders.length <= 0) return;

  orders.forEach((order) => {
    if (!order.errorMessage) {
      html += `<div class="order-container">`;
      html += generateOrderHeader(order);

      const itemsHtml = generateOrderItems(order);
      if (itemsHtml) {
        html += `<div class="order-details-grid">${itemsHtml}</div>`;
      }
      html += `</div>`;
    }
  });

  orderGrid.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
  loadProductsFetch().then(() => {
    renderOrdersGrid();
  });
});
