import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Dropdown, List, Avatar, Menu, Descriptions, Badge } from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";
import { message } from "antd";
export const Logs = () => {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://localhost:44315/api/logs`);
      setLogs(res.data);
    };
    fetchData();
  }, []);

  const logList = (
    <Menu style={{width:670,overflow:'auto',height:200}}>
        {logs.sort((a, b) => b.idlog - a.idlog).map((log)=> (
            
             <Menu.Item key={log.idlog} style={{height:30}}>
                 <Descriptions >
        <Descriptions.Item label={log.ip}  >Ngày giờ: {log.date} Nội dung: {log.message}</Descriptions.Item>
                 </Descriptions>
             </Menu.Item>
        ))}
     
    </Menu>
  );
  return (
    <div>
      <Dropdown overlay={logList} placement="bottomRight" arrow>
     
        <a
          className="ant-dropdown-link"
          onClick={(e) => e.preventDefault()}
          style={{
            float: "right",
            posistion: "absolute",
            marginTop: -48,
            marginRight: 100,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
             <Badge count={logs.length} >
          Thông báo <DownOutlined />
            </Badge>
        </a>
      
      </Dropdown>
    </div>
  );
};
