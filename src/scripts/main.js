'use strict';

import { productsData } from './data';

const productsTransform = (products) => {
  let allProducts = [];

  products.forEach(product => {
    allProducts = [...allProducts, ...product.group];
  });

  const transformedProducts = allProducts.map((object, index) => {
    const newObject = {};

    newObject.id = [{
      text: object.productUrl[0].text.match(/\d+/g).join(''),
    }];

    newObject.productUrl = [{
      text: `https://www.metro.ca${object.productUrl[0].text}`,
    }];

    newObject.rank = [{
      text: +index + 1,
    }];

    if (object.price && object.price[0] && object.price[0].text) {
      newObject.price = [{
        text: +object.price[0].text
          .match(/[\d\.,]/g)
          .join('')
          .replace(/,/, '.'),
      }];
    }

    return newObject;
  });

  return transformedProducts;
}

const products = productsTransform(productsData);
const listBox = document.querySelector('#products');

const parseList = (container, goods) => {
  const ol = document.createElement('ol');

  for (const good of goods) {
    const li = document.createElement('li');

    li.innerHTML = `
      <p>ID: ${good.id[0].text}</p>
      <p>Price: ${good.price? good.price[0].text: '-'}</p>
      <p>Link: ${good.productUrl[0].text}</p>
    `;

    ol.append(li);
  }

  container.append(ol);
}

parseList(listBox, products);
