export type Product = {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
};

export type RootStackParamList = {
  ProductList: { successMessage: string } | undefined;
  ProductDetail: { product: Product };
  AddProduct: undefined;
};
