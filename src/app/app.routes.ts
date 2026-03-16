import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'shop',
    loadComponent: () => import('./pages/shop/shop'),
    children: [
      {
        path: 'reproductions',
        loadComponent: () => import('./pages/reproductions/reproductions'),
        children: [],
        // data: {
        //   icon: '@tui.tent-tree',
        // },
      },
      {
        path: 'favourites',
        loadComponent: () => import('./pages/wishlist/wishlist'),
        // data: {
        //   icon: '@tui.trending-up-down',
        //   badgeAmount: 3,
        // },
      },
    ],
  },

  {
    path: '',
    redirectTo: '/shop/reproductions',
    pathMatch: 'full',
  },
];
