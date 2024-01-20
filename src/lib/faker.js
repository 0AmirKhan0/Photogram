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


export function postGenerator(userId, postInp) {
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
        const datetime = new Date()
        const post = {
            id: faker.string.uuid(),
            image: postInp.image,
            description: postInp.description,
            created_time: datetime.toLocaleString(),
            userId: userId
        }
        return postReq("/posts", post).then(post).catch()
    }
}

export function storyGenerator(userId, image) {
    if (!userId) {
        getReq("/users")
            .then(users => {
                const story = {
                    id: faker.string.uuid(),
                    image: faker.image.urlPicsumPhotos(),
                    created_time: faker.date.recent().toLocaleString(),
                    userId: users[Math.floor(Math.random() * users.length)].id
                }
                postReq('/stories', story).then(story).catch()
                const current = new Date(story.created_time)
                console.log(current.getHours())
                return story
            })
            .catch(err => console.log(err))
    } else {
        const datetime = new Date()
        const story = {
            id: faker.string.uuid(),
            image: image,
            created_time: datetime.toLocaleString(),
            userId: userId
        }
        postReq('/stories', story).then(story).catch()
        return story
    }
}

export function commentGenerator(userId, postId) {
    if (!userId) {
        axios.get("/users")
            .then(response => {
                userId = response[Math.floor(Math.random() * response.length)].id
            })
            .catch(err => console.log(err))
    }
    if (!postId) {
        axios.get("/posts")
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

export function messageGenerator(chatId, senderId , content) {
    const datetime = new Date()
    const message = {
        id: faker.string.uuid(),
        chatId: chatId,
        senderId: senderId,
        content: content,
        created_time: datetime.toLocaleString(),
    }
    postReq('/messages', message).then(message).catch()
    return message
}

export function chatGenerator(user1Id, user2Id) {
    const chat = {
        id: faker.string.uuid(),
        user1Id: user1Id,
        user2Id: user2Id,
    }
    postReq("/chats", chat).then(chat).catch()
    return chat

}