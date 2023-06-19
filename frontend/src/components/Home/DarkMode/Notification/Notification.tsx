import "./Notification.scss";

export const Notification = ({content, variant}) => {
  return (
    <div className="background">
      <div className="content">
        <p style={{
            color: variant === "info" ? "white" : "red"
        }}>{content}</p>{" "}
      </div>
    </div>
  );
};
