## Getting Started
1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Create `.env` file at the root directory. Add 
    ```
    MONGO_SRV=<connection url>
    ```
    to the `.env` file and replace `<connection url>` with your MongoDB instance's srv connection string from step 4 of [data-recipient](https://github.com/vgao1/data-recipient) repo. 

4. Using two seperate, dedicated terminals:  
    Run `npm run dev:server` to start the backend server.  
    Run `npm run dev:client` to start the client server.
