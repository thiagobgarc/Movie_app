import { Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tailwind from "twrnc";
import { StatusBar } from "expo-status-bar";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { styles } from "../themes";
import TrendingMoviesCarousel from "../components/trending_movies_carousel";
import MovieList from "../components/movie_List";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { fetchTrendingMovies, fetchUpcomingMovies, fetchTopRatedMovies } from "../api/movieAPI";

// ios or android
const ios = Platform.OS == "ios";
let iosMB = `mb-2: mb-3`;

// HomeScreen function
const HomeScreen = () => {
    // trending movies
    const [trending, setTrending] = React.useState([]);
    // upcoming movies
    const [upcoming, setUpcoming] = React.useState([]);
    // top rated
    const [topRated, setTopRated] = React.useState([]);
    // loading
    const [loading, setLoading] = React.useState(true);
    // navigation
    const navigation = useNavigation();

    // useEffect get trending upcoming and top rated
    React.useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, []);

    // get trending movies
    const getTrendingMovies = async () => {
        // get data on trending movies
        const data = await fetchTrendingMovies();
        // console.log('got trending movies', data);
        console.log('got trending movies', data);
        // if data is not empty set trending movies
        if (data && data.results) setTrending(data.results);
        // set loading to false
        setLoading(false); 
    }

    // get upcoming movies
    const getUpcomingMovies = async () => {
        // get data on upcoming movies
        const data = await fetchUpcomingMovies();
        // console.log('got upcoming movies', data);
        // console.log('got upcoming movies', data);
        // if data is not empty set upcoming movies
        if (data && data.results) setUpcoming(data.results);
    }

    // get top rated movies
    const getTopRatedMovies = async () => {
        // get data on top rated movies
        const data = await fetchTopRatedMovies();
        // console.log('got top rated movies', data);
        // console.log('got top rated movies', data);
        // if data is not empty set top rated movies
        if (data && data.results) setTopRated(data.results);
        // set loading to false
        setLoading(false);
    }

    return (
        
        <View style={tailwind`flex-1 bg-yellow-800`}>

            {/* SafeAreaView */}
            <SafeAreaView style={tailwind `${iosMB}`}>

                {/* StatusBar */}
                <StatusBar style="light" />
                <View style={tailwind `flex-row justify-between items-center mx-4`}>

                    {/* movies header */}
                    <Text style={tailwind `text-white text-4xl font-bold`}>
                        <Text style={styles.text}>M</Text>ovies
                    </Text>

                    {/* magnifying glass icon //touchable opacity */}
                    <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                        <MagnifyingGlassIcon size={30} strokeWidth={2} color={"white"}/>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>

            {
                loading ? (
                    <Loading />
                ):(
            /* trending movies */
            <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
        >
            {/* trending movies carousel */}
            { trending.length > 0 && <TrendingMoviesCarousel data={trending}/>}

            {/* upcoming movies */}
            <MovieList title="Upcoming" data={upcoming}/>

            {/* top rated */}
            <MovieList title="Top Rated" data={topRated} />
        </ScrollView>
                )
            }
        </View>
    );
}

export default HomeScreen;