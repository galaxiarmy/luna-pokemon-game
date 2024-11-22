import axios from 'axios';
import React, {memo, useCallback, useRef, useState} from 'react';
import {Button, Dimensions, Text, View} from 'react-native';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';

export const Dropdown = memo(({title, selectedItem, setSelectedItem}) => {
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const dropdownController = useRef(null);

  const searchRef = useRef(null);

  const getSuggestions = useCallback(async q => {
    const filterToken = q.toLowerCase();
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList(null);
      return;
    }
    setLoading(true);
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=1&limit=99999');
    const items = await response.json();

    const suggestions = items?.results
      .filter(item => item.name.toLowerCase().includes(filterToken))
      .map((item, idx) => ({
        id: item.url,
        title: item.name,
      }));

    setSuggestionsList(suggestions);
    setLoading(false);
  }, []);

  const onClearPress = useCallback(() => {
    setSelectedItem(null)
    setSuggestionsList(null);
  }, []);

  const onOpenSuggestionsList = useCallback(isOpened => {}, []);

  return (
    <>
       <Text style={{color: '#668', fontSize: 16, fontWeight: "bold"}}>
        Compare Pokemon {title}
      </Text>
      <View style={[{flex: 0, flexDirection: 'row', alignItems: 'center'}]}>
        <AutocompleteDropdown
          ref={searchRef}
          controller={controller => {
            dropdownController.current = controller;
          }}
          // initialValue={'1'}
          // direction={Platform.select({ ios: 'down' })}
          dataSet={suggestionsList}
          onChangeText={getSuggestions}
          onSelectItem={item => {
            item && setSelectedItem(item.id);
          }}
          debounce={600}
          suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
          onClear={onClearPress}
          //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
          onOpenSuggestionsList={onOpenSuggestionsList}
          loading={loading}
          useFilter={false} // set false to prevent rerender twice
          textInputProps={{
            placeholder: 'Type 3+ letters (to show list)',
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              borderRadius: 25,
              backgroundColor: '#383b42',
              color: '#fff',
              paddingLeft: 18,
            },
          }}
          rightButtonsContainerStyle={{
            right: 8,
            height: 30,

            alignSelf: 'center',
          }}
          inputContainerStyle={{
            backgroundColor: '#383b42',
            borderRadius: 25,
          }}
          suggestionsListContainerStyle={{
            backgroundColor: '#383b42',
          }}
          containerStyle={{flexGrow: 1, flexShrink: 1}}
          renderItem={(item, _) => (
            <Text style={{color: '#FFFFFF', padding: 15}}>{item.title}</Text>
          )}
          inputHeight={50}
          showChevron={false}
          closeOnBlur={false}
        />
        <View style={{width: 10}} />
        <Button
          style={{flexGrow: 0}}
          title="Show"
          onPress={() => dropdownController.current.toggle()}
        />
      </View>
    </>
  );
});
