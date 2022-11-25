import React from 'react'
import { DeleteOutlined,UserSwitchOutlined,EyeOutlined,CloseCircleOutlined,CheckCircleOutlined} from "@ant-design/icons";
export const DataTable = ({data,onEdit,onDelete,onView,requestSort}) => {
    const id = 0;
    return (
        <div> 
            <table className="table  table-bordered table-hover" >
                <thead style={{textAlign:'center'}}>
                    <tr>
                        <th onClick={requestSort}>ID</th>
                        <th>Họ và tên</th>
                        <th>Ngày sinh</th>
                        <th>Giới tính</th>
                        <th>Thông tin cá nhân</th>
                        <th>Đặc quyền</th>
                        <th>Trạng thái</th>
                        <th>Tác vụ</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item,index)=>(
                        <tr key={index}>
                            <td> {item.idkh} </td>
                          
                            <td> {item.hoten} </td>
                    <td> {item.ngaysinh}</td>
                            <td> {item.gioitinh}</td>
                            <td> 
                                <span style={{display:"block"}}> - Email: {item.email}</span>
                                <span style={{display:"block"}}> - Số điện thoại: {item.sdt}</span>
                                <span style={{display:"block"}}> - Địa chỉ: {item.diachi}</span>
                            </td>
                            {item.roles == "1" ?  <td style={{color:'blue'}}>Quản trị viên</td> : <td> <span style={{color:'green',display:"block"}}>Khách hàng</span> </td>}
                            {item.status=='0' ?  <td style={{color:'red'}}>Nghừng hoạt động</td> : <td> <span style={{color:'green',display:"block"}}>Hoạt động</span> </td>}
                          
                            <td style={{width:100,textAlign:'center'}}> 
                            <a onClick={() =>onView(item)} ><EyeOutlined  style={{color:'blue', fontSize: 20, padding:3}}/></a>
                            <a onClick={() =>onEdit(item)}><UserSwitchOutlined style={{color:'yellow', fontSize: 20,padding:3}}/></a>
                            {item.status=='0' ?
                             <a onClick={() =>onDelete(item)} ><CheckCircleOutlined  style={{color:'green', fontSize: 20,padding:3}}/></a>
                            :
                            <a onClick={() =>onDelete(item)} ><CloseCircleOutlined style={{color:'red', fontSize: 20,padding:3}}/></a>}
                            
                            
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
