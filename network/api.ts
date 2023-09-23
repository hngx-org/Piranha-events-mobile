import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SERVER_URL = "https://team-piranha.onrender.com/api";
let token;


const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      console.log(12, value);
      return value.toString();
    }
  } catch (e) {
    console.log(e);
  }
};


export const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: 2000,

  headers: {"content-type": "application/json"},

});


// export const axiosInstance2 = axios.create({
//   baseURL: SERVER_URL,
//   timeout: 2000,
//   headers: {
//     "Content-Type": "multipart/form-data",
//     Authorization: `Bearer ${getToken().then((data) => data)}`
//   },
// });





export const endPoints = {
  comments: {
    createCommentImage: (commentId: string) => `/comments/${commentId}/images/`,
    likeComment: (commentId: string) => `/comments/${commentId}/likes/`,
  },

  events: {
    eventsList: "/events",
    createEvent: "/event/",
    createComment: (eventId: string) => `/events/${eventId}/comments`,
    getEventById: (eventId: string) => `/events/${eventId}`,
    updateEvent: (eventId: string) => `/events/${eventId}`,
    patchEvent: (eventId: string) => `/events/${eventId}`,
    deleteEvent: (eventId: string) => `/events/${eventId}`,
  },

  groups: {
    getById: (groupId: string) => `/groups/${groupId}/`,
    getForUser: (userId: number) => `/group/user/${userId}/`,
    addMember: (groupId: string, memberId: string) =>
      `/groups/${groupId}/members/${memberId}/`,
    create: "/group/",
    groupEvent: (groupId: string) => `/group/${groupId}/events/`,
    getMembers: (groupId: string) => `/groups/${groupId}/members/`,
  },

  images: {
    getImages: "/images/",
    createImage: "/images/",
    getImageById: (imageId: string) => `/images/${imageId}/`,
    putImage: (imageId: string) => `/images/${imageId}/`,
    patchImage: (imageId: string) => `/images/${imageId}/`,
    deleteImage: (imageId: string) => `/images/${imageId}/`,
  },

  users: {
    getUserById: (userId: string) => `/users/${userId}/`,
    putUserById: (userId: string) => `/users/${userId}/update`,
    addUserToEvent: (userId: string, eventId: string) =>
      `/users/${userId}/interests/${eventId}/`,
  },

  auth: {
    login: "/login/",
  },
};
