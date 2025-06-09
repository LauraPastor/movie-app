import { fetchMovieDetails } from '@/services/api'
import useFetch from '@/services/useFetch'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

interface MovieInfoProps {
    label: string;
    value?: string | number | null;
}
const MovieInfo = ({ label, value }: MovieInfoProps) => {
    return (
        <View className='flex-col items-start justify-center mt-5'>
            <Text className='text-light-200 font-normal text-sm'>{label}</Text>
            {value && <Text className='text-light-100 font-bold text-sm mt-2'>{value}</Text>}
        </View>
    )
}

const MovieDetails = () => {
    const { id } = useLocalSearchParams()
    const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string))

    return (
        <View className='bg-primary flex-1'>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }} className='w-full h-[550px]' resizeMode='stretch' />
                </View>
                <View className='flex-col items-start justify-center mt-5 px-5'>
                    <Text className='text-white text-xl font-bold'>{movie?.title}</Text>
                    <View className='flex-row items-center gap-x-1 mt-2'>
                        <Text className='text-light-200 text-sm'>{movie?.release_date?.split("-")[0]}</Text>
                        <Text className='text-light-200 text-sm'>|</Text>
                        <Text className='text-light-200 text-sm'>{movie?.runtime} min</Text>
                    </View>
                    <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
                        <Image source={require('@/assets/icons/star.png')} className='w-4 h-4' />
                        <Text className='text-light-200 text-sm font-bold'>{Math.round(movie?.vote_average ?? 0)}/10</Text>
                        <Text className='text-light-200 text-sm'>{movie?.vote_count} votes</Text>
                    </View>
                    <MovieInfo label='Overview' value={movie?.overview} />
                    <MovieInfo label='Genres' value={movie?.genres?.map((genre: { name: string }) => genre.name).join(' - ')} />
                    <View className='flex flex-row justify-between w-1/2'>
                        <MovieInfo label='Production Companies' value={movie?.production_companies?.map((company: { name: string }) => company.name).join(', ')} />
                    </View>
                    <MovieInfo label='Budget' value={`$${movie?.budget / 1_000_000} million`} />
                    <MovieInfo label='Revenue' value={`$${movie?.revenue / 1_000_000} million`} />
                </View>
                <TouchableOpacity className='absolute bottom-5 left-0 right-0 mx-5 bg-acccent rounded-lg py-3.5 flex flex-row items-center justify-center z-50' onPress={() => window.history.back()}>
                    <Image source={require('@/assets/icons/arrow.png')} className='size-5 mt-0.5 mr-1 rotate-180' tintColor='#fff' />
                    <Text className='text-light-200 text-base font-semibold'>Back to Movies</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default MovieDetails