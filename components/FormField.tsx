import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'
import { icons } from '@/constants'
import { FormFieldProps } from '@/types/types'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setFocused] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-llight'>{title}</Text>

      <View
        className='flex-row w-full h-16 px-4 bg-black-100 rounded-2xl items-center'
        style={{
          borderWidth: 2,
          borderColor: isFocused ? '#ff9c01' : '#232533',
        }}
      >
        <TextInput
          className='flex-1 text-white font-llight font-base'
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7B7B8B'
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {title === 'Password' && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              className='w-6 h-6'
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField