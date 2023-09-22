import axios from "axios";

export const SERVER_URL = "https://team-piranha.onrender.com/api";

export const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: 2000,
  headers: {},
});

export const endPoints = {
  comments: {
    createCommentImage: (commentId: string) => `/comments/${commentId}/images`,
    likeComment: (commentId: string) => `/comments/${commentId}/likes`,
  },

  events: {
    eventsList: "/events",
    createEvent: "/events",
    createComment: (eventId: string) => `/events/${eventId}/comments`,
    getEventById: (eventId: string) => `/events/${eventId}`,
    updateEvent: (eventId: string) => `/events/${eventId}`,
    patchEvent: (eventId: string) => `/events/${eventId}`,
    deleteEvent: (eventId: string) => `/events/${eventId}`,
  },

  groups: {
    getById: (groupId: string) => `/groups/${groupId}`,
    addMember: (groupId: string, memberId: string) =>
      `/groups/${groupId}/members/${memberId}`,
    create: "/groups",
    getMembers: (groupId: string) => `/groups/${groupId}/members/`,
  },

  images: {
    getImages: "/images",
    createImage: "/images",
    getImageById: (imageId: string) => `/images/${imageId}`,
    putImage: (imageId: string) => `/images/${imageId}`,
    patchImage: (imageId: string) => `/images/${imageId}`,
    deleteImage: (imageId: string) => `/images/${imageId}`,
  },

  users: {
    getUserById: (userId: string) => `/users/${userId}`,
    putUserById: (userId: string) => `/users/${userId}/update`,
    addUserToEvent: (userId: string, eventId: string) =>
      `/users/${userId}/interests/${eventId}`,
  },

  auth: {
    login: "/login/",
  },
};
