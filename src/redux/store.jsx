import {configureStore} from '@reduxjs/toolkit';
import getPokemonSlice from './pokeSlice';

const store = configureStore({
  reducer: {
    pokemon: getPokemonSlice,
  },
});

export default store;
