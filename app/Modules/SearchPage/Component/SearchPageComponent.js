import { Reapp, React, View, Button, Image } from 'reapp-kit';

var SearchPageAction = require('../../../../../Core/Modules/SearchPage/Action/SearchPageAction');
var SearchPageStore = require('../../../../../Core/Modules/SearchPage/Store/SearchPageStore');
var SearchPageOutput = require('../Output/SearchPageOutput');

class SearchPageComponent extends React.Component {
  resultsFounds() {
    var results = SearchPageStore.getResults();
    var formatedLocation = results && results.location ? results.location : '';

    console.log('formatedLocation: ' + formatedLocation);

    this.setState({
      searchString: formatedLocation,
      isLoading: false,
      resultError: SearchPageStore.getResultError()
    });

    if (results && results.listings &&
      (this.state.resultError === '' || !this.state.resultError))
      SearchPageOutput.goToNextModule(this, results.listings);
  }

  componentDidMount() {
    SearchPageStore.addChangeListener(this.resultsFounds.bind(this));
  }

  componentWillUnmount() {
    SearchPageStore.removeChangeListener(this.resultsFounds.bind(this));
  }

  onSearchPressed() {
    if (this.state.isLoading == false) {
      this.setState({isLoading: true});
      SearchPageAction.searchResultsForLocation(this.state.searchString);
    }
  }

  onLocationPressed() {
    if (this.state.isLoading == false) {
      this.setState({isLoading: true});
      SearchPageAction.searchResultsForCurrentLocation();
    }
  }

  onSearchTextChanged(event) {
    this.setState({ searchString: event.nativeEvent.text });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for houses to buy!
        </Text>
        <Text style={styles.description}>
          Search by place-name, postcode or search near your location.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            placeholder='Search via name or postcode'
            value={this.state.searchString}
            onChange={this.onSearchTextChanged.bind(this)}/>
          <Button style={styles.button}
              underlayColor='#99d9f4'
              onTap={this.onSearchPressed.bind(this)}>
            <Text style={styles.buttonText}>Go</Text>
          </Button>
        </View>
        <Button style={styles.button}
            onTap={this.onLocationPressed.bind(this)}
            underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Location</Text>
        </Button>
        <Image source={require('image!house')} style={styles.image}/>
        {spinner}
        <Text style={styles.description}>{this.state.resultError}</Text>
      </View>
    );
  }
}

export default Reapp(SearchPageComponent);

/*
 This is your root route. When you wrap it with Reapp()
 it passes your class two properties:

  - viewListProps: Passes the scrollToStep to your ViewList so it animates
  - child: The child route
*/
