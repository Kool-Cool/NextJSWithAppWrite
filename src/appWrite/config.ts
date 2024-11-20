import conf from "@/conf/config";
import { Client, Account, ID } from "appwrite";



type CreatUserAccount = {
    email: string,
    password: string,
    name: string,
}

type LoginUserAccount = {
    email: string,
    password: string,
}


const appWriteClient = new Client()

appWriteClient.setEndpoint(conf.appWriteUrl).setProject(conf.appWriteProjectId)


export const appWriteAccount = new Account(appWriteClient)


export class AppWriteService {
    // create a new record of user inside AppWrite

    async createUserAccount({ email, password, name }: CreatUserAccount) {
        try {
            const userAccount = await appWriteAccount.create(ID.unique(), email, password, name)


            if (userAccount) {
                return this.login({email , password})
            } else {
                return userAccount

            }
        } catch (error: any) {
            throw error
        }
    }

    async login( {email , password}:LoginUserAccount){
        try {
            return await appWriteAccount.createEmailPasswordSession(email, password)
        } catch (error: any) {
            throw error

        }
    }

    async isLoggedIn(): Promise<boolean> {

        try {
            const data = await this.getCurrentUser();
            return Boolean(data)
        } catch (error) {

        }


        return false
    }

    async getCurrentUser() {
        try {
            return appWriteAccount.get()
        } catch (error: any) {
            console.log("getCurrentUser error:  " + error);
        }
        return null
    }

    async logout() {
        try {
            return await appWriteAccount.deleteSession("current")
        } catch (error) {
            console.log("logout error:   " + error)
        }
    }

}

const appwriteService = new AppWriteService()

export default appwriteService