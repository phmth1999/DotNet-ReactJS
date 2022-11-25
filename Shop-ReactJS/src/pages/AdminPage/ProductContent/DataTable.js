import React from 'react'
import {Button} from 'antd';
import { DeleteOutlined,EditOutlined,EyeOutlined} from "@ant-design/icons";
export const DataTable = ({data,onEdit,onDelete,onView,requestSort,requestSortID}) => {
    const id = 0;
    return (
        <div> 
            <table className="table  table-bordered table-hover" >
                <thead style={{textAlign:'center'}}>
                    <tr >
                        <th onClick={requestSortID}>ID</th>
                        <th>Tên sản phẩm</th>
                        <th>Hình ảnh</th>
                        <th onClick={requestSort}>Giá</th>
                        <th>Mô tả</th>
                        <th>Trạng thái</th>
                        <th>Tác vụ</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item,index)=>(
                        <tr key={index} >
                            <td> {item.idsp} </td>
                            {/* <td> {} </td> */}
                            <td style={{width:200}}> {item.tensp} </td>
                            <td style={{textAlign:'center'}}> <img src={item.hinhanh} alt="" style={{width:80,height:90}}/> </td>
                            <td style={{textAlign:'center'}}> {item.gia}</td>
                            <td> 
                                <span style={{display:"block"}}> - Màu: {item.mausac}</span>
                                <span style={{display:"block"}}> - Màn hình: {item.manhinh}</span>
                                <span style={{display:"block"}}> - Hệ điều hành: {item.hedieuhanh}</span>
                            </td>
                            {item.sl == 0 ?  <td style={{color:'red',textAlign:'center'}}>Ngừng kinh doanh</td> : <td style={{textAlign:'center'}} > <span style={{color:'green',display:"block"}}>Còn hàng</span> <span style={{display:"block"}}>{item.sl} sản phẩm</span> </td>}
                           
                            <td style={{width:100,textAlign:'center'}}> 
                            <a onClick={() =>onView(item)} ><EyeOutlined  style={{color:'blue', fontSize: 20, padding:3}}/></a>
                            <a onClick={() =>onEdit(item)}><EditOutlined style={{color:'yellow', fontSize: 20,padding:3}}/></a>
                            <a onClick={() =>onDelete(item)} ><DeleteOutlined style={{color:'red', fontSize: 20,padding:3}}/></a>
                            
                            </td>

                        </tr>
                    )
                    
                    
                    )}
                    <tr>
                        
                    </tr>
                </tbody>
            </table>
            
        </div>
    )
}
