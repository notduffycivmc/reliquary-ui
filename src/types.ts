export interface Head {
  uuid: string,
  name: string,
  rarity: string,
  price: number
  quantity: number,
  tags: string[]
}

export interface PricingChipProps {
  head: Head,
  onAdd: (resource: 'diamond' | 'iron', amount: number) => void;
}
