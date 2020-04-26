const fs = require('fs');
const Items = require('warframe-items');

const relics = new Items({
  category: ['Relics']
})
  .filter((relics) => relics.name.toLowerCase().indexOf('intact') > -1)
  .reduce((a, b) => (a[b.name] = b, a), {});

const items = new Items({
  category: ['Archwing', 'Arch-Gun', 'Arch-Melee', 'Melee', 'Pets', 'Primary', 'Secondary', 'Sentinels', 'Warframes']
})
  .filter((item) => item.name.toLowerCase().indexOf('prime') > -1)
  .filter((item) => item.components)
  .map((item) => {
    const newComps = item.components.map((com) => {
      com.drops = com.drops
        .filter((drop) => drop.location.toLowerCase().indexOf('intact') > -1)
        .map((drop) => {
          const res = relics[drop.location];
          return res;
        })
        .filter((drop) => drop !== undefined);

      return com;
    })
      .filter((com) => com)

    item.components = newComps;
    item.obtainable = newComps.some((comp) => comp.drops.some((relics) => relics.drops && relics.drops.length > 0));

    return item;
  });


fs.writeFileSync('./src/primeData.js',
  `export default ${JSON.stringify(items)}`
);