# FAM Factory Management API Server

## How to setup

1. clone the repo `git clone ...`
2. install mongodb
3. install node
4. Load the init data:

    ```shell
    cd ./server/init
    node loaddata.js
    ```

5. run the server with nodemon or with node

    ```shell
    cd server
    npm install
    nodemon --env-file=.env --ignore '/*.log.json'
    ```

6. run the tests

    ```shell
    npm test
    ```

7. setup cron task to reset all users actions counters every day at midnight

    ```shell
    chmod u+x setupcron.sh
    ./setupcron.sh
    ```

    or you can run it on demand:

    ```shell
    node ./resetActionsCounters.task.js
    ```

8. logfile will be written in the server directory with the name `actions.log.json`

9. login with these credentials (according the the users specified in the ./init/users.json)
    passwords are the emails from [https://jsonplaceholder.typicode.com/users]

    a. Leanne Graham

    ```json
    {
      username: "Bret", // stored in the db
      password: "Sincere@april.biz" // NOT stored in the db
    }
    ```

    b. Ervin Howell

    ```json
    {
      username: "Antonette", 
      password: "Shanna@melissa.tv" 
    }
    ```
