import {ID, Account, Client} from 'appwrite';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';

const appwriteClient = new Client();

const APPWRITE_ENDPOINT: string = Config.APPWRITE_URL!;
const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID!;

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};
type LoginUserAccount = {
  email: string;
  password: string;
};

class AuthService {
  account;

  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);

    this.account = new Account(appwriteClient);
  }

  //create a new record of user inside appwrite

  async createAccount({email, password, name}: CreateUserAccount) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        //TODO: create login feature
        return this.login({email, password});
      } else {
        return userAccount;
      }
    } catch (error) {
      Toast.show({
        type: 'customToast',
        props: {
          isError: true,
          message: String(error),
        },
      });
      console.log('Appwrite service :: createAccount() :: ' + error);
    }
  }

  async updatePrefs(isAdmin: boolean) {
    try {
      return await this.account.updatePrefs({
        role: isAdmin ? 'admin' : 'user',
      });
    } catch (error) {
      Toast.show({
        type: 'customToast',
        props: {
          isError: true,
          message: String(error),
        },
      });
      console.log('Appwrite service :: updatePrefs() :: ' + error);
    }
  }

  async login({email, password}: LoginUserAccount) {
    console.log(email, password);
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      Toast.show({
        type: 'customToast',
        props: {
          isError: true,
          message: String(error),
        },
      });
      console.log('Appwrite service :: loginAccount() :: ' + error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log('Appwrite service :: getCurrentAccount() :: ' + error);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession('current');
    } catch (error) {
      console.log('Appwrite service :: getCurrentAccount() :: ' + error);
    }
  }
}

const authService = new AuthService();

export default authService;
