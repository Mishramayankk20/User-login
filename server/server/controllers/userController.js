const router = require("../routes/user");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const secret = process.env.secret;


const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  // port           : process.env.DB_PORT
});

//creating view
exports.viewall = (req, res) => {
 // console.log(req.cookies.token);
    pool.getConnection((err, connection) => {
      if (err) console.log(err);
     // console.log("connected as ID " + connection.threadId);
      connection.query("select * from user ", (err, rows) => {
        connection.release();
        if (!err) {
          res.json(rows);
        } else {
          console.log(err);
        }
      });
    });
};
//find user by search
exports.find = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) console.log(err);
    const searchTerm = req.params.search;
    console.log(searchTerm);
    connection.query(
      "select * from user where first_name like ? or last_name like ?",
      ["%" + searchTerm + "%", "%" + searchTerm + "%"],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.json(rows);
        } else {
          console.log(err);
        }
        console.log("the data after searching in search  :\n", rows);
      }
    );
  });
};
//add new user

exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comment } = req.body;
  pool.getConnection((err, connection) => {
    if (err) console.log(err);
    console.log("hello mayank");
    connection.query(
      "INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comment = ?",
      [first_name, last_name, email, phone, comment],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.status(200).send({ message: "useradded successfully" });
        } else {
          console.log(err);
        }
        console.log("the data of adduser  :\n", rows);
      }
    );
  });
};

exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comment } = req.body;
  pool.getConnection((err, connection) => {
    if (err) console.log(err);
    console.log("connected as ID " + connection.threadId);
    connection.query(
      "update user set first_name = ? ,last_name = ?,email=?,phone=?,comment=? where id=?",
      [first_name, last_name, email, phone, comment, req.params.id],
      (err, rows) => {
        if (!err) {
          pool.getConnection((err, connection) => {
            if (err) console.log(err);
            console.log("connected as ID " + connection.threadId);
            connection.query(
              "select * from user where id =?",
              [req.params.id],
              (err, rows) => {
                connection.release();
                if (!err) {
                  res.status(200).send({
                    message: `Id -${req.params.id} has been updated.`,
                    rows,
                  });
                } else {
                  console.log(err);
                }
                console.log("the data update table :\n", rows);
              }
            );
          });
        } else {
          console.log(err);
        }
        console.log("the data user table :\n", rows);
      }
    );
  });
};
exports.delete = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) console.log(err);
    console.log("connected as ID " + connection.threadId);
    connection.query(
      "delete  from user where id =?",
      [req.params.id],
      (err, rows) => {
        connection.release();

        if (!err) {
          res.send({ message: `user with id ${req.params.id} Deleted` });
        } else {
          console.log(err);
        }
        console.log("the data delete user table :\n", rows);
      }
    );
  });
};
exports.view = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) console.log(err);
    connection.query(
      "select * from user where id =?",
      [req.params.id],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.json(rows);
        } else {
          console.log(err);
        }
        console.log("the data view user table :\n", rows);
      }
    );
  });
};

exports.edit = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) console.log(err);
    console.log("connected as ID " + connection.threadId);
    connection.query(
      "select * from user where id =?",
      [req.params.id],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.status(200).send({ rows });
        } else {
          console.log(err);
        }
        console.log("the data edit-user table :\n", rows);
      }
    );
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body.email+" "+req.body.password);
  pool.getConnection((err, connection) => {
    if (err) console.log(err);
    console.log("connected as id " + connection.threadId);
    connection.query(
      "select * from login where email =?",
      [email],
      (err, rows) => {
        if (err) res.send({ err: err });
        connection.release();
        console.log("no of rows fetched  " +rows.length);
        if (rows.length >= 1) {
          if (rows[0].password === password) {
            console.log("password matched");
            const email1 = rows[0].email; 
            const token = jwt.sign({email1}, secret, {
              expiresIn: '1h'
            });
            console.log("the data login table :\n", rows);
            res.cookie('token', token, )                                  
            .sendStatus(200); //{ httpOnly: true }
          } 
          else {
            res.send({ message: "wrong password" });
          }
        } 
        else {
          res.send({ message: "user not registered" });
        }
      }
    );
  });
};

exports.logout = (req, res) => {
  res.clearCookie('token')
  res.sendStatus(200);
  console.log("logout");
};

exports.auth = (req, res) => {
  res.sendStatus(200);
};

exports.form = (req, res) => {
  console.log("clicked");
};
