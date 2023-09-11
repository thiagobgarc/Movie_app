import { View, Text, Dimensions, Image, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tailwind from 'twrnc'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading'
import { debounce } from 'lodash'
import { fallbackMoviePoster, fetchSearchMovies, image185 } from '../api/movieAPI'

const { width, height } = Dimensions.get('window');

const SearchScreen = () => {
    // const navigation = useNavigation()
    const navigation = useNavigation();
    // results
    const [results, setResults] = React.useState([]);
    // loading false
    const [loading, setLoading] = React.useState(false);
    // Movie Name
    let movieName = "Ant-Man and the Wasp: Quantumania";
    // handle search
    const handleSearch = (text: string) => {
        if (text && text.length > 2) {
            setLoading(true);
            fetchSearchMovies({
                query: text,
                include_adult: false,
                language: 'en-US',
                page: '1',
            }).then(data => {
                setLoading(false);
                if (data && data.results) setResults(data.results);
            })
        } else {
            setLoading(false);
            setResults([]);
        }
    }
    // handle Text Change
    const handleTextChange = React.useCallback(debounce(handleSearch, 400), [])

  return (
    <SafeAreaView style={tailwind`flex-1 bg-neutral-800`}>
        {/* search bar */}
      <View style={tailwind`flex-row justify-between items-center border border-neutral-500 rounded-full mx-4 mb-3`}>
        <TextInput
          onChangeText={handleTextChange}
          placeholder="Search Movies"
          placeholderTextColor={"lightgray"}
          style={tailwind`pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider`}
        />
        <TouchableOpacity
            onPress={() => navigation.goBack('Home')}
            style={tailwind`rounded-full p-3 n-1 bg-neutral-700`}
        >
            <XMarkIcon size={25} color={"white"} />
        </TouchableOpacity>
      </View>
      {/* results */}
    
    {
        loading ? (
            <Loading />
        ) : 
            
                results.length > 0? (
                    <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                style={tailwind`mt-3`}
              >
                <Text style={tailwind`text-white font-semibold mb-3 n-1`}>
                    Results ({results.length})
                </Text>
                <View style={tailwind`flex-row flex-wrap justify-between`}>
                    {
                        results.map((item: any, index: number) => {
                            const cardStyle = {
                                width: width * 0.44,
                                height: height * 0.3,
                            };
                            return (
                                <TouchableWithoutFeedback
                                    key={index}
                                    onPress={() => navigation.push('Movie', item)}
                                >
                                    <View style={tailwind`mt-2 mb-4`}>
                                        <Image style={[tailwind`rounded-3xl`, cardStyle]}
                                            source={{uri: `${ image185(item?.poster_path || fallbackMoviePoster) }`}}
                                        />
                                        <Text style={tailwind`text-neutral-400 ml-1`}>
                                            {
                                                item?.title.length > 22 ? item?.title.substring(0, 22) + "..." : item?.title
                                            }
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })
                    }
                </View>
              </ScrollView>  ): (
                  <View>
                      <Text style={tailwind`text-white text-2xl text-center justify-center font-semibold mb-3 mt-12`}>
                        No Results
                      </Text>
                      <Image
                          source={require('../images/movieTime.png')}
                          style={tailwind`h-96 w-96`}
                      />
                  </View>
                )
    }

     
    </SafeAreaView>
  )
}

export default SearchScreen