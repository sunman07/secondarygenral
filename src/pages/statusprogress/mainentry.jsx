
import React, { useState, Fragment,forwardRef,  useImperativeHandle } from 'react';
import styles from './statusprogress.less';
import { Table } from 'antd';
const MainContainEntry = forwardRef((props, ref) => {
    const {
        mainData,
        pageTotal,
        pageChange,
        mainloading,
        onReset,
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
            title: '班级',
            dataIndex: 'name',
            key: 'name',
            width: 100,
            fixed: 'left',

        },
        {
            title: '积分情况(平均值)',
            children: [
                {
                    title: '思想政治素养',
                    dataIndex: 'age',
                    key: 'age',
                    width: 150,
                },
                {
                    title: '创新创业模块',
                    dataIndex: 'age',

                },
                {
                    title: '文体活动模块',
                    dataIndex: 'age',
                },
                {
                    title: '社会实践模块',
                    dataIndex: 'age',
                },
            ],
        },
        {
            title: '学分情况(平均值)',
            children: [
                {
                    title: '思想政治素养',
                    dataIndex: 'age',
                    key: 'age',
                    width: 150,
                },
                {
                    title: '创新创业模块',
                    dataIndex: 'age',
                },
                {
                    title: '文体活动模块+社会实践模块',
                    dataIndex: 'age',
                },
            ],
        },
    ];

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

    return (<Fragment><div className={styles.entryMain}><Table
        className={styles.entryContain}
        columns={columns}
        dataSource={dataMainEntry}
        pagination={{
            total: pageTotal,
            pageSize: 10,
            current: pageNum,
            onChange: page => subPageChange(page),
          }}
        bordered
        size="middle"
        scroll={{ x: 'calc(700px + 50%)', y: 140 }}
    /></div></Fragment>)

})

export default MainContainEntry