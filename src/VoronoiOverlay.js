import React, { Component } from 'react';
import { select } from 'd3';

export default class VoronoiOverlay extends Component {

  static propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string,
      lat: React.PropTypes.number.isRequired,
      lng: React.PropTypes.number.isRequired,
      value: React.PropTypes.number.isRequired,
    }))
  };

  constructor() {
    super();
    console.log('VoronoiOverlay: constructor');
    // setTimeout(() => {
    //   this.setState({
    //     a: 1
    //   })
    // }, 2000)
  }


  componentDidMount() {
    console.log('VoronoiOverlay: componentDidMount');
    select(this.refs.wrapper);
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    console.log('VoronoiOverlay: render');
    return <div ref="wrapper" style={{
      background: 'white',
      border: '1px solid #ccc',
      padding: 15,}}
    >
      XXX
    </div>;
  }
}
