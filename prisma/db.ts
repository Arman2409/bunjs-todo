import { PrismaClient } from "@prisma/client";

export class PrismaService {
    instance: PrismaClient | undefined;

    constructor() {
        if (!this.instance) {
            this.instance = new PrismaClient();

            this.connect();
        }
    }

    async connect() {
        if (this.instance) {
            try {
                await this.instance.$connect();
            } catch (err) {
                console.warn("Failed to connect");
            }
        } else {
            console.warn("Database already connected!");
        }
    }

    async disconnect() {
        if (this.instance) {
            try {
                await this.instance.$disconnect();
            } catch (err) {
                console.warn("Failed to disconnect");
            }
        } else {
            console.warn("Database not connected!");
        }
    }

}