const fs = require('fs');
const Items = require('warframe-items');

function shortRelicName (name) {
  return name.substring(0, name.length - 'intact'.length - 1);
}

const relics = new Items({
  category: ['Relics']
})
  .filter((relics) => relics.name.toLowerCase().indexOf('intact') > -1)
  .map((relic) => {
    relic.name = shortRelicName(relic.name)
    return relic;
  })
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
          const res = relics[shortRelicName(drop.location)];
          return {
            name: res.name
          }; //relics
        })
        .filter((drop) => drop !== undefined);

      return {
        name: com.name,
        itemCount: com.itemCount,
        imageName: com.imageName,
        uniqueName: com.uniqueName,
        drops: com.drops,
      }; // components
    })
      .filter((com) => com)

    item.components = newComps;
    item.obtainable = newComps.some((comp) => {
      return comp.drops.some((comRelics) => {
        const relic = relics[comRelics.name];
        return relic && relic.drops && relic.drops.length;
      })
    });

    return {
      name: item.name,
      category: item.category,
      obtainable: item.obtainable,
      imageName: item.imageName,
      uniqueName: item.uniqueName,
      components: item.components,
    }; // items
  });


fs.writeFileSync('./src/primeData.js',
  `export const data = ${JSON.stringify(items)}`
);