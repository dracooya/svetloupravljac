FROM node:18

WORKDIR /app

# Install required system dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  python3 \
  pkg-config \
  libssl-dev \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./

RUN npm i
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]

