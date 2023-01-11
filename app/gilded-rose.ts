interface ItemTypes {
  name: string;
  sellIn: number;
  quality: number;
}

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor({ name, sellIn, quality }: ItemTypes) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let newQuality: number; //Variable used amognst all cases in order to prevent negative or over 50 quality values

      //Aged Brie
      /***************************************************************************************************/
      if (this.items[i].name.toLowerCase().includes("aged brie")) {
        newQuality = this.items[i].quality + 1; //Increase by 1

        newQuality > 50 //Limit to 50
          ? (this.items[i].quality = 50)
          : (this.items[i].quality += 1);

        this.items[i].sellIn -= 1; //Reduce sell date
        continue;
      }
      /***************************************************************************************************/

      //Sulfuras
      /***************************************************************************************************/
      else if (this.items[i].name.toLowerCase().includes("sulfuras")) {
        continue; //Do not modify anything
      }
      /***************************************************************************************************/

      //Backstage Passes
      /***************************************************************************************************/
      else if (this.items[i].name.toLowerCase().includes("backstage passes")) {
        //Sell date under 10 and above 5 days
        if (this.items[i].sellIn <= 10 && this.items[i].sellIn > 5) {
          newQuality = this.items[i].quality + 2; //Increase by 2

          newQuality > 50 //Limit to 50
            ? (this.items[i].quality = 50)
            : (this.items[i].quality += 2);

          this.items[i].sellIn -= 1; //Reduce sell date
          continue;
        }
        //Sell date under 5 and above 0 days
        else if (this.items[i].sellIn <= 5 && this.items[i].sellIn > 0) {
          newQuality = this.items[i].quality + 3; //Increase by 3

          newQuality > 50 //Limit to 50
            ? (this.items[i].quality = 50)
            : (this.items[i].quality += 3);

          this.items[i].sellIn -= 1; //Reduce sell date
          continue;
        }
        //Sell date under or equal to 0
        else if (this.items[i].sellIn <= 0) {
          this.items[i].quality = 0; //Set quality to 0
          this.items[i].sellIn -= 1; //Reduce sell date
          continue;
        }
        //Sell date above 10 days
        else {
          newQuality = this.items[i].quality + 1; //Increase by 1

          newQuality > 50 //Limit to 50
            ? (this.items[i].quality = 50)
            : (this.items[i].quality += 1);

          this.items[i].sellIn -= 1; //Reduce sell date
          continue;
        }
      }
      /***************************************************************************************************/

      //Conjured
      /***************************************************************************************************/
      else if (this.items[i].name.toLowerCase().includes("conjured")) {
        //Sell date under or equal to 0
        if (this.items[i].sellIn <= 0) {
          newQuality = this.items[i].quality - 4; //Normal item degrates by 2, conjured items doubled to 4

          newQuality < 0 //No negative quality
            ? (this.items[i].quality = 0)
            : (this.items[i].quality -= 4);

          this.items[i].sellIn -= 1; //Reduce sell date
          continue;
        } else {
          newQuality = this.items[i].quality - 2; //Normal item degrates by 1, conjured items doubled to 2

          newQuality < 0 //No negative quality
            ? (this.items[i].quality = 0)
            : (this.items[i].quality -= 2);

          this.items[i].sellIn -= 1; //Reduce sell date
          continue;
        }
      }
      /***************************************************************************************************/

      //Normal Items
      /***************************************************************************************************/
      else {
        //Sell date under or equal to 0
        if (this.items[i].sellIn <= 0) {
          newQuality = this.items[i].quality - 2; //Subtract by 2

          newQuality < 0 //No negative quality
            ? (this.items[i].quality = 0)
            : (this.items[i].quality -= 2);

          this.items[i].sellIn -= 1; //Reduce sell date
          continue;
        }
        //Sell date above 0
        else {
          newQuality = this.items[i].quality - 1; //Subtract normally by 1

          newQuality < 0 //No negative quality
            ? (this.items[i].quality = 0)
            : (this.items[i].quality -= 1);

          this.items[i].sellIn -= 1; //Reduce sell date
          continue;
        }
      }
      /***************************************************************************************************/
    }

    //Return modified items
    return this.items;
  }
}
