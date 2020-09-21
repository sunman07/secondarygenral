import React, { useEffect, useState } from 'react';
import { getStudentsWithTerm, getMangerClass } from '@/services/service';
import styles from './statusprogress.less';
import { Form, Button, Select, Row, Col, Input, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
const SearchFormUnit = props => {
  const { onSearch, onReset, scopeOfSystem } = props;
  const [studentsEntry, setStudentsEntry] = useState([]); //学生类型
  const [classEntry, setClassEntry] = useState([]); // 班级select
  const [form] = Form.useForm();
  //获取字典项
  const getSelectSum = () => {
    //获取班级
    getMangerClass().then(res => {
      console.log(res);
      if (res.status === 200) {
        setClassEntry(res.data.Classes);
        // setClassEntry
      } else {
        message.error('获取班级字典失败');
      }
    });
    //获取学生类型字典
    getStudentsWithTerm().then(res => {
      if (res.status === 200) {
        setStudentsEntry(res.data.list);
        console.log(res.data.list);
      } else {
        message.error('获取学生类型失败');
      }
    });
  };

  useEffect(() => {
    getSelectSum(); // 获取多个字典项
  }, []);

  // 切换模块时
  const moduleChange = moduleCode => {
    form.setFieldsValue({ ItemCode: '' });
    form.setFieldsValue({ StandardCode: '' });
  };

  //重置表单
  const formReset = event => {
    form.resetFields();
    onReset();
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
            <Form.Item name="ClassCode" label="学年学期：">
              <Select
                onChange={moduleChange}
                placeholder="请选择"
                className={styles.selecton}
              >
                {scopeOfSystem &&
                  scopeOfSystem.length > 0 &&
                  scopeOfSystem.map(i => (
                    <Option value={i.code} key={i.code}>
                      {i.code_name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="StudentType" label="学生类型：">
              <Select
                onChange={moduleChange}
                placeholder="请选择"
                className={styles.selecton}
              >
                {studentsEntry &&
                  studentsEntry.length > 0 &&
                  studentsEntry.map(i => (
                    <Option value={i.code} key={i.code}>
                      {i.code_name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="GradeCode" label="年级：">
              <Select
                onChange={moduleChange}
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
            <Button
              className={styles.searchBtn}
              htmlType="submit"
              type="primary"
            >
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

export default SearchFormUnit;
