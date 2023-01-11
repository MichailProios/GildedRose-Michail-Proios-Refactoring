import { Item, GildedRose } from "../app/gilded-rose";

//Changed the parameter of the constructor for easier type safety
const items = [
  new Item({ name: "+5 Dexterity Vest", sellIn: 10, quality: 20 }),
  new Item({ name: "Aged Brie", sellIn: 2, quality: 0 }),
  new Item({ name: "Elixir of the Mongoose", sellIn: 5, quality: 7 }),
  new Item({ name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 }),
  new Item({ name: "Sulfuras, Hand of Ragnaros", sellIn: -1, quality: 80 }),
  new Item({
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 15,
    quality: 20,
  }),
  new Item({
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 10,
    quality: 49,
  }),
  new Item({
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 5,
    quality: 49,
  }),
  new Item({ name: "Conjured Mana Cake", sellIn: 3, quality: 6 }),
];

const gildedRose = new GildedRose(items);

let days: number = 2;
if (process.argv.length > 2) {
  days = +process.argv[2];
}

for (let i = 0; i < days; i++) {
  // Changed output format for better readability
  console.log(`-------- day ${i} --------`);
  console.table(items, ["name", "sellIn", "quality"]);
  console.log();
  gildedRose.updateQuality();
}
