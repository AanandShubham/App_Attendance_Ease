import React, { useState } from 'react'
import { View, Image, Text, Pressable } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons'

type ImageSelectorProps = {
    setImage: (image: string | null) => void
    imgUrl: string
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ setImage, imgUrl }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(imgUrl)

    const handleImagePick = async () => {
        // Ask permission
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (!permissionResult.granted) {
            alert('Permission to access gallery is required!')
            return
        }

        // Open picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        })

        // Handle selected image
        if (!result.canceled) {
            const uri = result.assets[0].uri
            setImageUrl(uri)

            setImage(uri)
        }
    }

    return (
        <View className="w-[70vw] h-[20vh] bg-neutral-600 rounded-3xl relative flex justify-center items-center overflow-hidden">
            {/* Image or placeholder */}
            {imageUrl ? (
                <Image
                    source={{ uri: imageUrl }}
                    className="w-full h-full rounded-3xl"
                    resizeMode="cover"
                />
            ) : (
                // <Text className="text-white text-lg">Add {imgId}</Text>
                <Text className="text-white text-lg">Add </Text>
            )}

            {/* Image add button */}
            <Pressable
                onPress={handleImagePick}
                className="absolute bottom-2 right-2 bg-white/10 p-2 rounded-full"
            >
                <Ionicons name="image-outline" size={32} color="#38bdf8" />
            </Pressable>
        </View>
    )
}

export default ImageSelector
