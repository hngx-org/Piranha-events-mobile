import { Text, SafeAreaView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
const ImageUri: string = 'https://pixy.org/src/20/201310.jpg';


export default function App() {

    const reply = () => {
        console.log('Pressed')
    }

    return (

        <SafeAreaView style={styles.container}>
            <Text style={styles.comments}>
                Comments
            </Text>



            <View style={styles.commentHolder}>
                <View style={styles.user}>
                    
                    <View style={styles.imageHolder}>
                        <Image source={require('../assets/shit.jpg')}
                          style={{width:60, height:60, borderRadius:50}} />
                    </View>



                    <View style={styles.userDetailsHolder}>
                        <Text>
                            Xammy Boy
                        </Text>
                        <Text style={styles.comment}>
                            Random blah bla bla
                        </Text>



                        <View style={styles.reactionsHolder}>
                            <Text>2h</Text>
                            <Text>120likes</Text>
                            <TouchableOpacity onPress={() => reply()}>
                                <Image source={{ uri: ImageUri }} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.rating}>
                </View>
            </View>
        </SafeAreaView>

    );

}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },

    comments: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center'
    },

    comment: {
        fontSize: 12,
        marginTop: 5
    },

    user: {
        flexDirection: 'row'
    },

    rating: {

    },

    imageHolder: {
        height: 60,
        width: 60,
        margin: 10
    },

    image: {
        width: '100%',
        height: '100%',
        borderRadius: 50
    },

    userDetailsHolder: {
    },

    userName: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: 400
    },

    commentHolder: {
    },

    reactionsHolder: {
        flexDirection: 'row',
    }

});