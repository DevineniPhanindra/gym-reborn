import "../styles/dashboard.css";

function DashboardCard({
    title,
    value,
    icon,
    color
}) {
    return (
        <div
            className="stat-card"
            style={{
                borderLeftColor: color
            }}
        >
            <div className="stat-left">
                <h6>{title}</h6>
                <h2>{value}</h2>
            </div>

            <div
                className="stat-icon"
                style={{
                    background: `${color}15`
                }}
            >
                <i
                    className={`bi ${icon}`}
                    style={{
                        color: color
                    }}
                ></i>
            </div>
        </div>
    );
}

export default DashboardCard;