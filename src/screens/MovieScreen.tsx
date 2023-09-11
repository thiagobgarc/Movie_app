import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import tailwind from "twrnc";
import { styles, theme } from "../themes";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movie_List";
import Loading from "../components/loading";
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from "../api/movieAPI";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const iosMB = ios? '': `mb-2: mb-3`;


const MovieScreen = () => {

    const navigation = useNavigation();

    const { params: item } = useRoute();

    const [toggleFavorite, setToggleFavorite] = React.useState(false);

    const [cast, setCast] = React.useState([]);
    const [similarMovies, setSimilarMovies] = React.useState([]);
    const [movie, setMovie] = React.useState({});

    const [loading, setLoading] = React.useState(false);

    let movieName = "Ant-Man and the Wasp: Quantumania";

    React.useEffect(() => {
        setLoading(true);
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
      }, [item]);
    
    const getMovieDetails = async (id: number) => {
        const data = await fetchMovieDetails(id);
        if (data) setMovie(data);
        setLoading(false);
    }

    const getMovieCredits = async (id: number) => {
        const data = await fetchMovieCredits(id);
        if (data && data.cast) setCast(data.cast);
    }

    const getSimilarMovies = async (id: number) => {
        const data = await fetchSimilarMovies(id);
        if (data && data.results) setSimilarMovies(data.results);
    }

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            style={tailwind`flex-1 bg-neutral-900`}
        >
            {/* back button and movie poster*/}
            <View style={tailwind`w-full`}>
                <SafeAreaView style={[tailwind`absolute z-20 w-full flex-row items-center justify-between px-4 ${iosMB}`]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={[tailwind`rounded-xl p-1`, styles.background]}>
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color={"white"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setToggleFavorite(!toggleFavorite)}>
                        <HeartIcon size={35} color={toggleFavorite ? theme.background : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>
                
                {/* loading for image & gradient */}
            {
                loading ? (
                    <Loading />
                ) : (
                <View>
                    <Image
                        source={{ uri: `${image500(movie?.poster_path) || fallbackMoviePoster}` }}
                        style={[tailwind``, { width, height: height * 0.55 }]}
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(23,23,23,0.8),rgba(23,23,23,0.1)']}
                        style={[{ width, height: height * 0.40 }, tailwind`absolute bottom-0`]}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                    />
                </View>
                )
            }
            </View>

            {/* movie details */}
            <View style={[{ marginTop: height * 0.09 }, tailwind`mt-2`]}>
                {/* title */}
                <Text style={tailwind`text-white text-center text-2xl font-bold tracking-wide mb-2`}>
                    {
                        movie?.title
                    }
                </Text>
                    {/* status release date, runtime */}
                    {
                        movie?.id?(
                            <Text style={tailwind`text-neutral-400 font-semibold text-base text-center mb-2`}>
                                {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min
                            </Text>
                        ) : null
                    }
                {/* genres */}
                <View style={tailwind`flex-row justify-center mx-4 flex`}>
                    {
                        movie?.genres?.map((genre: any, index: number) => {
                            let showDot = index+1 < movie.genres.length
                            return (
                                <Text key={index} style={tailwind`text-neutral-400 text-base text-center mr-2`}>
                                    {genre.name} {showDot? "•": null}
                                </Text>
                            )
                        })
                    }
                </View>
                {/* overview */}
                <Text style={tailwind`text-neutral-400 mx-4 tracking-wide mt-4`}>
                    {movie?.overview}
                </Text>
            </View>
            {/* cast */}
            { cast.length >0 && <Cast navigation={navigation} cast={cast}/> }
            {/* similar movies */}
            { similarMovies.length > 0 && <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} /> }
        </ScrollView>
    );
}

export default MovieScreen;