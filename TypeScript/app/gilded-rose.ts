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

  // Dedicated function as there are multiple scenarios to cover
  private updateBackstagePassQuality = (item: Item): void => {
    if (item.sellIn < 0) {
      item.quality = 0;
    } else if (item.sellIn < 6) {
      this.increaseQuality(item, 3);
    } else if (item.sellIn < 11) {
      this.increaseQuality(item, 2);
    } else {
      this.increaseQuality(item, 1);
    }
  };

  private updateQualityForItem = (item: Item): void => {
    switch (item.name) {
      case "Aged Brie":
        this.increaseQuality(item, 1);
        break;
      case "Backstage passes to a TAFKAL80ETC concert":
        this.updateBackstagePassQuality(item);
        break;
      case "Conjured":
        this.decreaseQuality(item, 2);
        break;
      default:
        this.decreaseQuality(item, 1);
    }
  };

  private handleExpired = (item: Item): void => {
    switch (item.name) {
      case "Aged Brie":
        this.increaseQuality(item, 1); // Continue to increase quality by 1 even after expiration
        break;
      case "Backstage passes to a TAFKAL80ETC concert":
        item.quality = 0; // Quality drops to 0 after the concert
        break;
      case "Conjured":
        this.decreaseQuality(item, 2); // "Conjured" items degrade twice as fast, so double the degradation post-expiration
        break;
      default:
        this.decreaseQuality(item, 1); // Normal items degrade twice as fast post-expiration
    }
  };

  updateQuality = (): Item[] => {
    this.items.forEach((item) => {
      if (item.name === "Sulfuras, Hand of Ragnaros") {
        return; // Skip "Sulfuras" as its quality and sell-in don't change
      }

      this.updateSellIn(item);
      this.updateQualityForItem(item);

      if (item.sellIn < 0) {
        this.handleExpired(item);
      }
    });

    return this.items;
  };
}
