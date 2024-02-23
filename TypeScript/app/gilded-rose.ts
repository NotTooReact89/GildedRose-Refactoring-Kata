export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
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

  private increaseQuality = (item: Item, amount: number): void => {
    if (item.quality < 50) {
      item.quality += amount;
    }
  };

  private decreaseQuality = (item: Item, amount: number): void => {
    if (item.quality > 0) {
      item.quality -= amount;
    }
  };

  private updateSellIn = (item: Item): void => {
    item.sellIn -= 1;
  };

  private updateQualityForItem = (item: Item): void => {
    switch (item.name) {
      case "Aged Brie":
        this.increaseQuality(item, 1);
        break;
      case "Conjured":
        this.decreaseQuality(item, 2);
        break;
      default:
        this.decreaseQuality(item, 1);
    }
  };

  updateQuality = (): Item[] => {
    this.items.forEach((item) => {
      if (item.name === "Sulfuras, Hand of Ragnaros") {
        return; // Skip "Sulfuras" as its quality and sell-in don't change
      }

      this.updateSellIn(item);
      this.updateQualityForItem(item);
    });

    return this.items;
  };

  // @TODO: To be removed once refactor is complete. Reference point!
  // updateQuality() {
  //   for (let i = 0; i < this.items.length; i++) {
  //     if (
  //       this.items[i].name != "Aged Brie" &&
  //       this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
  //     ) {
  //       if (this.items[i].quality > 0) {
  //         if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
  //           this.items[i].quality = this.items[i].quality - 1;
  //         }
  //       }
  //     } else {
  //       if (this.items[i].quality < 50) {
  //         this.items[i].quality = this.items[i].quality + 1;
  //         if (
  //           this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
  //         ) {
  //           if (this.items[i].sellIn < 11) {
  //             if (this.items[i].quality < 50) {
  //               this.items[i].quality = this.items[i].quality + 1;
  //             }
  //           }
  //           if (this.items[i].sellIn < 6) {
  //             if (this.items[i].quality < 50) {
  //               this.items[i].quality = this.items[i].quality + 1;
  //             }
  //           }
  //         }
  //       }
  //     }
  //     if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
  //       this.items[i].sellIn = this.items[i].sellIn - 1;
  //     }
  //     if (this.items[i].sellIn < 0) {
  //       if (this.items[i].name != "Aged Brie") {
  //         if (
  //           this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
  //         ) {
  //           if (this.items[i].quality > 0) {
  //             if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
  //               this.items[i].quality = this.items[i].quality - 1;
  //             }
  //           }
  //         } else {
  //           this.items[i].quality =
  //             this.items[i].quality - this.items[i].quality;
  //         }
  //       } else {
  //         if (this.items[i].quality < 50) {
  //           this.items[i].quality = this.items[i].quality + 1;
  //         }
  //       }
  //     }
  //   }

  // return this.items;
  // }
}
