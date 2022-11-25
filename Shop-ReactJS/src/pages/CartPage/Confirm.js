import React, {useEffect,useState} from "react";
import { Descriptions } from "antd";
export const Confirm = () => {
    const [total,setTotal] = useState(JSON.parse(localStorage.getItem('SUM')) ? JSON.parse(localStorage.getItem('SUM')) : 0)
    const [data] = useState(JSON.parse(localStorage.getItem('CART')) ? JSON.parse(localStorage.getItem('CART')): [])
  return (
    <>
      <Descriptions title="Thông tin hóa đơn">
      </Descriptions>
      
      <table className="table table-hover" style={{overflow:'auto'}}>
          <tbody>
              {data.map(item=> (
                <tr key={item.idsp}>
                  <td>{item.tensp}</td>
                  <td>
                      <img src={item.hinhanh} alt="" style={{width:40,height:70}}/>
                  </td>
                  <td>{item.quanlity}</td>
                  <td>{item.gia}</td>
              </tr>
              ))}
              
          </tbody>
      </table>
    <hr/>
     <span style={{fontSize:18,fontWeight:'bolder', float:'right'}}> Tổng giá : {total}</span> 
     <br/>
      
    </>
  );
};
