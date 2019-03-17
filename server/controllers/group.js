/* eslint-disable max-len */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-shadow */
import dotenv from "dotenv";
import Group from "../models/group";
import database from "../db/database";
import sql from "../helpers/sql";

dotenv.config();

const groups = {
  createGroup(req, res) {
    const {
      name, role,
    } = req.body;
    const user = req.userId;
    const findGroup = database(sql.findGroup, [name]);
    findGroup.then((response) => {
      if (response.length !== 0) {
        res.status(400).json({ status: 400, error: "group with the specified name already exists" });
      } else {
        const owner = user;
        const group = new Group(name, role, owner);
        const query = database(sql.createGroup, [group.name, group.role, group.owner]);
        query.then((response) => {
          const {
            id, name, role,
          } = response[0];
          res.status(201).json({
            status: 201,
            success: "group created",
            data: [{
              id, name, role,
            }],
          });
        }).catch((error) => {
          res.status(500).json({ error: "group not created", error });
        });
      }
    }).catch((error) => {
      res.status(500).json({ status: 500, error: "internal server error", error });
    });
  },
};

export default groups;
