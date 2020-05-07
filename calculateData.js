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
          return {
            name: res.name.substring(0, res.name.length - 'intact'.length - 1)
          }; //relics
        })
        .filter((drop) => drop !== undefined);

      return {
        name: com.name,
        itemCount: com.itemCount,
        imageName: com.imageName,
        uniqueName: com.uniqueName,
        drops: com.drops
      }; // components
    })
      .filter((com) => com)

    item.components = newComps;
    item.obtainable = newComps.some((comp) => comp.drops.some((relics) => relics.drops && relics.drops.length > 0));

    return {
      name: item.name,
      obtainable: item.obtainable,
      imageName: item.imageName,
      uniqueName: item.uniqueName,
      components: item.components
    }; // items
  });


fs.writeFileSync('./src/primeData.js',
  `export const data = ${JSON.stringify(items)}`
);