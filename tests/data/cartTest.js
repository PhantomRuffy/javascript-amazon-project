import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

function getBrowserType() {
  const userAgent = navigator.userAgent;

  if (userAgent.includes("Chrome")) return "Detected: Chrome";
  if (userAgent.includes("Firefox")) {
    console.log(
      "%cUse Chrome or Chromium for Jasmine tests!",
      "background: #232327; color: #c12000",
    );
    return "Detected: Firefox";
  }
  if (userAgent.includes("Safari")) return "Detected: Safari";
  if (userAgent.includes("Edge")) return "Detected: Edge";
  if (userAgent.includes("Opera")) return "Detected: Opera";

  return "Unknown";
}
console.log(getBrowserType());

describe("test suite: addToCart", () => {
  it("adds an existing product to the cart", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
  });

  it("adds a new product to the cart", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
  });
});
