import { View, Text } from 'react-native'
import { InfoBoxProps } from '@/types/types'

const InfoBox = ({ title, subTitle, containerStyles, titleStyles }: InfoBoxProps) => {
  return (
    <View className={containerStyles}>
      <Text className={`${titleStyles} text-white text-center font-lbold`}>
        {title}
      </Text>
      <Text className='text-sm font-lregular text-center text-gray-100'>
        {subTitle}
      </Text>
    </View>
  )
}

export default InfoBox