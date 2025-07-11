import { User } from '../models/index.js';
import { Role } from '../constant/index.js';

const getUsers = async (req, res) => {
  try {
    const adminUser = await User.findById(req.user.id);
    if (!adminUser || adminUser.role !== Role.ADMIN) {
      return res.status(401).send({
        message: 'Unauthorized access',
      });
    }
    let { page = 1, limit = 10, search = '', } = req.query;
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    const query = {
     isDeleted: false,
    };

    const users = await User
      .find(query)
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await User.countDocuments(query);

    return res.status(200).send({
      message: 'All Users details',
      data: {
        totalUser: count,
        totalPages: Math.ceil(count / limit),
        users: users,
      },
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {

    const userExists = await User
      .findById(req.params.id)
      .select('-password');
    return res.status(200).send({
      message: 'User details',
      data: userExists,
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );
    return res.status(200).send({
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const query = { _id: req.params.id, isDeleted: false };
    const user = await User.findOne(query);
    if (!user) {
      return res.status(404).send({
        message: 'User not found',
      });
    }
    const adminUser = await User.findById(req.user.id);
    if (!adminUser || adminUser.role !== Role.ADMIN) {
      return res.status(401).send({
        message: 'Unauthorized access',
      });
    }
    await User.findByIdAndUpdate(req.params.id, { isDeleted: true });
    return res.status(200).send({
      message: 'User deleted successfully',
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};
export {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};

