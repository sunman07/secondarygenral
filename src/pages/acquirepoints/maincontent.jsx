import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  Fragment,
} from 'react';
import { Table, Divider, Row, Col, Button, message } from 'antd';
import styles from './acquirepoints.less';
import { getApproveScore, exportAcquireData } from '@/services/service';
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

  //初始化表头

  let columns = [
    {
      title: '姓名',
      dataIndex: 'StuName',
      key: 'StuName',
      width: 100,
      fixed: 'left',
    },

    {
      title: '学号',
      dataIndex: 'StuUserCode',
      key: 'StuUserCode',
      width: 100,
      fixed: 'left',
    },
    {
      title: '班级',
      dataIndex: 'ClassName',
      key: 'ClassName',
      width: 100,
      fixed: 'left',
    },
    {
      title: '年级',
      dataIndex: 'GradeName',
      key: 'GradeName',
      width: 100,
      fixed: 'left',
    },
    {
      title: '院系',
      dataIndex: 'AcademyName',
      key: 'AcademyName',
      width: 100,
      fixed: 'left',
    },
  ];

  //处理表格children项方法
  const copeWithMainArray = mainData => {
    let detailsCol = [];
    if (mainData && mainData.length > 0) {
      detailsCol = columns;
      let itemCope = [];
      //将请求结果mainData children项全部择出
      mainData.map((item, index) => {
        item.Transcript.map((tiny, num) => {
          item[`credit${num}`] = tiny.Credit;
          item[`integral${num}`] = tiny.Integral;
        });
      });
      //将请求结果mainData加入到column中(表头)
      mainData[0].Transcript.map((subject, index) => {
        itemCope = {
          title: subject.ModuleName,
          children: [
            {
              title: '已获积分',
              dataIndex: `integral${index}`,
              key: `integral${index}`,
              width: 150,
            },
            {
              title: '已获学分',
              dataIndex: `credit${index}`,
              key: `credit${index}`,
            },
          ],
        };
        detailsCol.push(itemCope);
      });
    }
    return detailsCol;
  };

  columns = copeWithMainArray(mainData);

  //导出
  const exportLet = () => {
    let paramsIntegral = searchValues;

    //单独请求文件下载
    exportAcquireData(paramsIntegral).then(res => {
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
          <Button
            onClick={exportLet}
            className={styles.buttonApprove}
            type="primary"
          >
            下载成绩单
          </Button>
          <Button onClick={exportLet} type="primary">
            导出
          </Button>
        </Col>
      </Row>
      {
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
      }
    </Fragment>
  );
});
export default MainContent;
