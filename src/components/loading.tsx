import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import * as Progress from 'react-native-progress'
import { theme } from '../themes'

const { width, height } = Dimensions.get('window')

const Loading = () => {
    const cardStyle = {
        width: width,
        height: height,
    };
  return (
    <View style={[cardStyle ,tailwind`flex-row justify-center items-center absolute`]}>
      <Progress.CircleSnail thickness={12} size={160} color={theme.background}/>
    </View>
  )
}

export default Loading