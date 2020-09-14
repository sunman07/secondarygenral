import React, { useState, Fragment } from 'react';
import { Layout, Card } from 'antd';
const { Header, Content } = Layout;
import StandardConfigSecondary from './integraldata/index';
import ProgressMainPage from './statusprogress/index';
import ObtainScoreOn from './acquirepoints/index'
import styles from './index.less';
export default () => {
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
    progress: <ProgressMainPage />,
    scorestudy:<ObtainScoreOn />,
    poiontdata: <StandardConfigSecondary />,
  };

  const onTabChange = (key: React.SetStateAction<string>, type: string) => {
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
      {contentListNoTitle[noTitleKey]}
    </Card>
  );
};
