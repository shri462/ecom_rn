import {ID, Client, Databases, Storage, Query} from 'appwrite';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';

const appwriteClient = new Client();

const APPWRITE_ENDPOINT: string = Config.APPWRITE_URL!;
const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID!;
const APPWRITE_DATABASE_ID: string = Config.APPWRITE_DATABASE_ID!;
const APPWRITE_COLLECTION_ID_ORDERS: string =
  Config.APPWRITE_COLLECTION_ID_ORDERS!;

type OrderItems = {
  amount: number;
  userId: string;
  products: string[];
};

class OrderService {
  database;

  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);

    this.database = new Databases(appwriteClient);
  }

  async createOrder({userId, amount, products}: OrderItems) {
    const id = ID.unique();
    try {
      return await this.database.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID_ORDERS,
        id,
        {amount, userId, products},
      );
    } catch (error) {
      Toast.show({
        type: 'customToast',
        props: {
          isError: true,
          message: String(error),
        },
      });
      console.log('Appwrite service :: createOrder() :: ' + error);
      return false;
    }
  }

  async getOrders(userId: string) {
    try {
      return await this.database.listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID_ORDERS,
        // queries,
        [Query.equal('userId', userId)],
      );
    } catch (error) {
      console.log('Appwrite serive :: getOrders :: error', error);
      return false;
    }
  }
}

const orderService = new OrderService();

export default orderService;
