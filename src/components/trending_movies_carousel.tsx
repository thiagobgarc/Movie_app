import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from "react-native";
import React from "react";
import tailwind from "twrnc";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/movieAPI";

// width, height from Dimensions for images in MovieCard (carousel  item)
const { width, height } = Dimensions.get("window");

// trending movies carousel arrow function
const TrendingMoviesCarousel = ({ data }: any) => {

// useNavigation
const navigation = useNavigation();

// handlePress function
const handleClick = (item: any)=>{
    navigation.navigate('Movie', item);
}
    
    return (
        // view `mb-8`
        <View style={tailwind`mb-8`}>
            {/* text `text-white text-xl mx-4 mb-5` title */}
            <Text style={tailwind`text-white text-xl mx-4 mb-5 font-bold`}>Trending Movies</Text>
            <Carousel
                data={data}
                renderItem={({item}) => <MovieCard item={item} handleClick={handleClick}/>}
                firstItem={1}
                inactiveSlideOpacity={.6}
                sliderWidth={ width }
                itemWidth={ width*.62 }
                slideStyle={{ display: "flex", alignItems: "center" }}
            />
        </View>
    );
}

export default TrendingMoviesCarousel;

const MovieCard = ({ item, handleClick }: any) => {
    // console.log('item.poster_path', item.poster_path)
    const cardStyle = {
        width: width * 0.6,
        height: height * 0.4,
    };

    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <View style={tailwind`w-full`}>
                <Image
                    source={{ uri: `${image500(item.poster_path)}` }}
                    style={[tailwind`rounded-3xl`, cardStyle]}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

