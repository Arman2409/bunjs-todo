# Start with the lightweight Alpine image
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy your application files
COPY . .

# Install project dependencies using Bun
RUN bun install

# Generate Prisma Client
RUN bun run prisma generate

# Migrate the database
RUN bun prisma migrate

# Run the application
CMD ["bun", "server.ts"]
