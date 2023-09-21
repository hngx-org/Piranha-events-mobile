import { Text, SafeAreaView, StyleSheet, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
const ImageUri: string = 'https://pixy.org/src/20/201310.jpg';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function App() {

    const reply = () => {
        console.log('Pressed')
    }

    return (

        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require("../assets/bg.png")}
                resizeMode="stretch"
                style={styles.bgImage}
            >


                <Text style={styles.comments}>
                    Comments
                </Text>


                <View style={styles.commentHolder}>
                    <View style={styles.user}>
                        <View style={styles.imageHolder}>
                            <Image source={require('../assets/shit.jpg')}
                                style={{ width: 52, height: 52, borderRadius: 50 }} />
                        </View>

                        <View style={styles.userDetailsHolder}>
                            <Text style={styles.name}>
                                Xammy Boy
                            </Text>
                            <Text style={styles.comment}>
                                Random blah bla bla bla bla bla
                            </Text>

                            <View style={styles.reactionsHolder}>
                                <Text style={styles.replyprops}>2h</Text>
                                <Text style={styles.replyprops}>120likes</Text>
                                <Image source={require('../assets/reply.png')} style={{ width: 15, height: 15, marginTop: 8 }} />
                                <TouchableOpacity onPress={() => reply()} style={styles.reply}>
                                    <Text style={{ color: '#5C3EC8', fontWeight: '400', fontSize: 10, lineHeight: 28}}>Reply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.rating}>
                        <AntDesign name='heart' size={25} color={'#CE0000'} />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>


    );

}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        paddingRight: 8,
        paddingLeft: 8,
        paddingBottom: 8,
        paddingTop: 30

    },

    comments: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center'
    },

    comment: {
        fontSize: 10,
     
        fontWeight: '600',
        lineHeight: 28,
        color: 'red'
    },

    user: {
        flexDirection: 'row',
        marginRight: 100
    },

    rating: {
        paddingRight: 20,
        paddingTop: 20
    },

    imageHolder: {
        height: 60,
        width: 60,
        marginTop: 10
    },

    image: {
        width: '100%',
        height: '100%',
        borderRadius: 50
    },

    userDetailsHolder: {
    },

    commentHolder: {
        flexDirection: 'row',
        justifyContent: 'flex-start',

    },

    reactionsHolder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 150,

    },
    reply: {
        flexDirection: 'row'
    },
    bgImage: {
        flex: 1,
        paddingHorizontal: 26,
        alignItems: "center",
    },
    name: {
        color: 'green',
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 28,
    },
    replyprops: {
        color: 'red',
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 28,
    }

});