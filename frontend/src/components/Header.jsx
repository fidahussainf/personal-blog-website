import { useNavigate } from "react-router-dom";
import { Dropdown, Avatar } from "antd";
import { UserOutlined, LogoutOutlined, UserSwitchOutlined } from "@ant-design/icons";

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const items = [
    ...(user?.role === "ADMIN"
      ? [
          {
            key: "users",
            icon: <UserSwitchOutlined />,
            label: "User Management",
            onClick: () => navigate("/users"),
          },
        ]
      : []),
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: onLogout,
    },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          <div
            className="text-xl font-bold text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            BlogSphere
          </div>

          {user && (
            <Dropdown
              menu={{
                items,
                onClick: ({ key }) => {
                  const item = items.find((i) => i.key === key);
                  if (item && item.onClick) item.onClick();
                },
              }}
              placement="bottomRight"
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar
                  size="default"
                  icon={<UserOutlined />}
                  className="bg-blue-100 text-blue-600"
                />
                <div className="hidden md:block">
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-xs text-gray-500">{user?.role}</div>
                </div>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  );
}