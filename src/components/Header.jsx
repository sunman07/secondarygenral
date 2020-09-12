import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Card, Avatar, Tabs } from 'antd';
import styles from './Header.less';
const { Meta } = Card;
const { TabPane } = Tabs;

const HeaderGroup = () => {
  const [noTitleKey, setNoTitleKey] = useState('progress');

  const tabListNoTitle = [
    {
      key: 'progress',
      tab: '进度情况',
    },
    {
      key: 'scorestudy',
      tab: '学分数据',
    },
    {
      key: 'poiontdata',
      tab: '积分数据',
    },
  ];

  const contentListNoTitle = {
    progress: <p>积分数据</p>,
    scorestudy: <p>学分数据</p>,
    poiontdata: <p>学分数据</p>,
  };

  const onTabChange = (key, type) => {
    console.log(key, type);
    setNoTitleKey(key);
    // this.setState({ [type]: key });
  };

  return (
    <Card
      title="第二课堂"
      className={styles.headersheild}
      tabList={tabListNoTitle}
      activeTabKey={noTitleKey}
      onTabChange={key => {
        onTabChange(key, 'noTitleKey');
      }}
    >
      {/* <Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title="加分审批"
        description="Score Of Approvement"
      /> */}
      {contentListNoTitle[noTitleKey]}
    </Card>
  );
};

export default HeaderGroup;
