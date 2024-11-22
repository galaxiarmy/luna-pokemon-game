import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from '../../components/dropdown-search';
import axios from 'axios';
import {capitalizeFirstLetter} from '../../helpers/general';

const CompareScreen = () => {
  const [selectedFirst, setSelectedFirst] = useState(null);
  const [selectedSecond, setSelectedSecond] = useState(null);
  const [dataPokeFirst, setDatePokeFirst] = useState(null);
  const [dataPokeSecond, setDataPokeSecond] = useState(null);
  const [loading, setLoading] = useState(false);

  const queryDataPokemon = async url => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      return res?.data;
    } catch (err) {
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = async () => {
    if (selectedFirst !== null && selectedSecond !== null) {
      const data1 = await queryDataPokemon(selectedFirst);
      const data2 = await queryDataPokemon(selectedSecond);

      setDatePokeFirst(data1);
      setDataPokeSecond(data2);

    } else {
      Alert.alert('Compare Data', 'Pokemon 1 and Pokemon 2 must fill!', [
        {text: 'OK'},
      ]);
    }
  };

  const Status = ({item, type}) => {
    return (
      <View
        style={{
          ...styles.bodyStatus,
          borderColor: type === 1 ? '#eb3c34' : '#4592c4',
        }}>
        <View
          style={{
            padding: 6,
            backgroundColor: type === 1 ? '#eb3c34' : '#4592c4',
            width:
              Number(item.base_state) > 100 ? '100%' : `${item.base_stat}%`,
          }}>
          <Text style={{fontSize: 14, color: '#FFFFFF', fontWeight: 'bold'}}>
            {capitalizeFirstLetter(item.stat.name)} {item.base_stat}
          </Text>
        </View>
      </View>
    );
  };

  const CardPoke = ({items, type}) => {
    return (
      <View>
        <View style={styles.containerImage}>
          <View
            style={{
              ...styles.bodyImage,
              backgroundColor: type === 1 ? '#eb3c34' : '#4592c4',
            }}>
            <Image
              style={styles.imagePokemon}
              source={{uri: items?.sprites?.front_default}}
            />
          </View>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {capitalizeFirstLetter(items?.name)}
          </Text>
        </View>
        <View>
          <FlatList
            scrollEnabled={false}
            renderItem={(itemss) => Status({item: itemss?.item, type: type})}
            data={items?.stats}
          />
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Dropdown
          title={'1'}
          selectedItem={selectedFirst}
          setSelectedItem={setSelectedFirst}
        />
        <Dropdown
          title={'2'}
          selectedItem={selectedSecond}
          setSelectedItem={setSelectedSecond}
        />
        <View
          style={{
            marginTop: 16,
          }}>
          <Button onPress={handleCompare} color={'green'} title="Compare" />
        </View>
        {loading ? (
          <ActivityIndicator size={50} />
        ) : dataPokeFirst !== null && dataPokeSecond !== null ? (
          <View>
            <CardPoke items={dataPokeFirst} type={1} />
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              VS
            </Text>
            <CardPoke items={dataPokeSecond} type={2} />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default CompareScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bodyImage: {
    width: 100,
    height: 100,
    backgroundColor: '#eb3c34',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100 / 2,
  },
  containerImage: {
    alignItems: 'center',
    marginTop: 12,
  },
  imagePokemon: {
    width: 90,
    height: 90,
  },
  bodyStatus: {
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#ef5350',
    margin: 6,
  },
});
