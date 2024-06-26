# stack

1. typescript
2. prisma
3. postgresql (neon db)

# setup commands

> (these are for me, not everyone needs to run this)

```bash
npm init -y
npm install prisma typescript ts-node @types/node nodemon --save-dev
npm i @prisma/client

npx tsc --init # change outDir and rootDir in tsconfig.json
npx prisma init

npm i express
npm i @types/express --save-dev

npm i dotenv

npm i bcrypt
npm i @types/bcrypt --save-dev
npm i jsonwebtoken

npm start # make sure to modify the package.json file first

```

# File structure

src
    index.ts
    controllers
    exceptions
    middlewares
    schema
    routes
nodemon.json

# Nodemon configs

```json
//./nodemon.json
{
    "watch": ["src"],
    "ext": ".js, .ts",
    "exec":"npx ts-node ./src/index.ts"
}
```

```json
// ./package.json
//...

"scripts": {
    // ...
    "start": "npx nodemon",
    // ...
}
// ...
```
