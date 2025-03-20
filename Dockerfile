# Start with the lightweight Alpine image
FROM alpine:latest

# Install necessary dependencies including curl, bash, and GCC libraries
RUN apk add --no-cache curl bash g++ libstdc++ libgcc

# Install Bun (since Bun provides an installer)
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to the path
ENV PATH="/root/.bun/bin:$PATH"

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
