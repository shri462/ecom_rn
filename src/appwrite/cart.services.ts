import {ID, Client, Databases, Storage, Query} from 'appwrite';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import storage from '@react-native-firebase/storage';

const appwriteClient = new Client();

const APPWRITE_ENDPOINT: string = Config.APPWRITE_URL!;
const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID!;
const APPWRITE_DATABASE_ID: string = Config.APPWRITE_DATABASE_ID!;
const APPWRITE_COLLECTION_ID_PRODUCTS: string =
  Config.APPWRITE_COLLECTION_ID_PRODUCTS!;
const APPWRITE_COLLECTION_ID_CART: string = Config.APPWRITE_COLLECTION_ID_CART!;

type CartProduct = {
  selectedSize: number;
  productId: string;
  userId: string;
  productPrice: number;
  brandName: string;
  productName: string;
};
type UpdateCart = CartProduct & {
  id: string;
};

class CartService {
  database;

  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);

    this.database = new Databases(appwriteClient);
  }

  async addProductToCart({
    productId,
    selectedSize,
    userId,
    productPrice,
    brandName,
    productName,
  }: CartProduct) {
    const id = ID.unique();
    try {
      return await this.database.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID_CART,
        id,
        {
          productId,
          selectedSize,
          userId,
          productPrice,
          brandName,
          productName,
        },
      );
    } catch (error) {
      Toast.show({
        type: 'customToast',
        props: {
          isError: true,
          message: String(error),
        },
      });
      console.log('Appwrite service :: addProductToCart() :: ' + error);
      return false;
    }
  }

  async updateCart({productId, selectedSize, userId, id}: UpdateCart) {
    try {
      return await this.database.updateDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID_CART,
        id,
        {
          productId,
          selectedSize,
          userId,
        },
      );
    } catch (error) {
      Toast.show({
        type: 'customToast',
        props: {
          isError: true,
          message: String(error),
        },
      });
      console.log('Appwrite service :: updateCart() :: ' + error);
    }
  }

  async deleteProductFromCart(id: string) {
    try {
      return await this.database.deleteDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID_CART,
        id,
      );
    } catch (error) {
      Toast.show({
        type: 'customToast',
        props: {
          isError: true,
          message: String(error),
        },
      });
      console.log('Appwrite service :: updateCart() :: ' + error);
      return false;
    }
  }

  async getProductsInCart(userId: string) {
    try {
      return await this.database.listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID_CART,
        // queries,
        [Query.equal('userId', userId)],
      );
    } catch (error) {
      console.log('Appwrite serive :: getProductsInCart :: error', error);
      return false;
    }
  }
}

const cartService = new CartService();

export default cartService;
