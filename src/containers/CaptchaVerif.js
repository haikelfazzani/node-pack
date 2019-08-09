import React from 'react';
import Captcha from '@haikel/min-captcha';

const captcha = new Captcha();
let rnd = captcha.getRndString({ nbChars: 4 });

const canvas = captcha.setupCanvas({ randString: rnd, sizeAndFont: "30px monospace" });

export default class CaptchaVerif extends React.Component {

  componentDidMount() {
    this.refs.captcha.appendChild(canvas);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4 mt-4" ref="captcha"></div>
        <div className="col-md-8">


          <div className="form-group">
            <label htmlFor=""></label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter captcha text"
              value={this.props.value}
              onChange={(e) => this.props.handleCaptcha(e.target.value, rnd)}
            />
          </div>


        </div>
      </div>
    )
  }
}
