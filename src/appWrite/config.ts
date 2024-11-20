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
        } catch (error) {
            throw error
        }
    }

    async login( {email , password}:LoginUserAccount){

    }
}