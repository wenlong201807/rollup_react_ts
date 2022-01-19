import React from 'react';
import svg from './static/svg/demo1.svg';
import Switch from './Components/Switch';
import close_black from './static/svg/close_black.svg';
import __more from './static/img/__more.png';
import testPic from './static/img/test.jpg';
// import './app.scss';
import './app.scss';
// import styles from './test.scss'; // 未生效

import { Queue } from '@songjp/dry'

export default function App() {
  console.info(svg,'zhuwenlong1');
  console.log(new Queue().isEmpty())
  return <div>
    <div>svg,png,jpge</div>
    <img src={svg} alt="" />
    <img src={close_black} alt="" />
    <img src={__more} alt="" />
    <img src={testPic} alt="" />
    <p>Rollup + TypeScript + React</p>
    <p className="test">我是自定义样式--未生效？？</p>
    <Switch pageName="mySwitch" />
  </div>;
}
