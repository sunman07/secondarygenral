import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  Fragment,
} from 'react';
import { Table, Divider, Row, Col, Button, message } from 'antd';
import styles from './acquirepoints.less';
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
        dataIndex: 'name',
        key: 'name',
        width: 100,
        fixed: 'left',

    },
    {
      title: '学号',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      fixed: 'left',

  },
  {
    title: '班级',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: 'left',

},
{
  title: '年级',
  dataIndex: 'name',
  key: 'name',
  width: 100,
  fixed: 'left',

},
{
  title: '院系',
  dataIndex: 'name',
  key: 'name',
  width: 100,
  fixed: 'left',

},
    {
        title: '思想政治素养',
        children: [
            {
                title: '已获积分',
                dataIndex: 'age',
                key: 'age',
                width: 150,
            },
            {
                title: '已获学分',
                dataIndex: 'age',

            }
        ],
    },
    {
        title: '创新创业模块',
        children: [
            {
                title: '已获积分',
                dataIndex: 'age',
                key: 'age',
                width: 150,
            },
            {
                title: '已获学分',
                dataIndex: 'age',
            }
        ],
    },
    {
      title: '文体活动模块+社会实践模块',
      children: [
          {
              title: '已获积分',
              dataIndex: 'age',
              key: 'age',
              width: 150,
          },
          {
              title: '已获学分',
              dataIndex: 'age',
          }
      ],
  }
];
  
 //导出
  const exportLet = () => {
 
  };
  return (
    <Fragment>
      <Row className={styles.mainApprove}>
        <Col span="24" align="right">
        <Button onClick={exportLet} className={styles.buttonApprove} type="primary">
            下载成绩单
          </Button>
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
