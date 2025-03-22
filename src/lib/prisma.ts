import { PrismaClient } from '@prisma/client'

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined
}

// Initialize prismaClient variable
let prismaClient: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prismaClient = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'error', 'warn'],
    })
  }
  prismaClient = global.prisma
}

export default prismaClient