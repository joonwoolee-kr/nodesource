import { odd, even } from "./var.mjs";

function checkOddOrEven(num) {
  if (num % 2) {
    return odd;
  }
  return even;
}

export default checkOddOrEven; // export 하나만 할 때
