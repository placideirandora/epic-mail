/* eslint-disable max-len */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-shadow */
import dotenv from "dotenv";
import moment from "moment";
import Group from "../models/group";
import Member from "../models/member";
import Groupmessage from "../models/group-message";
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

  retrieveGroups(req, res) {
    const user = req.userId;
    const userAccess = "true";
    const findAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    findAdmin.then((response) => {
      if (response.length !== 0) {
        const allGroups = database(sql.retrieveAllGroups);
        allGroups.then((response) => {
          if (response.length === 0 || response.length === "undefined") {
            res.status(404).json({
              status: 404,
              error: "admin, no groups found",
            });
          } else {
            res.status(200).json({
              status: 200,
              success: "admin, groups retrieved",
              data: response,
            });
          }
        }).catch((error) => {
          res.status(500).json({ error: "error occured", error });
        });
      } else {
        const userGroups = database(sql.retrieveUserGroups, [user]);
        userGroups.then((response) => {
          if (response.length === 0 || response.length === "undefined") {
            res.status(404).json({ status: 404, error: "no groups found" });
          } else {
            res.status(200).json({
              status: 200,
              success: "groups",
              data: response,
            });
          }
        }).catch((error) => {
          res.status(500).json({ error: "error occured", error });
        });
      }
    }).catch((error) => {
      res.status(500).json({ error: "error occured", error });
    });
  },

  retrieveGroup(req, res) {
    const groupId = req.params.id;
    const user = req.userId;
    const userAccess = "true";
    const findAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    findAdmin.then((response) => {
      if (response.length !== 0) {
        const specificGroup = database(sql.retrieveSpecificGroup, [groupId]);
        specificGroup.then((response) => {
          if (response.length === 0 || response.length === "undefined") {
            res.status(404).json({ status: 404, error: "admin, group not found" });
          } else {
            res.status(200).json({
              status: 200,
              success: "admin, group retrieved",
              data: response,
            });
          }
        }).catch((error) => {
          res.status(500).json({ error: "error occured", error });
        });
      } else {
        const userGroup = database(sql.retrieveUserGroup, [groupId, user]);
        userGroup.then((response) => {
          if (response.length === 0 || response.length === "undefined") {
            res.status(404).json({ status: 404, error: "group not found" });
          } else {
            const specificGroup = database(sql.retrieveSpecificGroup, [groupId]);
            specificGroup.then((response) => {
              if (response.length === 0 || response.length === "undefined") {
                res.status(404).json({ status: 404, error: "group not found" });
              } else {
                res.status(200).json({
                  status: 200,
                  success: "group retrieved",
                  data: response,
                });
              }
            }).catch((error) => {
              res.status(500).json({ error: "error occured", error });
            });
          }
        }).catch((error) => {
          res.status(500).json({ error: "error occured", error });
        });
      }
    }).catch((error) => {
      res.status(500).json({ error: "error occured", error });
    });
  },

  changeGroupName(req, res) {
    const groupId = req.params.id;
    const {
      name,
    } = req.body;
    const user = req.userId;
    const userAccess = "true";
    const findAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    findAdmin.then((response) => {
      if (response.length !== 0) {
        const specificGroup = database(sql.retrieveSpecificGroup, [groupId]);
        specificGroup.then((response) => {
          if (response.length === 0 || response.length === "undefined") {
            res.status(404).json({ status: 404, error: "admin, group with the specified id, not found" });
          } else {
            const query = database(sql.updateSpecificGroup, [name, groupId]);
            query.then((response) => {
              const {
                id, name, role,
              } = response[0];
              res.status(200).json({
                status: 200,
                success: "admin, group name changed",
                data: {
                  id, name, role,
                },
              });
            }).catch((error) => {
              res.status(500).json({ error: "failed to change the group name", error });
            });
          }
        }).catch((error) => {
          res.status(500).json({ error: "error occured", error });
        });
      } else {
        const userGroup = database(sql.retrieveUserGroup, [groupId, user]);
        userGroup.then((response) => {
          if (response.length === 0 || response.length === "undefined") {
            res.status(404).json({ status: 404, error: "group not found" });
          } else {
            const findGroup = database(sql.findGroup, [name]);
            findGroup.then((response) => {
              if (response.length !== 0 || response.length === "undefined") {
                res.status(400).json({ status: 400, error: "the specified group name is already taken" });
              } else {
                const query = database(sql.updateSpecificGroup, [name, groupId]);
                query.then((response) => {
                  const {
                    id, name, role,
                  } = response[0];
                  res.status(200).json({
                    status: 200,
                    success: "group name changed",
                    data: {
                      id, name, role,
                    },
                  });
                }).catch((error) => {
                  res.status(500).json({ error: "failed to change the group name", error });
                });
              }
            }).catch((error) => {
              res.status(500).json({ error: "error occured", error });
            });
          }
        }).catch((error) => {
          res.status(500).json({ error: "error occured", error });
        });
      }
    }).catch((error) => {
      res.status(500).json({ error: "error occured", error });
    });
  },

  deleteGroup(req, res) {
    const groupId = req.params.id;
    const user = req.userId;
    const userAccess = "true";
    const findAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    findAdmin.then((response) => {
      if (response.length !== 0) {
        const specificGroup = database(sql.retrieveSpecificGroup, [groupId]);
        specificGroup.then((response) => {
          if (response.length === 0 || response.length === "undefined") {
            res.status(404).json({ status: 404, error: "admin, group not found" });
          } else {
            const query = database(sql.deleteSpecificGroup, [groupId]);
            query.then((response) => {
              if (response) {
                res.status(200).json({ status: 200, success: "admin, group deleted" });
              } else {
                res.status(400).json({ status: 400, error: "admin, group not deleted" });
              }
            }).catch((error) => {
              res.status(500).json({ error: "failed to change the group name", error });
            });
          }
        }).catch((error) => {
          res.status(500).json({ error: "error occured", error });
        });
      } else {
        const userGroup = database(sql.retrieveUserGroup, [groupId, user]);
        userGroup.then((response) => {
          if (response.length === 0 || response.length === "undefined") {
            res.status(404).json({ status: 404, error: "group not found" });
          } else {
            const query = database(sql.deleteSpecificGroup, [groupId]);
            query.then((response) => {
              if (response) {
                res.status(200).json({ status: 200, success: "group deleted" });
              } else {
                res.status(400).json({ status: 400, error: "group not deleted" });
              }
            }).catch((error) => {
              res.status(500).json({ error: "failed to change the group name", error });
            });
          }
        }).catch((error) => {
          res.status(500).json({ error: "error occured", error });
        });
      }
    }).catch((error) => {
      res.status(500).json({ error: "error occured", error });
    });
  },

  addGroupMember(req, res) {
    const groupId = req.params.id;
    const {
      firstname, lastname, role,
    } = req.body;
    const owner = req.userId;
    const specificGroupOwner = database(sql.retrieveSpecificGroupOwner, [groupId, owner]);
    specificGroupOwner.then((response) => {
      if (response.length === 0 || response.length === "undefined") {
        res.status(404).json({ status: 404, error: "group not found" });
      } else {
        const findMember = database(sql.retrieveMember, [firstname, lastname]);
        findMember.then((response) => {
          if (response.length !== 0) {
            res.status(400).json({ status: 400, error: "user with the specified name is already registered" });
          } else {
            const memberGroup = groupId;
            const member = new Member(firstname, lastname, role, memberGroup);
            const query = database(sql.registerGroupMember, [member.firstname, member.lastname, member.role, member.memberGroup]);
            query.then((response) => {
              const {
                id, firstname, lastname, role, groupid,
              } = response[0];
              res.status(201).json({
                status: 201,
                success: "group member registered",
                data: [{
                  id, firstname, lastname, role, groupid,
                }],
              });
            }).catch((error) => {
              res.status(500).json({ error: "group member not registered", error });
            });
          }
        }).catch((error) => {
          res.status(500).json({ status: 500, error: "registration failed", error });
        });
      }
    }).catch((error) => {
      res.status(500).json({ error: "error occured", error });
    });
  },

  retrieveGroupMembers(req, res) {
    const groupId = req.params.id;
    const user = req.userId;
    const userAccess = "true";
    const findAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    findAdmin.then((response) => {
      if (response.length !== 0) {
        const specificGroup = database(sql.retrieveSpecificGroup, [groupId]);
        specificGroup.then((response) => {
          if (response.length === 0 || response.length === "undefined") {
            res.status(404).json({ status: 404, error: "admin, group not found" });
          } else {
            const groupMembers = database(sql.retrieveSpecificGroupMembers, [groupId]);
            groupMembers.then((response) => {
              if (response.length === 0 || response.length === "undefined") {
                res.status(404).json({ status: 404, error: "admin, no group members found" });
              } else {
                res.status(404).json({
                  status: 404,
                  error: "admin, group members retrieved",
                  data: response,
                });
              }
            }).catch((error) => {
              res.status(500).json({ error: "error occured", error });
            });
          }
        }).catch((error) => {
          res.status(500).json({ error: "error occured", error });
        });
      } else {
        const userGroup = database(sql.retrieveUserGroup, [groupId, user]);
        userGroup.then((response) => {
          if (response.length === 0 || response.length === "undefined") {
            res.status(404).json({ status: 404, error: "group not found" });
          } else {
            const specificGroup = database(sql.retrieveSpecificGroup, [groupId]);
            specificGroup.then((response) => {
              if (response.length === 0 || response.length === "undefined") {
                res.status(404).json({ status: 404, error: "group not found" });
              } else {
                const groupMembers = database(sql.retrieveSpecificGroupMembers, [groupId]);
                groupMembers.then((response) => {
                  if (response.length === 0 || response.length === "undefined") {
                    res.status(404).json({ status: 404, error: "no group members found" });
                  } else {
                    res.status(200).json({
                      status: 200,
                      success: "group members retrieved",
                      data: response,
                    });
                  }
                }).catch((error) => {
                  res.status(500).json({ error: "error occured", error });
                });
              }
            }).catch((error) => {
              res.status(500).json({ error: "error occured", error });
            });
          }
        }).catch((error) => {
          res.status(500).json({ error: "error occured", error });
        });
      }
    }).catch((error) => {
      res.status(500).json({ error: "error occured", error });
    });
  },

  retrieveGroupMember(req, res) {
    const groupId = req.params.id;
    const groupMemberId = req.params.mid;
    const owner = req.userId;
    const specificGroupOwner = database(sql.retrieveSpecificGroupOwner, [groupId, owner]);
    specificGroupOwner.then((response) => {
      if (response.length === 0 || response.length === "undefined") {
        res.status(404).json({ status: 404, error: "group not found" });
      } else {
        const specificGroupMember = database(sql.retrieveSpecificGroupMember, [groupMemberId, groupId]);
        specificGroupMember.then((response) => {
          if (response.length === 0 || response.length === "undefined") {
            res.status(404).json({ status: 404, error: "group member not found" });
          } else {
            const query = database(sql.retrieveSpecificGroupMember, [groupMemberId, groupId]);
            query.then((response) => {
              if (response) {
                res.status(200).json({ status: 200, success: "group member retrieved", response });
              } else {
                res.status(400).json({ status: 400, error: "group member not retrieved" });
              }
            }).catch((error) => {
              res.status(500).json({ error: "failed to retrieve the group member", error });
            });
          }
        }).catch((error) => {
          res.status(500).json({ error: "error occured", error });
        });
      }
    }).catch((error) => {
      res.status(500).json({ error: "error occured", error });
    });
  },

  deleteGroupMember(req, res) {
    const groupId = req.params.id;
    const groupMemberId = req.params.mid;
    const owner = req.userId;
    const specificGroupOwner = database(sql.retrieveSpecificGroupOwner, [groupId, owner]);
    specificGroupOwner.then((response) => {
      if (response.length === 0 || response.length === "undefined") {
        res.status(404).json({ status: 404, error: "group not found" });
      } else {
        const specificGroupMember = database(sql.retrieveSpecificGroupMember, [groupMemberId, groupId]);
        specificGroupMember.then((response) => {
          if (response.length === 0 || response.length === "undefined") {
            res.status(404).json({ status: 404, error: "group member not found" });
          } else {
            const query = database(sql.deleteSpecificGroupMember, [groupMemberId, groupId]);
            query.then((response) => {
              if (response) {
                res.status(200).json({ status: 200, success: "group member deleted" });
              } else {
                res.status(400).json({ status: 400, error: "group member not deleted" });
              }
            }).catch((error) => {
              res.status(500).json({ error: "failed to delete the group member", error });
            });
          }
        }).catch((error) => {
          res.status(500).json({ error: "error occured", error });
        });
      }
    }).catch((error) => {
      res.status(500).json({ error: "error occured", error });
    });
  },

  sendGroupEmail(req, res) {
    const groupId = req.params.id;
    const {
      subject, message, parentMessageId, status,
    } = req.body;
    const owner = req.userId;
    const specificGroupOwner = database(sql.retrieveSpecificGroupOwner, [groupId, owner]);
    specificGroupOwner.then((response) => {
      if (response.length === 0 || response.length === "undefined") {
        res.status(404).json({ status: 404, error: "group not found" });
      } else {
        const groupmessage = new Groupmessage(subject, message, parentMessageId, status, groupId);
        const query = database(sql.sendGroupEmail, [groupmessage.subject, groupmessage.message, groupmessage.parentMessageId, groupmessage.status, moment().format("LL"), groupmessage.groupId]);
        query.then((response) => {
          const {
            id, subject, message, parentmessageid, status, groupid, createdon,
          } = response[0];
          res.status(201).json({
            status: 201,
            success: "group email sent",
            data: [{
              id, subject, message, parentmessageid, status, groupid, createdon,
            }],
          });
        }).catch((error) => {
          res.status(500).json({ error: "group email not sent", error });
        });
      }
    }).catch((error) => {
      res.status(500).json({ error: "error occured", error });
    });
  },

  retrieveGroupEmails(req, res) {
    const groupId = req.params.id;
    const user = req.userId;
    const userAccess = "true";
    const findAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    findAdmin.then((response) => {
      if (response.length !== 0) {
        const specificGroup = database(sql.retrieveSpecificGroup, [groupId]);
        specificGroup.then((response) => {
          if (response.length === 0 || response.length === "undefined") {
            res.status(404).json({ status: 404, error: "admin, group not found" });
          } else {
            const groupEmails = database(sql.retrieveSpecificGroupEmails, [groupId]);
            groupEmails.then((response) => {
              if (response.length === 0 || response.length === "undefined") {
                res.status(404).json({ status: 404, error: "admin, no group emails found" });
              } else {
                res.status(200).json({
                  status: 200,
                  success: "admin, group emails found",
                  data: response,
                });
              }
            }).catch((error) => {
              res.status(500).json({ error: "error occured", error });
            });
          }
        }).catch((error) => {
          res.status(500).json({ error: "error occured", error });
        });
      } else {
        const userGroup = database(sql.retrieveUserGroup, [groupId, user]);
        userGroup.then((response) => {
          if (response.length === 0 || response.length === "undefined") {
            res.status(404).json({ status: 404, error: "group not found" });
          } else {
            const groupEmails = database(sql.retrieveSpecificGroupEmails, [groupId]);
            groupEmails.then((response) => {
              if (response.length === 0 || response.length === "undefined") {
                res.status(404).json({ status: 404, error: "no group emails found" });
              } else {
                res.status(200).json({
                  status: 200,
                  success: "group emails found",
                  data: response,
                });
              }
            }).catch((error) => {
              res.status(500).json({ error: "error occured", error });
            });
          }
        }).catch((error) => {
          res.status(500).json({ error: "error occured", error });
        });
      }
    }).catch((error) => {
      res.status(500).json({ error: "error occured", error });
    });
  },
};

export default groups;
