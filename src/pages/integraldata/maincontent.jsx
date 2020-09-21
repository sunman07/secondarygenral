import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  Fragment,
} from 'react';
import { Table, Divider, Row, Col, Button, message } from 'antd';
import styles from './integraldata.less';
import { exportIntegralData } from '@/services/service';
const MainContent = forwardRef((props, ref) => {
  const {
    mainData,
    pageTotal,
    pageChange,
    mainloading,
    onReset,
    openDetails,
    searchValues,
  } = props;
  const [pageNum, setPageNum] = useState(1);
  useImperativeHandle(ref, () => ({
    subPageChange: subPageChange,
  }));
  const subPageChange = value => {
    setPageNum(value);
    pageChange(value);
  };

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
      dataIndex: 'OriScore',
      key: 'OriScore',
    },
    {
      title: '时长',
      dataIndex: 'TimeLen',
      key: 'TimeLen',
    },
    {
      title: '获得日期',
      dataIndex: 'StartDate',
      key: 'StartDate',
    },
    {
      title: '来源',
      dataIndex: 'Source',
      key: 'Source',
    },
    {
      title: '审批日期',
      dataIndex: 'ApprovalDate',
      key: 'ApprovalDate',
    },
    {
      title: '审批人',
      dataIndex: 'Operator',
      key: 'Operator',
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
  ];

  //导出
  const exportLet = () => {
    console.log(searchValues, '参数');
    let paramsIntegral = searchValues;
    //单独请求文件下载
    exportIntegralData(paramsIntegral).then(res => {
      if (res.status === 200) {
        let blobs = res.data;
        let reader = new FileReader();
        reader.readAsDataURL(blobs);
        reader.onload = e => {
          // 转换完成，创建一个a标签用于下载
          let a = document.createElement('a');
          a.download = '积分数据.xlsx';
          a.href = e.target.result;
          a.click();
          message.success('下载成功');
        };
      } else {
        message.error('获取文件流失败');
      }
    });
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
