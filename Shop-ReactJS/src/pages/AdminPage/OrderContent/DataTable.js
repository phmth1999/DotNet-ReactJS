import React from "react";
import { Switch } from "antd";
import {
  DeleteOutlined,
  UserSwitchOutlined,
  EyeOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

export const DataTable = ({ data, onEdit, onDelete, onView,requestSort }) => {
 
  return (
    <div>
      <table className="table  table-bordered table-hover">
        <thead style={{ textAlign: "center" }}>
          <tr>
            <th onClick={requestSort}>ID
           
            </th>
            <th>ID Khách hàng</th>
            <th>Địa chỉ nhận</th>
            <th>Ngày thanh toán</th>
            <th>Tổng tiền </th>
            <th>Tình trạng</th>
            <th>Tác vụ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td> {item.idhd} </td>
              <td> {item.idkh} </td>
              <td> {item.diachi}</td>
              <td> {item.ngay}</td>
              <td> {item.tonggia}</td>
              {item.tinhtrang == "Hủy" ? (
                <td>
                  <span
                    style={{
                      color: "red",
                      backgroundColor: "yelow",
                      fontWeight: "bold",
                    }}
                  >
                    Hủy
                  </span>
                </td>
              ) : (
                <>
                  {item.tinhtrang == "Chưa kiểm duyệt" ? (
                    <td>
                      <span style={{ color: "black" }}>{item.tinhtrang}</span>
                    </td>
                  ) : (
                    <td>
                      <span style={{ color: "green" }}>{item.tinhtrang}</span>
                    </td>
                  )}
                </>
              )}

              <td style={{ width: 100, textAlign: "center" }}>
                <a onClick={() => onView(item)}>
                  <EyeOutlined
                    style={{ color: "blue", fontSize: 20, padding: 3 }}
                  />
                </a>
                <a onClick={() => onEdit(item)}>
                  <UserSwitchOutlined
                    style={{ color: "yellow", fontSize: 20, padding: 3 }}
                  />
                </a>
                {item.tinhtrang == "Hủy" ? (
                  <a onClick={() => onDelete(item)}>
                    <CheckCircleOutlined
                      style={{ color: "green", fontSize: 20, padding: 3 }}
                    />
                  </a>
                ) : (
                  <>
                    {item.tinhtrang == "Đã nhận" ? (
                      <a onClick={() => onDelete(item)} disabled>
                        <CloseCircleOutlined
                          style={{ color: "black", fontSize: 20, padding: 3 }}
                        />
                      </a>
                    ) : (
                      <a onClick={() => onDelete(item)}>
                        <CloseCircleOutlined
                          style={{ color: "red", fontSize: 20, padding: 3 }}
                        />
                      </a>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};
