import type { Head } from '../types'


interface CartItem {
  head: Head,
  count: number,
}


export default class ShoppingCart {

  items: Map<string, CartItem>

  constructor() {
    this.items = new Map<string, CartItem>();
  }

  addItem(head: Head, count: number = 1) {
    const existing = this.items.get(head.uuid);
    existing ? existing.count += count : this.items.set(head.uuid, { head, count });
  }

  removeItem(head: Head, count: number = 1) {
    const existing = this.items.get(head.uuid);
    if (!existing) return;
    existing.count -= count;
    if (existing.count < 1) this.items.delete(head.uuid);
  }

  clearItem(head: Head) {
    this.items.delete(head.uuid);
  }

  clear() {
    this.items.clear();
  }

  get size() {
    return this.items.size;
  }

  get totalItemSize() {
    return Array.from(this.items.values()).reduce((sum, item) => sum + item.count, 0);
  }

  get totalPrice() {
    return [...this.items.values()].reduce((total, { head, count }) => total + (head.price * count), 0);
  }

  exportData() {
    const exportData: Record<string, number> = {};
    this.items.forEach((value, key) => {
      exportData[key] = value.count;
    });
    return JSON.stringify(exportData);
  }

}