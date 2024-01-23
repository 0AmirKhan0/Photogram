import { faker } from '@faker-js/faker';
import { getReq, postReq } from './request';

export function userGenerator(username, password) {
    if (!username) {
        const user = {
            id: faker.string.uuid(),
            username: faker.person.firstName() + faker.person.lastName(),
            password: faker.string.numeric(8),
            bio: faker.person.bio(),
            avatar: faker.image.avatar()
        }
        postReq("/users", user)
            .then(response => console.log(response))
            .catch(err => console.log(err))
        return user;
    } else {
        const user = {
            id: faker.string.uuid(),
            username: username,
            password: password,
            bio: '',
            avatar: 'https://studycrafter.com/wp-content/uploads/2017/12/IAFOR-Blank-Avatar-Image-1.jpg'
        }
        postReq("/users", user)
            .then(response => console.log(response))
            .catch(err => console.log(err))
        return user;
    }

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

export function messageGenerator(chatId, senderId, content) {
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
// -------------------------------------
export function commentGenerator(userId, postId, content) {
    if (!userId) {
        getReq("/users")
            .then(users => {
                getReq("/posts").then(posts => {
                    const comment = {
                        id: faker.string.uuid(),
                        content: faker.lorem.sentences(),
                        created_time: faker.date.past().toLocaleString(),
                        userId: users[Math.floor(Math.random() * users.length)].id,
                        postId: posts[Math.floor(Math.random() * posts.length)].id
                    }
                    postReq("/comments", comment).then().catch()
                    return comment
                }).catch()
            }).catch()
    } else {
        const datetime = new Date()
        const comment = {
            id: faker.string.uuid(),
            content: content,
            created_time: datetime.toLocaleString(),
            userId: userId,
            postId: postId
        }
        postReq("/comments", comment).then().catch()
        return comment
    }
}

export function savedPostGenerator(userId, postId) {
    const savedPost = {
        id: faker.string.uuid(),
        userId: userId,
        postId: postId
    }
    postReq("/savedPosts", savedPost)
        .then()
        .catch()
    return savedPost;
}

export function likeGenerator(userId, postId) {
    const like = {
        id: faker.string.uuid(),
        userId: userId,
        postId: postId
    }
    postReq("/likes", like)
        .then()
        .catch()
    return like;
}
export function followGenerator(followerId, followingId) {
    const follow = {
        id: faker.string.uuid(),
        followerId: followerId,
        followingId: followingId
    }
    postReq("/follows", follow)
        .then()
        .catch()
    return follow;
}