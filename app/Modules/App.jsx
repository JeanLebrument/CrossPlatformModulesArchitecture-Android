import { Reapp, React, NestedViewList, View, Button } from 'reapp-kit';

class App extends React.Component {
  render() {
    return (
      <NestedViewList {...this.props.viewListProps}>
        <SearchPageComponent></SearchPageComponent>
      </NestedViewList>
    );
  }
}

export default Reapp(App);

/*
 This is your root route. When you wrap it with Reapp()
 it passes your class two properties:

  - viewListProps: Passes the scrollToStep to your ViewList so it animates
  - child: The child route
*/
