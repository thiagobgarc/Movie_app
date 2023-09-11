import { View, Text, Dimensions, Platform, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import tailwind from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles, theme } from '../themes';
import MovieList from '../components/movie_List';
import Loading from '../components/loading';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from '../api/movieAPI';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == "ios";
const iosMY = ios? '': `my-3`;

const PersonScreen = () => {
    // params
    const { params: item } = useRoute();
    // navigation
    const navigation = useNavigation();
    // toggle favorite
    const [toggleFavorite, setToggleFavorite] = React.useState(false);
    // person Movie details
    const [personInMovies, setPersonInMovies] = React.useState([]);
    // person details
    const [person, setPerson] = React.useState({});
    // loading false
    const [loading, setLoading] = React.useState(false);
    
    let castName = "Keanu Reeves";

    React.useEffect(() => {
        setLoading(true);
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    }, [item])

    const getPersonDetails = async (id: number) => {
        const data = await fetchPersonDetails(id);
        if (data) setPerson(data);
        setLoading(false);
    }

    const getPersonMovies = async (id: number) => {
        const data = await fetchPersonMovies(id);
        if (data && data.cast) setPersonInMovies(data.cast);
    }

  return (
    <ScrollView style={[tailwind`flex-1 bg-neutral-900`, { paddingBottom: 20 }]}>
      {/* back button */}
      <SafeAreaView style={[tailwind`z-20 w-full flex-row items-center justify-between px-4 ${iosMY}`]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[tailwind`rounded-xl p-1`, styles.background]}>
            <ChevronLeftIcon size={28} strokeWidth={2.5} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setToggleFavorite(!toggleFavorite)}>
            <HeartIcon size={35} color={toggleFavorite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>
      {/* loading */}
    {
        loading ? (
            <Loading />
        ) : (
            /* person details */
        <View>
            <View style={[tailwind`flex-row justify-center`, { shadowColor: 'gray', shadowRadius: 40, shadowOpacity: 1, shadowOffset: { width: 0, height: 5 } }]}>
                <View style={tailwind`items-center rounded-full overflow-hidden border-2 border-neutral-500 w-72 h-72`}>
                    <Image
                        style={[tailwind``, { width: width*0.74, height: height*0.43 }]}
                        source={{ uri: `${ image342(person?.profile_path) || fallbackPersonImage }` }}
                    />
                </View>
            </View>
            {/* person name */}
            <View style={tailwind`mt-6`}>
                <Text style={tailwind`text-3xl text-white font-bold text-center`}>
                    {person?.name}
                </Text>
                <Text style={tailwind`text-neutral-500 text-center text-base`}>
                    {person?.place_of_birth}
                </Text>
                <View style={tailwind`mx-3 mt-6 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full`}>
                    {/* Gender */}
                    <View style={tailwind`items-center border-r-2 border-r-neutral-400 px-2`}>
                        <Text style={tailwind`text-white font-semibold`}>
                            Gender
                        </Text>
                        <Text style={tailwind`text-neutral-300 text-sm`}>
                            {
                                person?.gender == 1 ? "Female" : "Male"
                            }
                        </Text>
                    </View>
                    {/* Birthday */}
                    <View style={tailwind`items-center border-r-2 border-r-neutral-400 px-2`}>
                        <Text style={tailwind`text-white font-semibold`}>
                            Birthday
                        </Text>
                        <Text style={tailwind`text-neutral-300 text-sm`}>
                            {
                                person?.birthday
                            }
                        </Text>
                    </View>
                    {/* Known for */}
                    <View style={tailwind`items-center border-r-2 border-r-neutral-400 px-2`}>
                        <Text style={tailwind`text-white font-semibold`}>
                            Known for
                        </Text>
                        <Text style={tailwind`text-neutral-300 text-sm`}>
                            {
                                person?.known_for_department
                            }
                        </Text>
                    </View>
                    {/* Popularity */}
                    <View style={tailwind`items-center px-2`}>
                        <Text style={tailwind`text-white font-semibold`}>
                            Popularity
                        </Text>
                        <Text style={tailwind`text-neutral-300 text-sm`}>
                            {
                                person?.popularity?.toFixed(2)
                            }
                        </Text>
                    </View>
                </View>
            </View>
            {/* biography */}
            <View style={tailwind`my-6 mx-4`}>
                <Text style={tailwind`text-white text-lg`}>
                    Biography
                </Text>
                <Text style={tailwind`text-neutral-400 tracking-wide`}>
                {
                    person?.biography || "N/A"
                }
                </Text>
            </View>
            {/* Movies */}
            <MovieList title="Movies" data={personInMovies} hideSeeAll={true} />
      </View>
        )
    }

      
    </ScrollView>
  );
}

export default PersonScreen;