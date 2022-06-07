const items = require('../data/items.json');

module.exports = {
  getRandomItem() {
    const num = Math.floor(Math.random() * items.length);
    const item = items[num];
    items.splice(num, 1);
    return item;
  },
};
