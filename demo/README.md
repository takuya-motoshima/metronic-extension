# Demonstration of metronic-extension.
How to use the demo.

## Getting Started
1. Install server dependencies.
    ```sh
    cd demo
    npm install
    ```
1. Start server.
    ```sh
    npm start
    # > demo@1.0.0 start
    # > nodemon --ignore public/ --ignore client/ bin/www 8080
    # [nodemon] 2.0.20
    # [nodemon] to restart at any time, enter `rs`
    # [nodemon] watching path(s): *.*
    # [nodemon] watching extensions: js,mjs,json
    # [nodemon] starting `node bin/www 8080`
    ```

    The server starts on port 8080 by default.  
    If you want to change the port, change the start script in <code>demo/package.json</code>.  

    demo/package.json:
    ```json
    "scripts": {
      "start": "nodemon --ignore public/ --ignore client/ bin/www 8080"
    },
    ```
1. You can check the demo by opening <code>http://localhost:8080/</code> for localhost or <code>http://{Server IP}:8080/</code> for global IP.  
    ![index.png](client/src/media/demos/index.png)
1. A MySQL database is required to run the tree demo.  
    Please follow the steps below to build your database.  
    1. Create a database.  
      Connect to MySQL and execute the following SQL.  
      ```sql
      CREATE DATABASE IF NOT EXISTS metronic_extension_db DEFAULT CHARACTER SET utf8mb4;
      USE metronic_extension_db;

      -- SET foreign_key_checks = 0;
      DROP TABLE IF EXISTS folder;
      CREATE TABLE folder (
          id int unsigned NOT NULL AUTO_INCREMENT,
          parent int unsigned DEFAULT NULL COMMENT 'For the root folder, it is NULL because there is no parent folder.',
          `text` varchar(20) NOT NULL,
          PRIMARY KEY (id),
          UNIQUE KEY ukFolderText (parent, `text`),
          CONSTRAINT fkFolderParent FOREIGN KEY (parent) REFERENCES folder (id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

      DROP TABLE IF EXISTS file;
      CREATE TABLE file (
          id int unsigned NOT NULL AUTO_INCREMENT,
          folderId int unsigned NOT NULL,
          `text` varchar(20) NOT NULL,
          PRIMARY KEY (id),
          UNIQUE KEY ukFileText (folderId, `text`),
          CONSTRAINT fkFileFolder FOREIGN KEY (folderId) REFERENCES folder (id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      ```
    1. Add a sample record that will be a folder with the following structure.
        ```text
        Root node (id=1)
            Folder#1 (id=2)
                Folder#1_1 (id=3)
                    File#1_1_1
                    File#1_1_2
                File#1_1
            Folder#2 (id=4)
                File#2_1
            Folder#3 (id=5)
                File#3_1
            File#1
            File#2
            Folder#4 (id=6)
        ```

        ```sql
        INSERT INTO folder(id, parent, `text`) VALUES
            (1, NULL, 'Root node'),
            (2, 1, 'Folder#1'),
            (3, 2, 'Folder#1_1'),
            (4, 1, 'Folder#2'),
            (5, 1, 'Folder#3'),
            (6, 1, 'Folder#4');
        INSERT INTO file(folderId, `text`) VALUES
            (3, 'File#1_1_1'),
            (3, 'File#1_1_2'),
            (2, 'File#1_1'),
            (4, 'File#2_1'),
            (5, 'File#3_1'),
            (1, 'File#1'),
            (1, 'File#2');
        ```


## Build front-end modules
1. Install dependencies.
    ```sh
    cd demo/client
    npm install
    ```
1. Build.  
    If the build is successful, the results are output to <code>demo/public/build/</code>.
    ```sh
    npm run build
    ```