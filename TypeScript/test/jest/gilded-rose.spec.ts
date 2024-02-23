import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("should decrease quality and sellIn for normal items", () => {
    const gildedRose = new GildedRose([new Item("normal item", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(19);
    expect(items[0].sellIn).toBe(9);
  });

  it('"Sulfuras" should never decrease in quality or sellIn', () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 10, 80),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(10);
  });

  it('should increase the quality of "Aged Brie" over time', () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
    expect(items[0].sellIn).toBe(9);
  });

  it("should not increase the quality of an item over 50", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it('should degrade "Conjured" items quality twice as fast as normal items', () => {
    const gildedRose = new GildedRose([new Item("Conjured", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
    expect(items[0].sellIn).toBe(9);
  });

  it('should increase the quality of "Backstage passes" as its sellIn approaches', () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 12, 20),
    ]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);

    gildedRose.items[0].sellIn = 11;
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(23);

    gildedRose.items[0].sellIn = 6;
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(26);
  });

  it("should decrease quality of normal item twice as fast once the sell by date has passed", () => {
    const gildedRose = new GildedRose([new Item("normal item", 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
    expect(items[0].sellIn).toBe(-1);
  });
});
