import React, { Fragment } from 'react';
import SearchFormUnit from './searchform';
import ChartPartUnit from './chartunit';
import MainContainEntry from './mainentry'
import { Layout } from 'antd';

const { Content } = Layout;

const ProgressMainPage = props => {
  return (
    <Fragment>
      <SearchFormUnit />
      <ChartPartUnit />
      <MainContainEntry />
    </Fragment>
  );
};

export default ProgressMainPage;
