import { formatCurrency } from "../scripts/utils/money.js";

console.log("test suite: formatCurrency");

console.log("converts cents into dollars");
if (formatCurrency(2095) === "20.95") {
  console.log("%cpassed", "background: #232327; color: #5ab434");
} else {
  console.log("%cfailed", "background: #232327; color: #c12000");
}

console.log("works with 0");
if (formatCurrency(0) === "0.00") {
  console.log("%cpassed", "background: #232327; color: #5ab434");
} else {
  console.log("%cfailed", "background: #232327; color: #c12000");
}

console.log("rounds up to nearest cent");
if (formatCurrency(2000.5) === "20.01") {
  console.log("%cpassed", "background: #232327; color: #5ab434");
} else {
  console.log("%cfailed", "background: #232327; color: #c12000");
}

console.log("rounds down to nearest cent");
if (formatCurrency(2000.4) === "20.00") {
  console.log("%cpassed", "background: #232327; color: #5ab434");
} else {
  console.log("%cfailed", "background: #232327; color: #c12000");
}
