import React from "react";

import Hub from "./Hub";

import studenthubs from "../../../../assets/image/studenthubs.svg";
import "./StudentHub.scss";

function StudentHubs() {
    return (
        <div className="student-hubs">
            <div className="header">
                <img src={studenthubs} />
                <div className="title">
                    <h1>Tìm bạn bè của bạn</h1>
                    <p>
                        Từ câu lạc bộ tới nhóm học tập, đến các buổi tối chơi
                        game đây chính là nơi dành cho bạn
                    </p>
                </div>
            </div>
            <div className="hubs">
                <Hub />
                <Hub />
                <Hub />
            </div>
            <div className="footer">
                Các Hub không được trường liên kết hoặc quản lý. Các máy chủ nằm
                trong danh sách Student Hub của trường là do sinh viên trong Hub
                đó điều hành. Người dùng không cần phải là thành viên của
                Student Hub để được mời tham gia vào máy chủ ghi danh ở đó.
            </div>
        </div>
    );
}

export default StudentHubs;
