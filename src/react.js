class Dom extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.handleAddOption = this.handleAddOption.bind(this);
  //   this.state = {
  //     error: undefined,
  //   };
  // }
  render() {
    return (
      <div>
        <h1>Hello world</h1>
      </div>
    );
  }
}

ReactDOM.render(<Dom />, document.querySelector("#output"));
