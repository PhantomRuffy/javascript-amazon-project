import { addToCart, cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  const orderSummary = document.querySelector(".js-order-summary");
  orderSummary.innerHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption = getDeliveryOption(deliveryOptionId);
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    const matchingProduct = getProduct(productId);

    if (matchingProduct) {
      orderSummary.innerHTML += `
        <div class="js-cart-item-container cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>
          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingProduct.image}">
            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                ${matchingProduct.getPrice()}
              </div>
              <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                <span>
                  Quantity: 
                  <span class="quantity-label-${matchingProduct.id}">
                    ${cartItem.quantity}
                  </span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-quantity-link " data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>
            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
          </div>
        </div>`;
    }
  });

  // event listeners for js-delete-quantity-link
  document.querySelectorAll(".js-delete-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`,
      );
      container.remove();
      renderPaymentSummary();
    });
  });
  // event listeners for js-delivery-option
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-update-quantity-link").forEach((element) => {
    element.addEventListener("click", () => {
      
      const productId = element.dataset.productId;
      const cartItem = cart.find((item) => item.productId === productId);
      const currentQuantity = cartItem.quantity;
      document.querySelector(`.quantity-label-${productId}`).innerHTML = "";
      element.innerHTML = `
      <input class="js-input-quantity-${productId} new-quantity-input" type="number" value="${currentQuantity}" autofocus>
      <span class="js-save-${productId}">Save</span>
    `;
      const input = element.querySelector(`.js-input-quantity-${productId}`);
      input.select();

      // Stop clicks on input from triggering parent listener
      input.addEventListener("click", (e) => e.stopPropagation());

      element
        .querySelector(`.js-save-${productId}`)
        .addEventListener("click", (e) => {
          e.stopPropagation();
          const newQuantity = Number(input.value);
          if (newQuantity <= 0) {
            removeFromCart(productId);
          } else {
            addToCart(productId, -currentQuantity);
            addToCart(productId, newQuantity);
          }
          console.log(newQuantity);
          renderOrderSummary();
          renderPaymentSummary();
        });
    });
  });
}

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = "";
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    const priceString =
      deliveryOption.priceCents === 0
        ? "FREE"
        : `$${formatCurrency(deliveryOption.priceCents)} -`;
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option" 
        data-delivery-option-id="${deliveryOption.id}" 
        data-product-id="${matchingProduct.id}">
        <input type="radio"
          ${isChecked ? "checked" : ""}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>`;
  });
  return html;
}

