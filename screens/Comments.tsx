import { Text, SafeAreaView, StyleSheet, View, Image, TouchableOpacity, ImageBackground, TextInput, ScrollView } from 'react-native';
const ImageUri: string = 'https://pixy.org/src/20/201310.jpg';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors } from "../utils/styles";

const randomComments = [
    {
        user: "Xammy Boy",
        comment: 'Just a random string',
        time: '1h',
        likes: 20,
        id: 1
    },

    {
        user: "Henry",
        comment: 'I we are React Native Developers',
        time: '3h',
        likes: 30,
        id: 2
    },

    {
        user: "mystry22",
        comment: 'That is my git hub username',
        time: '10h',
        likes: 10,
        id: 3
    },

    {
        user: "Dread",
        comment: 'Just a random string',
        time: '4h',
        likes: 0,
        id: 4
    },

];

export default function App() {


    const reply = () => {
        console.log('Pressed')
    }

    const pop = () => {
        console.log('go back')
    }

    const sendMsg = ()=>{
        console.log('send')
    }

    return (

        <SafeAreaView style={styles.wrapper}>
            <ImageBackground
                source={require("../assets/settings/bgImage.png")}
                resizeMode="stretch"
                style={styles.image}
            >

                <ScrollView>

                    <View style={styles.top}>
                        <TouchableOpacity onPress={() => pop()} >
                            <FontAwesome name='angle-left' size={30} color={'#F2EFEA'} style={{ marginTop: 22 }} />
                        </TouchableOpacity>
                        <Text style={styles.comments}>
                            Comments
                        </Text>
                    </View>

                    {
                        randomComments.map((comment) =>
                            <View style={styles.commentHolder} key={comment.id}>
                                <View style={styles.user}>
                                    <View style={styles.imageHolder}>
                                        <Image source={require('../assets/smiley.png')}
                                            style={{ width: 52, height: 52, borderRadius: 50 }} />
                                    </View>

                                    <View style={styles.userDetailsHolder}>
                                        <Text style={styles.name}>
                                            {comment.user}
                                        </Text>
                                        <Text style={styles.comment}>
                                            {comment.comment}
                                        </Text>

                                        <View style={styles.reactionsHolder}>
                                            <Text style={styles.replyprops}>{comment.time}</Text>
                                            <Text style={styles.replyprops}>{comment.likes + 'likes'}</Text>
                                            <Image source={require('../assets/reply.png')} style={{ width: 15, height: 15, marginTop: 8 }} />
                                            <TouchableOpacity onPress={() => reply()} style={styles.reply}>
                                                <Text style={{ color: '#5C3EC8', fontWeight: '400', fontSize: 10, lineHeight: 28 }}>Reply</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.rating}>
                                    <AntDesign name={comment.likes == 0 ? 'hearto' : 'heart'} size={25} color={'#CE0000'} />
                                </View>
                            </View>
                        )

                    }






                </ScrollView>

                {/*Add A Message*/}

                <View style={styles.addMessageHolder}>
                    <Image source={require('../assets/wow.png')} style={{ width: 60, height: 60, borderRadius: 50 }} />

                    <View style={styles.messageBox}>
                        <TextInput placeholder='Add a message' placeholderTextColor={'#F2EFEA'} style={styles.sendMessage} />
                        <TouchableOpacity onPress={()=>sendMsg()}>
                            <Feather name='send' color={'#F2EFEA'} size={25} />
                        </TouchableOpacity>
                    </View>
                </View>




            </ImageBackground>
        </SafeAreaView>


    );

}



const styles = StyleSheet.create({

    wrapper: {

        flex: 1,
        backgroundColor: colors.dark,
        justifyContent: 'flex-end'
    },

    comments: {
        margin: 24,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#F2EFEA',

    },

    comment: {
        fontSize: 10,

        fontWeight: '600',
        lineHeight: 28,
        color: '#F2EFEA'
    },

    user: {
        flexDirection: 'row',
        marginRight: 100
    },

    rating: {
        paddingRight: 15,
        paddingTop: 30
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
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginBottom:20
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
        color: '#F2EFEA',
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 28,
    },
    replyprops: {
        color: '#F2EFEA',
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 28,
    },

    addMessageHolder: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        borderTopColor: '#5C3EC8',
        borderWidth: 0.5
    },
    div: {
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    messageBox: {
        width: '80%',
        height: 50,
        borderColor: '#5C3EC8',
        borderWidth: 2,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 12
    },
    sendMessage: {
        flex: 1,
        color: '#F2EFEA'
    },
    top: {
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between',
        paddingLeft: 20,
        marginTop: 20
    }

});