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

const testPureComponent = props => props;

// Tests
describe('fuzzReactComponent', () => {
  it('test pure component', () => {
    expect(fuzzReactComponent(testPureComponent, {})).toEqual([]);
  });

  it('test component', () => {
    expect(fuzzReactComponent(testComponent, {})).toEqual([]);
  });

  it('tests non component', () => {
    expect(() => fuzzReactComponent(5, {})).toThrow();
  });
});
