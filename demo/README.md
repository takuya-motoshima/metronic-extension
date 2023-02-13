# demo
This demo uses metronic_v8.1.2.

## Getting Started
1. Install front-end dependencies.
    ```sh
    cd client
    npm install
    ```
1. Build the front-end module.
    ```sh
    npm run build
    ```
1. Install server-side dependencies.
    ```sh
    cd server
    npm install
    ```
1. Start the server.  
    Execute the following command in the server/ directory.
    ```sh
    npm start
    ```
1. Open demo/index.html in a browser.

## How to use the Folder Tree Demo
The folder tree demonstration uses a server and MySQL.  
Follow these steps to build a MySQL database and start the server.
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

## SQL to retrieve the children of the specified folder.
- For the top level node.
    ```sql
    SELECT
      '#' parent, 'folder' type, `text`, id, if (counter.folderId IS NOT NULL, true, false) children
    FROM
      folder LEFT JOIN (
        SELECT
          folderId
        FROM
          (SELECT parent folderId FROM folder WHERE parent IS NOT NULL
            UNION ALL SELECT folderId FROM file) t
        GROUP BY
          folderId
      ) counter ON folder.id = counter.folderId
    WHERE
      folder.parent is null;
    ```
- For a non-topmost node.
    ```sql
    SET @parent = 1;
    SELECT
      parent, 'folder' type, `text`, id, if (counter.folderId IS NOT NULL, true, false) children
    FROM
      folder LEFT JOIN (
        SELECT
          folderId
        FROM
          (SELECT parent folderId FROM folder WHERE parent IS NOT NULL
            UNION ALL SELECT folderId FROM file) t
        GROUP BY
          folderId
      ) counter ON folder.id = counter.folderId
    WHERE
      folder.parent = @parent
    UNION ALL
    SELECT
      folderId parent, 'file' type, `text`, id, NULl children
    FROM
      file
    WHERE
      folderId = @parent;
    ```
