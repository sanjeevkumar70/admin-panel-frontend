import { useAuth } from "../../context/AuthContext";
import "./Dashboard.css";
export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    {
      title: "Users",
      value: "1,250",
    },
    {
      title: "Products",
      value: "320",
    },
    {
      title: "Orders",
      value: "845",
    },
    {
      title: "Revenue",
      value: "$12,500",
    },
  ];

  return (
    <div className="dashboard">


      <div className="stats-grid">
        {stats.map((item, index) => (
          <div className="stat-card" key={index}>
            <h3>{item.title}</h3>
            <h2>{item.value}</h2>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="card">
          <h2>Recent Activity</h2>

          <ul>
            <li>New user registered</li>
            <li>Order #1024 completed</li>
            <li>Product updated</li>
            <li>Payment received</li>
          </ul>
        </div>

        <div className="card">
          <h2>System Overview</h2>

          <p>
            Total Users: 1250
          </p>

          <p>
            Active Orders: 180
          </p>

          <p>
            Products Listed: 320
          </p>

          <p>
            Revenue This Month: $12,500
          </p>
        </div>
      </div>
    </div>
  );
}