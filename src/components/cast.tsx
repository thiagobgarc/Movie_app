import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import tailwind from 'twrnc';
import { fallbackPersonImage, image185 } from '../api/movieAPI';

const cast = ({cast, navigation}: any) => {
    let castName = "Keanu Reeves";
    let characterName = "John Wick";
  return (
    <View style={tailwind`my-6`}>
      <Text style={tailwind`text-white text-lg mx-4 mb-5`}>Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {
          cast && cast.map((person: any, index: number) => {
            return (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('Person', person)}>
                <View style={tailwind`mr-4`}>
                  <View style={tailwind`overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500`}>
                  <Image
                    style={tailwind`rounded-2xl h-24 w-20`}
                    source={{ uri: `${ image185(person?.profile_path) || fallbackPersonImage }` }}
                  />
                  </View>
                  <Text style={tailwind`text-white text-xs mt-1`}>
                    {
                      person?.character.length > 10 ? person?.character.substring(0, 10) + "..." : person?.character
                    }
                    </Text>
                    <Text style={tailwind`text-neutral-400 text-xs mt-2`}>
                      {
                        person?.original_name.length > 10 ? person?.original_name.substring(0, 10) + "..." : person?.original_name
                      }
                    </Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View>
  );
}

export default cast;