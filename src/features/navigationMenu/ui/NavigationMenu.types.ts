interface NavigationMenuItem {
  path: string
  icon: string
  text: string
}

export interface NavigationMenu {
  nav: NavigationMenuItem[]
}
