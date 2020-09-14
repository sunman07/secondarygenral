import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  Fragment,
} from 'react';
import { Table, Divider, Row, Col, Button, message } from 'antd';
import styles from './integraldata.less';
import { getApproveScore,getScoreOfEntry } from '@/services/service';
const MainContent = forwardRef((props, ref) => {
  const {
    mainData,
    pageTotal,
    pageChange,
    mainloading,
    onReset,
    openDetails,
  } = props;
  const [pageNum, setPageNum] = useState(1);
  useImperativeHandle(ref, () => ({
    subPageChange: subPageChange,
  }));
  const subPageChange = value => {
    setPageNum(value);
    pageChange(value);
  };

  //状态select字典
  const statusRead = [
    { statusCode: 12, name: '待审批' },
    { statusCode: 13, name: '审批不通过' },
    { statusCode: 14, name: '审批通过' },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'StuName',
      key: 'StuName',
    },
    {
      title: '学号',
      dataIndex: 'StuUserCode',
      key: 'StuUserCode',
    },
    {
      title: '班级',
      dataIndex: 'ClassName',
      key: 'ClassName',
    },


    {
      title: '年级',
      dataIndex: 'GradeName',
      key: 'GradeName',
    },
    {
      title: '院系',
      dataIndex: 'AcademyName',
      key: 'AcademyName',
    },


    {
      title: '模块',
      dataIndex: 'ModuleName',
      key: 'ModuleName',
    },
    {
      title: '项目',
      dataIndex: 'ItemName',
      key: 'ItemName',
    },
    {
      title: '标准',
      dataIndex: 'StandardName',
      key: 'StandardName',
    },


    {
      title: '获得积分',
      dataIndex: 'Score',
      key: 'Score',
    },
    {
      title: '原始分数',
      dataIndex: 'Score',
      key: 'Score',
    },
    {
      title: '获得日期',
      dataIndex: 'Score',
      key: 'Score',
    },
    {
      title: '来源',
      dataIndex: 'Score',
      key: 'Score',
    },
    {
      title: '审批日期',
      dataIndex: 'Score',
      key: 'Score',
    },
    {
      title: '审批人',
      dataIndex: 'Score',
      key: 'Score',
    },
    {
      title: '详细描述',
      dataIndex: 'address',
      render: (text, record) => {
        return (
          <a
            onClick={() => {
              openDetails(record);
            }}
          >
            点击查看
          </a>
        );
      },
    },
    {
      title: '附件',
      dataIndex: 'address',
      render: (text, record) => {
        return <a>点击查看</a>;
      },
    },
   /*  {
      title: '审批状态',
      dataIndex: 'ApprovalStatus',
      render: (text, record) => {
        return (
          <span>
            {
              statusRead[
                statusRead.findIndex(value => value.statusCode === text)
              ].name
            }
          </span>
        );
      },
    }, */
  ];
  
 //导出
  const exportLet = () => {
 
  };
  return (
    <Fragment>
      <Row className={styles.mainApprove}>
        <Col span="24" align="right">
          <Button onClick={exportLet} type="primary">
            导出
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={mainData}
        rowKey="RecordId"
        loading={mainloading}
        pagination={{
          total: pageTotal,
          pageSize: 10,
          current: pageNum,
          onChange: page => subPageChange(page),
        }}
        className={styles.tablePeri}
        bordered={true}
        hideOnSinglePage={false}
      />
    </Fragment>
  );
});
export default MainContent;
