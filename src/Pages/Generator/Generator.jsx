import React from 'react'
import { commentGenerator, postGenerator, storyGenerator, userGenerator } from '../../lib/faker'
import Layout from '../../Components/Layout'

export default function Generator() {
    return (
        <Layout>
            <div style={{ display: "flex", gap: "2rem", justifyContent:"center" }}>
                <button onClick={()=>userGenerator(false)}>Generate User</button>
                <button onClick={()=>postGenerator(false)}>Generate Post</button>
                <button onClick={()=>storyGenerator(false)}>Generate Story</button>
                <button onClick={()=>commentGenerator(false)}>Generate Comment</button>
            </div>
        </Layout>
    )
}
