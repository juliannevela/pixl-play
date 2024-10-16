import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { Video, ResizeMode } from 'expo-av'

import { CustomButton, FormField } from '@/components'
import { VideoData } from '@/types/types'
import { icons } from '@/constants'
import { createVideo } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const Create = () => {
  const globalContext = useGlobalContext();
  if (!globalContext) {
    throw Error('Global context is null.');
  }

  const { user } = globalContext;
  const [form, setForm] = useState<VideoData>({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  })
  const [uploading, setUploading] = useState<boolean>(false);

  const openPicker = async (type: string) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: type === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled) {
      if (type === 'image') {
        setForm({
          ...form,
          thumbnail: result.assets[0]
        })
      }
      if (type === 'video') {
        setForm({
          ...form,
          video: result.assets[0]
        })
      }
    }
  }

  const handleUpload = async () => {
    if (!form.prompt || !form.thumbnail || !form.title || !form.video) {
      Alert.alert('Please fill in all the fields.')
    }
    setUploading(true)

    try {
      if (form.thumbnail !== null && form.video !== null) {
        await createVideo({
          ...form,
          thumbnail: form.thumbnail,
          video: form.video,
          userId: user.$id
        });
      } else {
        Alert.alert('Error', 'Please fill in all of the fields.')
      }

      Alert.alert('Success', 'Post uploaded successfully.');
      router.push('/home')
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
      })
      setUploading(false);
    }
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#161622",
        height: "100%",
      }}
      edges={["top"]}
    >
      <ScrollView
        className='px-4 my-6'
      >
        <Text className='text-2xl text-white font-lbold mb-4'>Upload Video</Text>

        <FormField
          title='Video Title'
          value={form.title}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles='mb-4 gap-2'
          placeholder='Enter a title for your video'
        />

        <View className='mb-4 space-y-2 gap-2'>
          <Text className='text-base text-gray-100 font-lregular'>
            Upload Video
          </Text>
          <TouchableOpacity
            onPress={() => openPicker('video')}
          >
            {form.video ? (
              <Video
                source={{
                  uri: form.video.uri
                }}
                className='w-full h-64 rounded-2xl'
                resizeMode={ResizeMode.COVER}
                onError={(error) => {
                  console.log(error)
                  throw new Error(error)
                }}
              />
            ) : (
              <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center border border-black-200'>
                <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center rounded-lg'>
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    className='w-1/2 h-1/2'
                  />

                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className='mb-4 space-y-2 gap-2'>
          <Text className='text-base text-gray-100 font-lregular'>
            Thumbnail Image
          </Text>
          <TouchableOpacity
            onPress={() => openPicker('image')}
          >
            {form.thumbnail ? (
              <Image
                source={{
                  uri: form.thumbnail.uri
                }}
                resizeMode='cover'
                className='w-full h-64 rounded-2xl'
              />
            ) : (
              <View className='flex-row w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border border-black-200 gap-2'>
                <Image
                  source={icons.upload}
                  resizeMode='contain'
                  className='w-5 h-5'
                />
                <Text className='text-sm text-gray-100 font-lregular'>Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title='AI Prompt'
          value={form.prompt}
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles='mb-4 gap-2'
          placeholder='The AI prompt of your video...'
        />

        <CustomButton
          title='Submit & Publish'
          containerStyles='w-full my-5'
          handlePress={handleUpload}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create