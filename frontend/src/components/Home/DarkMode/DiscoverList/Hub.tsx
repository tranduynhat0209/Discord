import React from "react";

import "./Hub.scss";

import hubIcon from "../../../../assets/image/hub-icon.svg";

function Hub() {
    return (
        <div className="hub">
            <div className="icon">
                <img src={hubIcon} alt="" />
            </div>
            <h1 className="title">
                Tìm nhóm học tập, câu lạc bộ và bạn bè trong Student Hub cho
                trường học của bạn!
            </h1>
            <p className="description">
                Gặp gỡ các bạn cùng lớp, khám phá cộng đồng và chia sẻ máy chủ
                của bạn, đều tập trung tại một chỗ.
            </p>
            <button type="button" className="enjoy-hub">
                Tham gia Hub
            </button>
        </div>
    );
}

export default Hub;
