/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { getAbility } from '../../redux/pokeSlice';
import { capitalizeFirstLetter } from '../../helpers/general';

const DetailsPage = ({route}) => {
  const dispatch = useDispatch();

  const {ability} = useSelector((state) => state.pokemon);
  const {name, url, image} = route?.params;

  // eslint-disable-next-line react/no-unstable-nested-components
  const typesPokemon = ability?.types?.map(v => v?.type?.name).join(', ');


  const Information = ({title, body}) => {
    return (
      <View style={styles.containerInformation}>
        <Text style={styles.nameAbility}>{title}</Text>
        <Text style={styles.nameAbility}>{body}</Text>
      </View>
    );
  };

  const Abilities = ({item}) => {
    return (
      <View style={styles.bodyAbility}>
        <Text style={styles.nameAbility}>{capitalizeFirstLetter(item.ability?.name)}</Text>
      </View>
    );
  };

  const Status = ({item}) => {
    return (
      <View style={styles.bodyStatus}>
        <View
          style={{
            padding: 6,
            backgroundColor: '#ef5350',
            width:  Number(item.base_state) > 100 ? '100%' : `${item.base_stat}%`,
          }}>
          <Text style={{fontSize: 14, color: '#FFFFFF', fontWeight: 'bold'}}>
            {capitalizeFirstLetter(item.stat.name)} {item.base_stat}
          </Text>
        </View>
      </View>
    );
  };

  

  useEffect(() => {
    dispatch(getAbility(url));
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <View style={styles.container}>
        <Text style={styles.titleHeader}>{capitalizeFirstLetter(name)}</Text>
        <View style={styles.containerImage}>
          <View style={styles.bodyImage}>
            <Image style={styles.imagePokemon} source={{uri: image}} />
          </View>
        </View>
        <View style={styles.containerAbility}>
          <Text style={styles.titleAbility}>Information: </Text>
          <Information title={"Name"} body={capitalizeFirstLetter(name)}  />
          <Information title={"Weight"} body={ability?.weight?.toString()}  />
          <Information title={"Height"} body={ability?.height?.toString()}  />
          <Information title={"Type"} body={typesPokemon}  />



        </View>
        <View style={styles.containerAbility}>
          <Text style={styles.titleAbility}>Abilities: </Text>
          <FlatList
            scrollEnabled={false}
            renderItem={Abilities}
            data={ability?.abilities}
          />
        </View>
        <View style={styles.containerAbility}>
          <Text style={styles.titleAbility}>Stats: </Text>
          <FlatList
            scrollEnabled={false}
            renderItem={Status}
            data={ability?.stats}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  imagePokemon: {
    width: 150,
    height: 150,
  },
  titleHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  bodyImage: {
    width: 160,
    height: 160,
    backgroundColor: '#eb3c34',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 160 / 2,
  },
  containerImage: {
    alignItems: 'center',
    marginTop: 12,
  },
  titleAbility: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  containerAbility: {
    marginTop: 16,
  },
  containerInformation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#ef5350',
    color: '#FFFFFF',
    margin: 6,
  },
  bodyAbility: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#4592c4',
    color: '#FFFFFF',
    margin: 6,
  },
  nameAbility: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bodyStatus: {
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#ef5350',
    margin: 6,
  },
});
