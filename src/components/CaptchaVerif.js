import React from 'react';
import { Captcha } from '@haikel/min-captcha';
import Input from './Input';

const captcha = new Captcha();
let rnd = captcha.getRndString({ nbChar: 4 });

const canvas = captcha.setupCanvas(
  {
    randString: rnd,
    sizeAndFont: "30px monospace"
  });

export default class CaptchaVerif extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.refs.captcha.appendChild(canvas);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4 mt-4" ref="captcha"></div>
        <div className="col-md-8">
          <Input
            type="text"
            placeholder="Enter captcha text"
            handleChange={(e) => this.props.handleCaptcha(e, rnd)} />
        </div>
      </div>
    )
  }
}
