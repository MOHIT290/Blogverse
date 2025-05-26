import conf from "../conf/conf";

import { Client, ID, Databases, Storage, Query } from "appwrite"

export class Databaseservice {

    client = new Client()
    databases
    bucket
    constructor() {

        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)

    }

    async createPost({ title, slug, content, Image, status, userId }) {

        try {

            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title, content, Image, status, userId
                }
            )

        } catch (error) {
            throw error
        }

    }

    async updatePost(slug, { title, content, Image, status }) {
        try {

            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content, Image, status
                }
            )

        } catch (error) {
            throw error
        }

    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

            return true
        }
        catch (error) {
            throw error
        }
    }

    async getPost(slug) {
        try {

            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

        }

        catch (error) {
            console.log("Appwrite sevice ", error)
        }

    }

    // async getPosts(queries = [Query.equal("status", "active")]) {

    //     try {

    //         return await this.databases.listDocuments(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             queries

    //         )

    //     }

    //     catch (error) {
    //         console.log("Error is ", error)
    //     }


    // }



    async getPosts(userId) {

        try {

            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("status", "active"),
                Query.equal("userId", userId)
                ]

            )

        }

        catch (error) {
            console.log("Error is ", error)
        }


    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )

        }

        catch (error) {
            console.log("Error is ", error)
        }
    }


    async deleteFile(fileId) {

        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )

        } catch (error) {
            console.log("Appwrite error ", error)
        }

    }

    async getFilePreview(fileId) {

        try {

            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )

        } catch (error) {
            console("Error is ", error)
        }

    }


}

const service = new Databaseservice()

export default service

