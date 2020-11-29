const fetch = require("node-fetch");

const POST_NODE_TYPE = `Contributors`
exports.sourceNodes = async ({
                                 actions,
                                 createContentDigest,
                                 createNodeId,
                                 getNodesByType,
                             }, pluginOptions) => {
    const {createNode} = actions

    const contributors = []
    let hasMore = true;
    let page = 1;
    do {
        const response = await fetch(`https://api.github.com/repos/${pluginOptions.org}/${pluginOptions.repository}/contributors?page=${page++}`)
        const result = await response.json()
        contributors.push(...result)
        hasMore = result.length > 0
    } while (hasMore);

    console.log(`Loaded ${contributors.length} contributors`);

    contributors.forEach(post =>
        createNode({
            ...post,
            id: createNodeId(`${POST_NODE_TYPE}-${post.id}`),
            parent: null,
            children: [],
            internal: {
                type: POST_NODE_TYPE,
                content: JSON.stringify(post),
                contentDigest: createContentDigest(post),
            },
        })
    )
    return
}