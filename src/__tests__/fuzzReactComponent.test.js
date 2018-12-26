/* eslint-disable no-undef */

import { Component } from 'react';
import PropTypes from 'prop-types';
import { fuzzReactComponent } from '../';

// test components
class testComponent extends Component {
  static propTypes = {
    content: PropTypes.string,
  };
  static defaultProps = {
    content: 'test',
  };
  componentWillMount() {
    this.setState({
      mounted: true,
    });
  }
  render() {
    const { content } = this.props;
    return content;
  }
}

// eslint-disable-next-line react/no-multi-comp
class badComponent extends Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    content: PropTypes.string,
  };
  static defaultProps = {
    content: 'test',
  };
  componentWillMount() {
    this.setState({
      mounted: true,
    });
  }
  render() {
    return () => {};
  }
}

const testPureComponent = props => props;

// Tests
describe('fuzzReactComponent', () => {
  it('test pure component', () => {
    expect(fuzzReactComponent(testPureComponent, {})).toEqual([]);
  });

  it('test component', () => {
    expect(fuzzReactComponent(testComponent, {})).toEqual([]);
  });

  it('tests bad component', () => {
    expect(fuzzReactComponent(badComponent, {})).not.toEqual([]);
  });

  it('tests non component', () => {
    expect(() => fuzzReactComponent(5, {})).toThrow();
  });
});
