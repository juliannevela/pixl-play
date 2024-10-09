import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '@/lib/appwrite'

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [isLoading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields.')
    }

    setLoading(true);

    try {
      const result = await createUser({
        email: form.email,
        password: form.password,
        username: form.username
      });

      // set it to global state...
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setLoading(false);
    }

  }
  return (
    <SafeAreaView style={{
      backgroundColor: '#161622',
      height: '100%'
    }}>
      <ScrollView>
        <View className='w-full min-h-[85vh] justify-center px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />

          <Text className='text-xl text-white text-bold mt-10 font-lbold'>
            Create an account
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e: string) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title='Sign Up'
            handlePress={handleSubmit}
            containerStyles='mt-7'
            isLoading={isLoading}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-sm text-gray-100 font-lregular'>Already have an account?</Text>
            <Link href='/sign-in' className='text-sm font-lbold text-secondary'>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp