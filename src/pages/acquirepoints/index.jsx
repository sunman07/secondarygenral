import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Button, Select, Layout, Form, Input, Modal, message } from 'antd';
import { getScoreOfEntry, getCreditsOfEntry } from '@/services/service';
import moment from 'moment';
import styles from './acquirepoints.less';
import classNames from 'classnames';
import SearchSubUnit from './searchform';
import MainContent from './maincontent';
import DetailsSubUnit from './detailsdisplay';

const { Option } = Select;
const { Content } = Layout;
//初始化参数
const paramsReset = {
  Page: 1,
  PageCount: 10,
  AcademicYearCode: '',
  AcademicTermCode: '',
  AcademyCode: '',
  GradeCode: '',
  ClassCode: '',
  StudentType: '',
  StuUserCode: '',
  StuName: '',
  ApprovalStatus: 12,
};
const ObtainScoreOn = () => {
  const [configEntry, setConfigEntry] = useState([]);
  const [paramsOfEntry, setParamsOfEntry] = useState(paramsReset);
  // 表格条目总数
  const [mainTotal, setMainTotal] = useState(Number);
  const [mainloading, setMainloading] = useState(false);
  //查看详情
  const [checkDetails, setCheckDetails] = useState(false);
  //传递详情数据至detailsdisplay组件
  const [infoDetails, setInfoDetails] = useState(Object);
  const [form] = Form.useForm();
  const openDetails = values => {
    setInfoDetails(values);
    setCheckDetails(true);
  };
  const closeDetails = () => {
    setCheckDetails(false);
    setInfoDetails('');
  };

  //搜索表单提交
  const onFinish = values => {
    for (let i in values) {
      values[i] = values[i] ? values[i] : '';
    }
    const searchValues = Object.assign(values, { Page: 1, PageCount: 10 });
    console.log(searchValues);
    setParamsOfEntry(searchValues);
  };

  // 表单重置
  const onReset = () => {
    pageForContent.current.subPageChange(1);
    setParamsOfEntry(paramsReset);
  };

  //获取子组件方法 列表分页
  const pageForContent = useRef(null);
  //分页
  const onPageChange = values => {
    let copyOfEntry = {
      ...paramsOfEntry,
    };
    copyOfEntry.Page = values;
    setParamsOfEntry(copyOfEntry);
  };

  //获取主列表 传入子组件
  const getConfigForStandard = () => {
    setMainloading(true);
    //清空主列表
    setConfigEntry([]);
    getCreditsOfEntry(paramsOfEntry).then(res => {
      if (res.status == 200) {
        setMainloading(false);
        setMainTotal(res.data.Total);
        res.data.List &&
          res.data.List.forEach(item => {
            item.StartDate = moment(item.StartDate).format(
              'YYYY-MM-DD HH:mm:ss',
            );
          });
        setConfigEntry(res.data.List);
      }
    });
  };
  useEffect(() => {
    getConfigForStandard();
  }, [paramsOfEntry]);
  return (
    <>
      <Fragment>
        <Layout className={classNames(styles.frontpage, styles.drawerWrapper)}>
          {/*  <Header>
            {' '}
            <HeaderGroup />
          </Header> */}
          <SearchSubUnit onSearch={onFinish} onReset={onReset} />
          <Content className={classNames(styles.contentMain)}>
            <MainContent
              className={styles.tablePeri}
              mainloading={mainloading}
              openDetails={openDetails}
              onReset={onReset}
              ref={pageForContent}
              mainData={configEntry}
              pageTotal={mainTotal}
              pageChange={onPageChange}
            />
          </Content>
          <Modal
            title="查看详情"
            visible={checkDetails}
            onCancel={closeDetails}
            destroyOnClose={true}
            footer={
              <div>
                <Button className={styles.buttonApprove} htmlType="button">
                  确认
                </Button>
                <Button type="primary">取消</Button>
              </div>
            }
          >
            <DetailsSubUnit infoDetails={infoDetails} />
          </Modal>
        </Layout>
      </Fragment>
    </>
  );
};

export default ObtainScoreOn;
