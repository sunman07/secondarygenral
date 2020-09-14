import React, { Fragment, useState, useEffect,useRef } from 'react';
import { getScoreOfEntry } from '@/services/service';
import SearchFormUnit from './searchform';
import ChartPartUnit from './chartunit';
import MainContainEntry from './mainentry'
import { Layout } from 'antd';

const { Content } = Layout;

const ProgressMainPage = props => {
  const [entryLoading, setEntryLoading] = useState([]);
  //主列表
  const [chargeEntry, setChargeEntry] = useState([]);

  const [mainTotal, setMainTotal] = useState(Number);
  //参数
  const [paramsOfEntry, setParamsOfEntry] = useState({
    Page: 1,
    PageCount: 10,
  });
  //获取主列表 传入子组件
  const getClassEntryStandard = () => {
    setEntryLoading(true);
    //清空主列表
    setChargeEntry([]);
    getScoreOfEntry(paramsOfEntry).then(res => {
      console.log(res);
      if (res.status == 200) {
        setEntryLoading(false);
        let index = 0;
        setMainTotal(res.data.Total);
        res.data.List &&
          res.data.List.forEach(item => {
            index++;
            item.key = index;
            item.StartDate = moment(item.StartDate).format(
              'YYYY-MM-DD HH:mm:ss',
            );
          });
        setChargeEntry(res.data.List);
      }
    });
  };
  //搜索表单提交
  const onFinish = values => {
    console.log(values)
    let searchValues = Object.assign(values, paramsOfEntry);
    setParamsOfEntry(searchValues);
  };

  //表单重置
  const onReset = () => {
    pageForMainEntry.current.subPageChange(1);
    setParamsOfEntry({
      Page: 1,
      PageCount: 10,
    });
  };
  //获取子组件方法 列表分页
  const pageForMainEntry = useRef(null);

  //分页
  const onPageChange = values => {
    let copyOfEntry = {
      ...paramsOfEntry,
    };
    copyOfEntry.Page = values;
    setParamsOfEntry(copyOfEntry);
  };
  useEffect(() => {
    getClassEntryStandard();
  }, [paramsOfEntry]);

  return (
    <Fragment>
      <SearchFormUnit onSearch={onFinish} onReset={onReset} />
      <ChartPartUnit />
      <MainContainEntry ref={pageForMainEntry}  mainData={chargeEntry}   pageTotal={mainTotal}
              pageChange={onPageChange} onReset={onReset} mainloading={entryLoading} />
    </Fragment>
  );
};

export default ProgressMainPage;
