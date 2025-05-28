import conf from "../conf/conf";
import { Account, Client, ID } from "appwrite"

export class Authservice {

    client=new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client)

    }

    async createAccount({ email, password, name }) {
        try {
            const useraccount = await this.account.create(ID.unique(), email, password, name)

            if (useraccount) {
                return this.login({ email, password })
            }

        } catch (error) {
            throw error
        }
    }

    async login({ email, password }) {
        try {

            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("Error is :", error)
        }
    }


    async getcurrentUser() {
        try {

            return await this.account.get()
        } catch (error) {
            throw error
        }

    }

    async logout() {

        try {
            await this.account.deleteSessions()
        } catch (error) {

        }
    }

}

const authservice = new Authservice()

export default authservice
