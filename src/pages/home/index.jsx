import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {PokeballLogo, PokemonLogo} from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {getPokemon} from '../../redux/pokeSlice';
import { capitalizeFirstLetter, generateIdImage, getLinkImage } from '../../helpers/general';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.pokemon);

  const CardPoke = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Details', {
            name: item?.name,
            url: item?.url,
            image: getLinkImage(generateIdImage(item?.url)),
          });
        }}
        style={styles.containerCard}>
        <Image
          source={{uri: getLinkImage(generateIdImage(item?.url))}}
          style={styles.iconPokeball}
        />
        <View style={styles.bodyName}>
          <Text style={styles.titleName}>{capitalizeFirstLetter(item?.name)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    dispatch(getPokemon());
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logoPokemon} source={PokemonLogo} />
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 14}}>
              {data?.length}
            </Text>
          </View>
          <Image style={styles.logoPokeball} source={PokeballLogo} />
        </View>
      </View>
      <View style={styles.containerBody}>
        <FlatList
          renderItem={CardPoke}
          numColumns={2}
          data={data}
          onEndReached={() => {
            dispatch(getPokemon());
          }}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoPokemon: {
    width: 90,
    height: 30,
  },
  logoPokeball: {
    width: 40,
    height: 40,
    marginLeft: 6,
  },
  containerCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eb3c34',
    borderRadius: 140 / 2,
    margin: 14,
    paddingBottom: 10,
    width: 140,
    height: 140,
  },
  iconPokeball: {
    width: 80,
    height: 80,
  },
  bodyName: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    textAlign: 'center',
    backgroundColor: '#3d3c41',
    borderRadius: 10,
  },
  titleName: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  containerBody: {
    alignItems: 'center',
  },
});
