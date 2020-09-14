import React, { useEffect, useState } from 'react';
import {
  getGrade,
  getModuleDic,
  getObjectDic,
  getStandardsDic,
  getMangerClass,
  getGradeWithTerm,
  getMangerAcademy
} from '@/services/service';
import styles from './acquirepoints.less';
import { Form, Button, Select, Row, Col, Input, DatePicker, Space, message } from 'antd';
const { RangePicker } = DatePicker
const SearchSubUnit = props => {
  const { onSearch, onReset } = props;
  const [moduleEntry, setModuleEntry] = useState([]); // 模块select
  
  const [classEntry, setClassEntry] = useState([]); // 班级select
  const [termEntry, setTermEntry] = useState([]); // 学期select
  const [gradeEntry, setGradeEntry] = useState([]); // 学期select
  const [academyEntry,setAcademyEntry] =useState([]) //学院字典
  const [form] = Form.useForm();

   //重置表单
   const formReset = event => {
    form.resetFields();
    onReset();
  };
  
  //获取字典项
  const getSelectSum = () => {
    //模块字典
    getModuleDic().then(res => {
      if (res.status === 200) {
        setModuleEntry(res.data.list);
      } else {
        message.error('获取模块字典失败');
      }
    });
    //获取班级
    getMangerClass().then(res => {
      if (res.status === 200) {
        setClassEntry(res.data.Classes);
        // setClassEntry
      } else {
        message.error('获取班级字典失败');
      }
    });
    //获取学年
    getGradeWithTerm({ code_type: 'AcademicYear' }).then(res => {
      if (res.status === 200) {
        setTermEntry(res.data.list)
      }else {
        message.error('获取学年字典失败');
      }
    })
    //获取学期
    getGradeWithTerm({ code_type: 'AcademicTerm' }).then(res => {
      if (res.status === 200) {
        setGradeEntry(res.data.list)
      }else {
        message.error('获取学期字典失败');
      }
    })
    //获取院系
    getMangerAcademy().then(res=>{
      if (res.status === 200) {
        setAcademyEntry(res.data.list)
      }else {
        message.error('获取院系字典失败');
      }
    })
  };
  useEffect(() => {
    getSelectSum(); // 获取综合字典项
  }, []);

  const rangeConfig = {
    rules: [{ type: 'array', required: false, message: 'Please select time!' }],
  };


  return (
    <div className={styles.searchform}>
      <Form
        form={form}
        name="horizontal_login"
        layout="inline"
        onFinish={onSearch}
      >
        {' '}
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item name="AcademicYearCode" label="范围：">
              <Select
                placeholder="请选择"
                className={styles.selecton}
              >
                {termEntry &&
                  termEntry.length > 0 &&
                  termEntry.map(i => (
                    <Option value={i.code} key={i.code}>
                      {i.code_name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="AcademyCode" label="院系：">
              <Select
                placeholder="请选择"
                className={styles.selecton}
              >
                {classEntry &&
                  classEntry.length > 0 &&
                  classEntry.map(i => (
                    <Option value={i.ClassCode} key={i.ClassCode}>
                      {i.ClassName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="GradeCode" label="年级：">
              <Select
                placeholder="请选择"
                className={styles.selecton}
              >
                {gradeEntry &&
                  gradeEntry.length > 0 &&
                  gradeEntry.map(i => (
                    <Option value={i.code} key={i.code}>
                      {i.code_name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="ClassCode" label="班级：">
              <Select
                placeholder="请选择"
                className={styles.selecton}
              >
                {classEntry &&
                  classEntry.length > 0 &&
                  classEntry.map(i => (
                    <Option value={i.ClassCode} key={i.ClassCode}>
                      {i.ClassName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row className={styles.rowGrids} gutter={24}>
          <Col span={6}>
            <Form.Item name="StuType" label="学生类型：">
              <Select
                placeholder="请选择"
                className={styles.selecton}
              >
                {moduleEntry &&
                  moduleEntry.length > 0 &&
                  moduleEntry.map(i => (
                    <Option value={i.code} key={i.code}>
                      {i.code_name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="StuUserCode" label="学号：">
              <Input className={styles.inputSearch} placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="StuName" label="姓名：">
              <Input className={styles.inputSearch} placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6} align="right" className={styles.btnperi}>
            <Button htmlType="submit" type="primary">
              查询
            </Button>
            <Button htmlType="button" onClick={formReset}>
              重置
            </Button>
          </Col>
        </Row>
        
      </Form>
    </div>
  );
};

export default SearchSubUnit;