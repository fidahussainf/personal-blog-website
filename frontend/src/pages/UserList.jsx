import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../services/user";
import { Table, Button, Modal, message } from "antd";
import Loading from "../components/Loading";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const fetchUsers = () => {
    setLoading(true);

    getAllUsers()
      .then((res) => {
        setUsers(res || []);
        setLoading(false);
      })
      .catch(() => {
        message.error("Failed to fetch users");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      message.success("User deleted");
      fetchUsers();
    } catch {
      message.error("Failed to delete user");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", align: "center" },
    { title: "Email", dataIndex: "email", align: "center" },
    { title: "Role", dataIndex: "role", align: "center" },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (text, record) => (
        <Button
          type="primary"
          danger
          onClick={() => {
            setSelectedUser(record);
            setIsModalVisible(true);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="p-10">
      <Modal
        title="Confirm Deletion"
        open={isModalVisible}
        onOk={async () => {
          setConfirmLoading(true);
          handleDelete(selectedUser._id);
          setIsModalVisible(false);
          setConfirmLoading(false);
        }}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={confirmLoading}
      >
        <p>Are you sure you want to delete {selectedUser?.name}?</p>
      </Modal>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">User List</h1>
        {loading ? (
          <Loading />
        ) : users.length === 0 ? (
          <p className="text-gray-500">No users found</p>
        ) : (
          <div className="overflow-x-auto">

          <Table rowKey="_id" columns={columns} dataSource={users} bordered />
        </div>
        )}
      </div>
    </div>
  );
}
