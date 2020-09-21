import React, { Fragment, useState, useEffect, useRef } from 'react';
import {
  getScoreOfEntry,
  getSystemOfParameter,
  getTermAllClass,
  getProgressWithAll,
  getProgressAllAcademy,
} from '@/services/service';
import SearchFormUnit from './searchform';
import ChartPartUnit from './chartunit';
import MainContainEntry from './mainentry';
import { message, Layout } from 'antd';

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
    AcademicYearCode: '',
    AcademicTermCode: '',
    StudentType: '',
    GradeCode: '',
    AcademyCode: '',
  });
  //搜索范围 传递给子组件
  const [scopeOfSystem, setScopeOfSystem] = useState([]);
  const [entryForCharts, setEntryForCharts] = useState([]);
  //获取系统参数 确定当前角色获取学年/学期范围
  const getSystemConfig = () => {
    getSystemOfParameter().then(res => {
      if (res.status === 200) {
        let paramSystemAll = [];
        switch (res.data.Value) {
          case '1':
            paramSystemAll = ['AcademicTerm', 'AcademicYear'];
            break;
          case '3':
            paramSystemAll = ['AcademicYear', ''];
            break;
          default:
            paramSystemAll = ['', ''];
            break;
        }
        getTermSumAllClass(paramSystemAll);
      } else {
        message.error('获取系统参数失败,无法获取范围字典');
      }
    });
  };

  const getTermSumAllClass = params => {
    getTermAllClass(params).then(res => {
      if (res.status === 200) {
        setScopeOfSystem(res.data.list);
      } else {
        message.error('获取范围字典失败');
      }
    });
  };
  //获取主列表 传入子组件
  const getClassEntryStandard = () => {
    setEntryLoading(true);
    //清空主列表
    setChargeEntry([]);
    getProgressWithAll(paramsOfEntry).then(res => {
      if (res.status === 200) {
        console.log(res.data.List, '整体进度');
        setEntryForCharts(res.data.List);
      }
    });
    getProgressAllAcademy(paramsOfEntry).then(res => {
      if (res.status == 200) {
        setEntryLoading(false);
        let index = 0;
        setMainTotal(res.data.Total);
        /*  res.data.List &&
           res.data.List.forEach(item => {
             index++;
             item.key = index;
             item.StartDate = moment(item.StartDate).format(
               'YYYY-MM-DD HH:mm:ss',
             );
           }); */
        setChargeEntry(res.data.List);
      }
    });
  };
  //搜索表单提交
  const onFinish = values => {
    for (let item in values) {
      !values[item] ? (values[item] = '') : values[item];
    }
    console.log(values);
    const page = { Page: 1, PageCount: 10 };
    let searchValues = Object.assign(values, page);
    setParamsOfEntry(searchValues);
  };

  //表单重置
  const onReset = () => {
    pageForMainEntry.current.subPageChange(1);
    setParamsOfEntry({
      Page: 1,
      PageCount: 10,
      AcademicYearCode: '',
      AcademicTermCode: '',
      StudentType: '',
      GradeCode: '',
      AcademyCode: '',
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
  useEffect(() => {
    getSystemConfig();
  }, []);

  return (
    <Fragment>
      <SearchFormUnit
        onSearch={onFinish}
        onReset={onReset}
        scopeOfSystem={scopeOfSystem}
      />
      <ChartPartUnit entryForCharts={entryForCharts} />
      <MainContainEntry
        ref={pageForMainEntry}
        mainData={chargeEntry}
        pageTotal={mainTotal}
        pageChange={onPageChange}
        onReset={onReset}
        mainloading={entryLoading}
      />
    </Fragment>
  );
};

export default ProgressMainPage;
