import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon");
const profile_table_create =
  "create table if not exists Profile (firstName varchar(255),lastName varchar(255),email varcgar(255),phone varchar(255),avatar text,check_statues BOOLEAN NOT NULL CHECK (check_statues IN (0, 1)) DEFAULT 0,check_pw_change BOOLEAN NOT NULL CHECK (check_pw_change IN (0, 1)) DEFAULT 0,check_special BOOLEAN NOT NULL CHECK (check_special IN (0, 1)) DEFAULT 0,check_news_letter BOOLEAN NOT NULL CHECK (check_news_letter IN (0, 1)) DEFAULT 0);";
export async function checkLogin() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists menuItems (id integer not null, description text, image text, name text, price text, category text, PRIMARY KEY (id));"
        );
      },
      reject,
      resolve //
    );
  });
}
export async function createTable(type) {
  if (type === "food") {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "create table if not exists menuItems (id integer not null, description text, image text, name text, price text, category text, PRIMARY KEY (id));"
          );
        },
        reject,
        resolve //
      );
    });
  } else if (type === "user") {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(profile_table_create);
        },
        reject,
        resolve //
      );
    });
  }
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql("select * from menuItems", [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}
export async function getProfile() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from Profile", [], (_, { rows }) => {
          resolve(rows._array);
          // console.log("Profile rows", rows);
        });
      },
      reject,
      resolve
    );
  });
}

export function saveMenuItems(menuItems) {
  db.transaction((tx) => {
    menuItems.map((item) => {
      tx.executeSql(
        `insert into menuItems (description, image, name, price, category) values ("${item.description}", "${item.image}", "${item.name}","${item.price}", "${item.category}");`
      );
    });
  });
}
export async function cleanProfile() {
  db.transaction((tx) => {
    tx.executeSql(`truncate table Profile;`);
  });
}
export async function getAvatar() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(`select avatar from Profile;`, [], (_, { rows }) => {
        resolve(rows._array);
        console.log("avatar: ", rows);
        return rows;
      });
    });
  });
}

export async function saveProfile(profile) {
  console.log("profile", profile);
  db.transaction((tx) => {
    //This part is about truncate the table if the Profile table exist.
    tx.executeSql(`DROP TABLE IF EXISTS Profile;`);

    //This part is about updating the Profile
    tx.executeSql(profile_table_create);
    tx.executeSql(
      `insert into Profile (firstName, lastName, email, phone, avatar, check_statues, check_pw_change, check_special, check_news_letter) values ("${profile.fN}", "${profile.lN}", "${profile.email}", "${profile.phone}", "${profile.image}", ${profile.order}, ${profile.pWChange}, ${profile.special}, ${profile.news});`
    );
  });
  db.transaction((tx) => {
    console.log("after creating a profile in database");
    tx.executeSql(`select * from Profile;`, [], (_, { rows }) => {
      // resolve(rows._array);
      console.log("rows!!!!", rows);
    });
  });
}
export async function filterByQueryAndCategories(query, activeCategories) {
  console.log("filtering with query:", query);
  console.log("filtering with activeCategories:", activeCategories);
  return new Promise((resolve, reject) => {
    if (!query) {
      db.transaction((tx) => {
        tx.executeSql(
          `select * from menuItems where ${activeCategories
            .map((category) => `category='${category}'`)
            .join(" or ")}`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
            // console.log(rows);
          }
        );
      }, reject);
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          `select * from menuItems where (name like '%${query}%') and (${activeCategories
            .map((category) => `category='${category}'`)
            .join(" or ")})`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
            // console.log(rows);
          }
        );
      }, reject);
    }
  });
}
