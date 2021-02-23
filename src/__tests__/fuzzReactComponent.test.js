/* eslint-disable no-undef */

// eslint-disable-next-line max-classes-per-file
import { Component } from 'react';
import PropTypes from 'prop-types';
import { fuzzReactComponent } from '..';

// test components
class testComponent extends Component {
  render() {
    const { content } = this.props;
    return content;
  }
}

testComponent.propTypes = {
  content: PropTypes.string,
};

testComponent.defaultProps = {
  content: 'test',
};

// eslint-disable-next-line react/no-multi-comp
class badComponent extends Component {
  render() {
    return () => {};
  }
}

badComponent.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  content: PropTypes.string,
};

badComponent.defaultProps = {
  content: 'test',
};

const testPureComponent = (props) => props;

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
