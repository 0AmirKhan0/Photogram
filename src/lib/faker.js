import { faker } from '@faker-js/faker';
import { simpleFaker } from '@faker-js/faker';

import axios from 'axios';
import { getReq, postReq } from './request';
export function userGenerator() {
    const user = {
        id: faker.string.uuid(),
        username: faker.person.firstName() + faker.person.lastName(),
        password: faker.string.numeric(8),
        bio: faker.person.bio(),
        avatar: faker.image.avatar()
    }
    axios.post("http://localhost:3001/users", user)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    return user;
}


export function postGenerator(userId) {
    if (!userId) {
        getReq("/users")
            .then(users => {
                const post = {
                    id: faker.string.uuid(),
                    image: faker.image.urlPicsumPhotos(),
                    description: faker.lorem.paragraph(),
                    created_time: faker.date.recent().toLocaleString(),
                    userId: users[Math.floor(Math.random() * users.length)].id
                }
                postReq("/posts", post)
                    .then(response => console.log(response))
                    .catch(err => console.log(err))
                return post;
            })
    } else {
        const post = {
            id: faker.string.uuid(),
            image: faker.image.urlPicsumPhotos(),
            description: faker.lorem.paragraph(),
            created_time: faker.date.recent().toLocaleString(),
            userId: userId
        }
        postReq("/posts", post)
            .then(response => console.log(response))
            .catch(err => console.log(err))
        return post;
    }
}

export function storyGenerator(userId) {
    if (!userId) {
        axios.get("http://localhost:3001/users")
            .then(response => {
                userId = response[Math.floor(Math.random() * response.length)].id
            })
            .catch(err => console.log(err))
    }
    const story = {
        id: faker.string.uuid(),
        image: faker.image.urlPicsumPhotos(),
        created_time: faker.date.recent().toLocaleString(),
        userId: userId
    }
    axios.post("http://localhost:3001/stories", story)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    return story;
}

export function commentGenerator(userId, postId) {
    if (!userId) {
        axios.get("http://localhost:3001/users")
            .then(response => {
                userId = response[Math.floor(Math.random() * response.length)].id
            })
            .catch(err => console.log(err))
    }
    if (!postId) {
        axios.get("http://localhost:3001/posts")
            .then(response => {
                postId = response[Math.floor(Math.random() * response.length)].id
            })
            .catch(err => console.log(err))
    }
    const comment = {
        id: faker.string.uuid(),
        content: faker.lorem.sentences(),
        created_time: faker.date.recent().toLocaleString(),
        userId: userId,
        postId: postId
    }
    axios.post("http://localhost:3001/comments", comment)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    return comment;
}

export function savedPostGenerator(userId = "1", postId = "1") {
    const savedPost = {
        id: faker.string.uuid(),
        userId: userId,
        postId: postId
    }
    axios.post("http://localhost:3001/savedPosts", savedPost)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    return savedPost;
}

export function likeGenerator(userId = "1", postId = "1") {
    const like = {
        id: faker.string.uuid(),
        userId: userId,
        postId: postId
    }
    axios.post("http://localhost:3001/likes", like)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    return like;
}

export function messageGenerator(senderId, receiverId, content = faker.lorem.sentence()) {
    const message = {
        id: faker.string.uuid(),
        senderId: senderId,
        receiverId: receiverId,
        content: content,
        created_time: faker.date.recent().toLocaleString(),
    }
    axios.post("http://localhost:3001/messages", message)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    return message;
}