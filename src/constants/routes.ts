export const authRoutes = {
  LoginScreen: 'LoginScreen',
  RegisterScreen: 'RegisterScreen',
};

export const appRoutes = {
  Dashboard: 'Dashboard',
  Profile: 'Profile',
  AddProduct: 'AddProduct',
  Cart: 'Cart',
  AppStackNavigator: 'AppStackNavigator',
  ProfileStackNavigator: 'ProfileStackNavigator',
  BottomTabNavigator: 'BottomTabNavigator',
  MainNavigator: 'MainNavigator',
};

export const excludeTabBar = [appRoutes.AddProduct, appRoutes.Cart];
