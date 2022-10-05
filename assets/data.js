const productsData = [
{
    id: 1,
    name: 'Perfilado de cejas',
    tiempo: '10 min.',
    precio: 1300,
    category: 'threading',
    cardImg: "assets/img/perfilado-cejas.PNG",
},
{
    id: 2,
    name: 'Lifting de pestañas',
    tiempo: '45 a 60 min.',
    precio: 3000,
    category: 'styling-pestañas',
    cardImg: "assets/img/lifting-pestañas.PNG",
},
{
    id: 3,
    name: 'Alisado de cejas',
    tiempo: '30 min.',
    precio: 2600,
    category: 'styling-cejas',
    cardImg: "assets/img/alisado-cejas.PNG",
},
{
    id: 4,
    name: 'Barba',
    tiempo: '10 min.',
    precio: 2000,
    category: 'threading',
    cardImg: "assets/img/barba.PNG",
},
{
    id: 5,
    name: 'Laminado de cejas',
    tiempo: '30 min.',
    precio: 2600,
    category: 'styling-cejas',
    cardImg: "assets/img/laminado-cejas.PNG",
},
{
    id: 6,
    name: 'Permanente de pestañas',
    tiempo: '45 a 60 min.',
    precio: 2600,
    category: 'styling-pestañas',
    cardImg: "assets/img/permanente-pestañas.PNG",
},
{
    id: 7,
    name: 'Bozo',
    tiempo: '5 min.',
    precio: 600,
    category: 'threading',
    cardImg: "assets/img/bozo.PNG",
},
{
    id: 8,
    name: 'Mejillas',
    tiempo: '10 min.',
    precio: 600,
    category: 'threading',
    cardImg: "assets/img/mejillas.PNG",
},
{
    id: 9,
    name: 'Mentón',
    tiempo: '10 min.',
    precio: 600,
    category: 'threading',
    cardImg: "assets/img/menton.PNG",
},
{
    id: 10,
    name: 'Tinte de cejas',
    tiempo: '15 min.',
    precio: 900,
    category: 'styling-cejas',
    cardImg: "assets/img/tinte-cejas.PNG",
},
{
    id: 11,
    name: 'Patillas',
    tiempo: '10 min.',
    precio: 600,
    category: 'threading',
    cardImg: "assets/img/patillas.PNG",
},
{
    id: 12,
    name: 'Tinte de pestañas',
    tiempo: '15 min.',
    precio: 900,
    category: 'styling-pestañas',
    cardImg: "assets/img/tinte-pestañas.PNG",
},
];

function splitProducts(size) {
    let chunk = [];
    for (let i = 0; i < productsData.length; i += size)
      chunk.push(productsData.slice(i, i + size));
    return chunk;
};
  
  const allProducts = {
    productList: splitProducts(6),
    next: 1,
    limit: splitProducts(6).length,
  };