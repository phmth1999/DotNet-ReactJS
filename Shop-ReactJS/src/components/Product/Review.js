import { Comment, Avatar, Form, Button, List, Input, Rate,Descriptions,message } from "antd";
import moment from "moment";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { values } from 'lodash';

const { TextArea } = Input;

const Review = ({idsp,feedback}) => {

  const [feedbacks,setFeedbacks]=useState([])
  const [idkh, setIdkh] = useState(
    JSON.parse(localStorage.getItem("IDKH"))
      ? JSON.parse(localStorage.getItem("IDKH"))
      : 0
  );
  useEffect(() => {
    setFeedbacks(feedback)
  }, [feedback]);
    console.log(feedback)
  const handleSubmit = (values) => {
    console.log(values)
    setFeedbacks([...feedbacks,
    
      {
        idkh:idkh,
        idsp: idsp,
        message: values.message,
        rating: values.rating,
        date: Date()
     } 
    ])
    axios.post( `https://localhost:44315/api/feedbacks`, {
      idkh:idkh,
      idsp: idsp,
      message: values.message,
      rating: values.rating,
      date: Date()
   } ).then((res)=> {
    message.success({
      content: "Thêm đáng giá thành công !",
      style: {
        marginTop: "25vh",
        float: "right",
        fontSize: "17px",
      },
    });
    // window.location.reload()
  })
  
  };
  return (
    <>
      <Comment
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
       
          <Form onFinish={handleSubmit} >
          <Form.Item name='message'>
            <TextArea
              rows={2}
              style={{ width: 500 }}
            />
          </Form.Item>
          <Form.Item name='rating'>
          <Rate value={1} />
          </Form.Item>
          <Form.Item >
            <Button
              htmlType="submit"
              type="primary"
            >
              Đánh giá sản phẩm
            </Button>
          </Form.Item>
          </Form>
        
         
        }
      />
      
      <List
    className="comment-list"
    header={`${feedbacks.length} đánh giá`}
    itemLayout="horizontal"
    dataSource={feedbacks}
    renderItem={item => (
      <li>
       <Comment
          author={item.idkh}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <Descriptions bordered >
            <Descriptions.Item label= {item.message} style={{width: 500}}>  <Rate disable value={item.rating} /> </Descriptions.Item>
            </Descriptions>
           }
          datetime={item.date}
        />
        
      </li>
    )}
  />
       
    </>
  );
};

export default Review;
