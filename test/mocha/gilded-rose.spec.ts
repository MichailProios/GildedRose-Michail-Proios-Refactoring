import { expect } from "chai";
import { Item, GildedRose } from "@/gilded-rose";

describe("GildedRose", () => {
  describe("constructor", () => {
    it("should initialize an empty items array when no items are provided", () => {
      const gildedRose = new GildedRose();
      expect(gildedRose.items).to.be.an("array").that.is.empty;
    });

    it("should initialize the items array with the provided items", () => {
      const items = [
        new Item({ name: "+5 Dexterity Vest", sellIn: 10, quality: 20 }),
      ];
      const gildedRose = new GildedRose(items);
      expect(gildedRose.items).to.deep.equal(items);
    });
  });

  describe("updateQuality()", () => {
    it("should lower the sellIn value by 1 for all items", () => {
      const items = [
        new Item({ name: "+5 Dexterity Vest", sellIn: 10, quality: 20 }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(9);
    });

    it("should lower the quality value by 1 for all items", () => {
      const items = [
        new Item({ name: "+5 Dexterity Vest", sellIn: 10, quality: 20 }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(19);
    });

    it("should lower the quality value by 2 for all items after the sell by date has passed", () => {
      const items = [
        new Item({ name: "+5 Dexterity Vest", sellIn: 0, quality: 20 }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(18);
    });

    it("should not allow quality to be negative for any item", () => {
      const items = [
        new Item({ name: "+5 Dexterity Vest", sellIn: 10, quality: 0 }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
    });

    it("should increase Aged Brie's quality as it gets older", () => {
      const items = [new Item({ name: "Aged Brie", sellIn: 2, quality: 0 })];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(1);
    });

    it("should not allow the quality of any item to be more than 50", () => {
      const items = [new Item({ name: "Aged Brie", sellIn: 2, quality: 50 })];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });

    it("should not change Sulfuras' sellIn and quality values", () => {
      const items = [
        new Item({
          name: "Sulfuras, Hand of Ragnaros",
          sellIn: 0,
          quality: 80,
        }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(0);
      expect(items[0].quality).to.equal(80);
    });

    it("should increase Backstage Passes' quality by 2 when sellIn is less than or equal to 10", () => {
      const items = [
        new Item({
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 10,
          quality: 20,
        }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(22);
    });

    it("should increase Backstage Passes' quality by 3 when sellIn is less than or equal to 5", () => {
      const items = [
        new Item({
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 5,
          quality: 20,
        }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(23);
    });

    it("should set Backstage Passes' quality to 0 after the concert", () => {
      const items = [
        new Item({
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 0,
          quality: 20,
        }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
    });

    it("should decrease Conjured items' quality twice as fast", () => {
      const items = [
        new Item({ name: "Conjured Mana Cake", sellIn: 3, quality: 6 }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(4);
    });

    it("should decrease the quality of an item by 2 when sellIn is 0 and the item is not Aged Brie, Sulfuras, or Backstage Passes", () => {
      const items = [
        new Item({ name: "+5 Dexterity Vest", sellIn: 0, quality: 20 }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(18);
    });

    it("should decrease the quality of a Conjured item by 4 when sellIn is 0", () => {
      const items = [
        new Item({ name: "Conjured Mana Cake", sellIn: 0, quality: 6 }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(2);
    });

    it("should not change Sulfuras' sellIn and quality values, even when sellIn is negative", () => {
      const items = [
        new Item({
          name: "Sulfuras, Hand of Ragnaros",
          sellIn: -1,
          quality: 80,
        }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(-1);
      expect(items[0].quality).to.equal(80);
    });

    it("should set Backstage Passes' quality to 0 when sellIn is 0", () => {
      const items = [
        new Item({
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 0,
          quality: 20,
        }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
    });

    it("should decrease Backstage Passes' sellIn value by 1 and increase the quality value by 1 when sellIn is above 10", () => {
      const items = [
        new Item({
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 11,
          quality: 20,
        }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(10);
      expect(items[0].quality).to.equal(21);
    });
    it("should increase Backstage Passes' quality by 2 when sellIn is less than or equal to 10 and greater than 5 and quality is 49", () => {
      const items = [
        new Item({
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 10,
          quality: 49,
        }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });

    it("should increase Backstage Passes' quality by 3 when sellIn is less than or equal to 5 and greater than 0 and quality is 49", () => {
      const items = [
        new Item({
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 5,
          quality: 49,
        }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });

    it("should decrease the quality of a Conjured item by 4 when sellIn is 0, and by 2 when sellIn is greater than 0", () => {
      const items = [
        new Item({ name: "Conjured Mana Cake", sellIn: 0, quality: 6 }),
        new Item({ name: "Conjured Mana Cake", sellIn: 5, quality: 6 }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(2);
      expect(items[1].quality).to.equal(4);
    });

    it("should prevent Conjured items' quality from being negative", () => {
      const items = [
        new Item({ name: "Conjured Mana Cake", sellIn: 0, quality: 0 }),
        new Item({ name: "Conjured Mana Cake", sellIn: 5, quality: 0 }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
      expect(items[1].quality).to.equal(0);
    });

    it("should prevent Normal items' quality from being negative", () => {
      const items = [
        new Item({ name: "+5 Dexterity Vest", sellIn: 0, quality: 0 }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
    });

    it("should prevent items' quality from being more than 50", () => {
      const items = [new Item({ name: "Aged Brie", sellIn: 2, quality: 50 })];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });

    it("should decrease Conjured items' quality twice as fast as normal items", () => {
      const items = [
        new Item({ name: "Conjured Mana Cake", sellIn: 3, quality: 6 }),
        new Item({ name: "+5 Dexterity Vest", sellIn: 10, quality: 20 }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(4);
      expect(items[1].quality).to.equal(19);
    });

    it("should increase Backstage Passes' quality by 3 when sellIn is less than or equal to 5", () => {
      const items = [
        new Item({
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 5,
          quality: 20,
        }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(23);
    });

    it("should decrease the quality of non-legendary items twice as fast after sellIn date has passed", () => {
      const items = [
        new Item({ name: "+5 Dexterity Vest", sellIn: 0, quality: 20 }),
        new Item({ name: "Elixir of the Mongoose", sellIn: -1, quality: 7 }),
        new Item({ name: "Conjured Mana Cake", sellIn: -1, quality: 6 }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(18);
      expect(items[1].quality).to.equal(5);
      expect(items[2].quality).to.equal(2);
    });

    it("should decrease the sellIn value of all items by 1 after each update", () => {
      const items = [
        new Item({ name: "Aged Brie", sellIn: 2, quality: 0 }),
        new Item({ name: "Elixir of the Mongoose", sellIn: 5, quality: 7 }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(1);
      expect(items[1].sellIn).to.equal(4);
    });

    it("should decrease the quality of non-legendary items by 1 before the sellIn date", () => {
      const items = [
        new Item({ name: "+5 Dexterity Vest", sellIn: 10, quality: 20 }),
        new Item({ name: "Elixir of the Mongoose", sellIn: 5, quality: 7 }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(19);
      expect(items[1].quality).to.equal(6);
    });

    it("should never decrease the quality of Sulfuras", () => {
      const items = [
        new Item({
          name: "Sulfuras, Hand of Ragnaros",
          sellIn: 0,
          quality: 80,
        }),
        new Item({
          name: "Sulfuras, Hand of Ragnaros",
          sellIn: -1,
          quality: 80,
        }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(80);
      expect(items[1].quality).to.equal(80);
    });

    it("should decrease the quality of Conjured items by 2 before the sellIn date", () => {
      const items = [
        new Item({ name: "Conjured Mana Cake", sellIn: 3, quality: 6 }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(4);
    });

    it("should decrease the quality of Conjured items by 4 after the sellIn date", () => {
      const items = [
        new Item({ name: "Conjured Mana Cake", sellIn: 0, quality: 6 }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(2);
    });

    it("should decrease Backstage Passes' quality to 0 after sellIn date", () => {
      const items = [
        new Item({
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 0,
          quality: 20,
        }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
    });

    it("should limit Backstage Passes' quality to 50 when sellIn is above 10 and quality is greater than 50", () => {
      const items = [
        new Item({
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 15,
          quality: 55,
        }),
      ];
      const gildedRose = new GildedRose(items);
      gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });
  });
});
