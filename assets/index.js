const barsBtn = document.querySelector(".menu-label");
const cartBtn = document.querySelector(".cart-label");
const cartMenu = document.querySelector(".cart");
const barsMenu = document.querySelector(".navbar-list");
const products = document.querySelector(".products-container");
const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const categories = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
const btnLoad = document.querySelector(".btn-load");
const buyBtn = document.querySelector(".btn-buy");

/* Muestro los menus y cierra con scroll*/
const toggleMenu = () => {
  barsMenu.classList.toggle("open-menu");
  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    return;
  }
};

const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");
  if (barsMenu.classList.contains("open-menu")) {
    barsMenu.classList.remove("open-menu");
    return;
  }
};

const closeOnScroll = () => {
  if (
    !barsMenu.classList.contains("open-menu") &&
    !cartMenu.classList.contains("open-cart")
  )
    return;

  barsMenu.classList.remove("open-menu");
  cartMenu.classList.remove("open-cart");
};

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};

/* Trabajo el carrito */
const renderCartProduct = (cartProduct) => {
  const { id, name, precio, img, quantity } = cartProduct;
  return `
    <div class="cart-item">
        <img src="${img}" alt="servicio seleccionado" />
        <div class="card-item-text">
            <div class="item-info">
              <h3 class="item-title">${name}</h3>
                <span class="item-price">$${precio}</span>
            </div>
            <div class="item-handler">
                <span class="quantity-handler down" data-id=${id}>-</span>
                <span class="item-quantity">${quantity}</span>
                <span class="quantity-handler up" data-id=${id}>+</span>
            </div>
        </div>
    </div>`;
};

const renderCart = (cartList) => {
  if (!cartList.length) {
    productsCart.innerHTML = `<p>No hay productos en el carrito</p>`;
    return;
  }
  productsCart.innerHTML = cartList.map(renderCartProduct).join("");
};

const showTotal = (cartList) => {
  total.innerHTML = `${cartList.reduce(
    (acc, cur) => acc + Number(cur.precio) * cur.quantity,
    0
  )}`;
};

const disableBuyBtn = () => {
  if (!cart.length) {
    buyBtn.classList.add("disabled");
  } else {
    buyBtn.classList.remove("disabled");
  }
};

const handleQuantity = (e) => {
  if (e.target.classList.contains("down")) {
    const existingCartItem = cart.find(
      (item) => item.id === e.target.dataset.id
    );
    if (existingCartItem.quantity === 1) {
      cart = cart.filter((prod) => prod.id !== existingCartItem.id);
      saveLocalStorage(cart);
      renderCart(cart);
      showTotal(cart);
      disableBuyBtn();
      return;
    }
    cart = cart.map((item) => {
      return item.id === existingCartItem.id
        ? { ...item, quantity: Number(item.quantity) - 1 }
        : item;
    });
  } else if (e.target.classList.contains("up")) {
    const existingCartItem = cart.find(
      (item) => item.id === e.target.dataset.id
    );

    cart = cart.map((item) => {
      return item.id === existingCartItem.id
        ? { ...item, quantity: Number(item.quantity) + 1 }
        : item;
    });
  }
  saveLocalStorage(cart);
  renderCart(cart);
  showTotal(cart);
  disableBuyBtn();
};

const addProduct = (e) => {
  if (!e.target.classList.contains("btn-add")) return;
  const product = {
    id: e.target.dataset.id,
    name: e.target.dataset.name,
    precio: e.target.dataset.precio,
    img: e.target.dataset.img,
  };

  const existingCartItem = cart.find((item) => item.id === product.id);

  if (existingCartItem) {
    cart = cart.map((item) => {
      return item.id === product.id
        ? { ...item, quantity: Number(item.quantity) + 1 }
        : item;
    });
  } else {
    cart = [...cart, { ...product, quantity: 1 }];
  }
  saveLocalStorage(cart);
  renderCart(cart);
  showTotal(cart);
  disableBuyBtn();
};

const completeBuy = () => {
    if (!cart.length) return;
      localStorage.removeItem('cart');
      window.location.reload();
  };

/* Sección de precios */
const renderProduct = (product) => {
  const { id, name, tiempo, precio, cardImg } = product;
  return `
    <div class="product">
        <img src=${cardImg} alt=${name} />
        <div class="product-info">
            <div class="product-top">
                <h3>${name}</h3>
            </div>
            <div class="product-mid">
                <p>Tiempo ${tiempo}</p>
                <span>$${precio}</span>
            </div>
            <div class="product-bot">
                <button class="btn-add"
                data-id='${id}'
                data-name='${name}'
                data-precio='${precio}'
                data-img='${cardImg}'>AGREGAR AL CARRITO</button>
            </div>
        </div>
    </div>`;
};

const renderProducts = (category, index) => {
  if (category === "todos") {
    products.innerHTML += allProducts.productList[index]
      .map(renderProduct)
      .join("");
    return;
  }
  const productList = productsData.filter((p) => p.category === category);
  products.innerHTML = productList.map(renderProduct).join("");
};

const showMore = () => {
  renderProducts("todos", allProducts.next);
  allProducts.next++;
  if (allProducts.next === allProducts.limit) {
    btnLoad.classList.add("hidden");
  }
};

const changeFilterState = (e) => {
  const selectedCategory = e.target.dataset.category;
  const categories = [...categoriesList];
  categories.forEach((category) => {
    if (category.dataset.category !== selectedCategory) {
      category.classList.remove("active");
    } else {
      category.classList.add("active");
    }
  });
  if (selectedCategory !== "todos") {
    btnLoad.classList.add("hidden");
  } else {
    btnLoad.classList.remove("hidden");
  }
};

const filterProducts = (e) => {
  if (!e.target.classList.contains("category")) return;
  changeFilterState(e);
  if (e.target.dataset.category === "todos") {
    products.innerHTML = "";
    renderProducts("todos", 0);
  } else {
    renderProducts(e.target.dataset.category);
  }
};

const inicio = () => {
  cartBtn.addEventListener("click", toggleCart);
  barsBtn.addEventListener("click", toggleMenu);
  window.addEventListener("scroll", closeOnScroll);
  document.addEventListener("DOMContentLoaded", renderProducts("todos", 0));
  btnLoad.addEventListener("click", showMore);
  categories.addEventListener("click", filterProducts);
  document.addEventListener("DOMContentLoaded", renderCart(cart));
  document.addEventListener("DOMContentLoaded", showTotal(cart));
  products.addEventListener("click", addProduct);
  productsCart.addEventListener("click", handleQuantity);
  buyBtn.addEventListener("click", completeBuy);
  disableBuyBtn();
};

inicio();
