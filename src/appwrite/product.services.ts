import {ID, Account, Client, Databases, Query, Storage} from 'appwrite';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import RNFS from 'react-native-fs';
import storage from '@react-native-firebase/storage';

const appwriteClient = new Client();

const APPWRITE_ENDPOINT: string = Config.APPWRITE_URL!;
const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID!;
const APPWRITE_DATABASE_ID: string = Config.APPWRITE_DATABASE_ID!;
const APPWRITE_COLLECTION_ID_PRODUCTS: string =
  Config.APPWRITE_COLLECTION_ID_PRODUCTS!;
const APPWRITE_BUCKET_ID: string = Config.APPWRITE_BUCKET_ID!;

type CreateProduct = {
  name: string;
  price: number;
  image: string;
  brandName: string;
  userId: string;
  sizes: number[];
};
type UpdateProduct = CreateProduct & {
  id: string;
};

class ProductService {
  database;
  bucket;

  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);

    this.database = new Databases(appwriteClient);
    this.bucket = new Storage(appwriteClient);
  }

  async createProduct({
    name,
    price,
    image,
    brandName,
    userId,
    sizes,
  }: CreateProduct) {
    const id = ID.unique();
    try {
      return await this.database.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID_PRODUCTS,
        id,
        {
          name,
          price,
          image,
          brandName,
          userId,
          sizes,
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
      console.log('Appwrite service :: createProduct() :: ' + error);
    }
  }

  async updateProduct({
    name,
    price,
    image,
    brandName,
    userId,
    id,
  }: UpdateProduct) {
    try {
      return await this.database.updateDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID_PRODUCTS,
        id,
        {
          name,
          price,
          image,
          brandName,
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
      console.log('Appwrite service :: updateProduct() :: ' + error);
    }
  }

  //   TODO: add, queries = [Query.equal("status", "active")]
  async getProducts() {
    try {
      return await this.database.listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID_PRODUCTS,
        // queries,
      );
    } catch (error) {
      console.log('Appwrite serive :: getProducts :: error', error);
      return false;
    }
  }

  async uploadFile(data) {
    const filename = data.path.split('/')?.[data.path.split('/')?.length - 1];
    console.log(filename);
    let reference = storage().ref(filename); // 2

    try {
      const res = await reference.putFile(data.path);
      return res;
    } catch (error) {
      return false;
    }

    // try {
    //   const file = {
    //     path: data.path,
    //     type: 'image/jpeg',
    //     name: 'name.jpg',
    //   };
    //   const res = await this.bucket.createFile(
    //     APPWRITE_BUCKET_ID,
    //     ID.unique(),
    //     file,
    //   );
    //   console.log(res);
    //   return res;
    // } catch (error) {
    //   console.log('Appwrite serive :: uploadFile :: error', error);
    //   return false;
    // }
  }

  async getFile(fileId: string) {
    return await this.bucket.getFile(APPWRITE_BUCKET_ID, fileId);
  }
}

const productService = new ProductService();

export default productService;
