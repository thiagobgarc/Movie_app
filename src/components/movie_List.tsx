import React from "react";
import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from "react-native";
import tailwind from "twrnc";
import { styles } from "../themes";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image185 } from "../api/movieAPI";

const { width, height } = Dimensions.get("window");

const MovieList = ({ title, data, hideSeeAll }: any) => {
    const navigation = useNavigation();
    let movieName = "Ant-Man and the Wasp: Quantumania";
    return (
        <View style={tailwind`mb-8 mt-4`}>
            <View style={tailwind`mx-5 mb-3 flex-row justify-between items-center`}>
                <Text style={tailwind`text-white text-xl`}>{title}</Text>
                {
                    !hideSeeAll && 
                    (
                        <TouchableOpacity>
                            <Text style={styles.text}>See All</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            {/* movie list */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}
            >
                {
                    data.map((item: any, index: number) => {
                        const cardStyle = {
                            width: width * 0.33,
                            height: height * 0.22,
                        };
                        console.log("this is image185", item.poster_path)
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.push('Movie', item)}
                            >
                                <View style={tailwind`mr-4`}>
                                    <Image
                                        source={{ uri: `${ image185(item.poster_path) || fallbackMoviePoster }` }}
                                        style={[tailwind`rounded-3xl`, cardStyle]}
                                    />
                                    <Text style={tailwind`text-neutral-300 ml-1`}>
                                        {
                                            item.title.length > 14 ? item.title.substring(0, 14) + "..." : item.title
                                        }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
}

export default MovieList;