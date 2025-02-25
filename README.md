# Music Archive
This is a way for me to see what sheet music I have lying around.
So that I don't have to search manually only to find out that I don't have it.

## Setting the database up yourself
The schema is provided so that you can set it up yourself (`server/schema.sql`). \
For example in pgAdmin:
1. Right-click on `Databases` and select `Create` > `Database...`
2. Choose a name for your database (e.g., `Music_Archive`) and click `Save`.
3. Right-click on your newly created database and select `Query Tool`.
4. Click on the `Open File` button and select the `schema.sql` file.
5. Click on the `Execute/Refresh` button to run the script. 

## Running the Application
1. Within the `server` directory, install the required packages using `npm i`.
2. Within the `client` directory, install the required packages using `npm i`.
3. Run the server using `npm start`.
4. Run the client using `npm start`.
5. Access the client on `http://localhost:5173` or using `o` + `enter` in the console.