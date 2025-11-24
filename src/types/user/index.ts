interface MenuItemType {
  name: string,
  icon: string,
  url: string,
  children?: MenuItemType[]
}

export type {MenuItemType}
