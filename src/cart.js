function addToCart(cart, product, quantity) {
  if (quantity === 0) throw new RangeError('нельзя 0');
  if (quantity < 0) throw new RangeError('нельзя отрицательное количество');

  const c = [...cart];
  const i = c.map((p) => p.id).indexOf(product.id);

  if (i !== -1) {
    const newQuantity = c[i].quantity + quantity;
    if (newQuantity > product.stock) {
      throw new RangeError('вы хотите больше чем есть на складе');
    }
    c[i] = { ...c[i], quantity: newQuantity };
  } else {
    if (quantity > product.stock) {
      throw new RangeError('вы хотите больше чем есть на складе');
    }
    c.push({ ...product, quantity });
  }

  return c;
}

function changeQuantity(cart, id, quantity) {
  if (quantity === 0) throw new RangeError('нельзя 0');
  if (quantity < 0) throw new RangeError('нельзя отрицательное количество');

  const c = [...cart];
  const i = c.map((p) => p.id).indexOf(id);

  if (i === -1) return c;
  if (quantity > c[i].stock) {
    throw new RangeError('количество больше чем есть на складе');
  }

  c[i] = { ...c[i], quantity: quantity };

  return c;
}

function removeFromCart(cart, id) {
  const c = [...cart];
  return c.filter((p) => p.id !== id);
}

function calculateCartSubtotal(cart) {
  const c = [...cart];
  const q = c.map((p) => p.price * p.quantity);
  return q.reduce((sum, m) => sum + m, 0);
}

function calculateOrderTotal(cart, promocod) {
  const c = [...cart];

  const subtotal = calculateCartSubtotal(c);
  const delivery = subtotal >= 50000 ? 0 : 30000;

  const cost = subtotal + delivery;

  const discount =
    promocod === 'SAVE10' && subtotal > 20000 ? subtotal * 0.1 : 0;
  const total = cost - discount;

  return {
    subtotal: subtotal,
    discount: discount,
    delivery: delivery,
    total: total,
  };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
