import React, {
  useState,
  Fragment,
  forwardRef,
  useImperativeHandle,
} from 'react';
import styles from './statusprogress.less';
import { Table } from 'antd';
const MainContainEntry = forwardRef((props, ref) => {
  const { pageTotal, pageChange, mainData } = props;
  const [pageNum, setPageNum] = useState(1);
  useImperativeHandle(ref, () => ({
    subPageChange: subPageChange,
  }));
  const subPageChange = value => {
    setPageNum(value);
    pageChange(value);
  };

  let columns = [
    {
      title: '班级',
      dataIndex: 'ClassName',
      key: 'ClassName',
      width: 100,
      fixed: 'left',
    },
    {
      title: '积分情况(平均值)',
      children: [],
    },
    {
      title: '学分情况(平均值)',
      children: [],
    },
  ];

  const copeWithMainArray = mainData => {
    let detailsCol = columns;
    let itemCope = [];
    let itemDeal = [];
    if (mainData && mainData.length > 0) {
      mainData[0].Transcript.map((item, index) => {
        itemCope = {
          title: item.ModuleName,
          dataIndex: ['Transcript', index, 'Integral'],
        };
        itemDeal = {
          title: item.ModuleName,
          dataIndex: ['Transcript', index, 'Credit'],
        };
        detailsCol[1].children.push(itemCope);
        detailsCol[2].children.push(itemDeal);
      });
    }
    console.log(mainData, '获取标准内容', detailsCol);
    return detailsCol;
  };
  columns = copeWithMainArray(mainData);

  const dataMainEntry = [];
  for (let i = 0; i < 100; i++) {
    dataMainEntry.push({
      key: i,
      name: `机电180${i}班`,
      age: i + 1,
      street: 'Lake Park',
      building: 'C',
      number: 2035,
      companyAddress: 'Lake Street 42',
      companyName: 'SoftLake Co',
      gender: 'M',
    });
  }

  return (
    <Fragment>
      <div className={styles.entryMain}>
        <Table
          className={styles.entryContain}
          columns={columns}
          dataSource={mainData}
          pagination={{
            total: pageTotal,
            pageSize: 10,
            current: pageNum,
            onChange: page => subPageChange(page),
          }}
          bordered
          size="middle"
          scroll={{ x: 'calc(700px + 50%)', y: 140 }}
        />
      </div>
    </Fragment>
  );
});

export default MainContainEntry;
