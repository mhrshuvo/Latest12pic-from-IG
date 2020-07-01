const search = document.querySelector('.search')


async function fetchLatestPosts (profileId){
    const responce = await fetch(`https://www.instagram.com/${profileId}/?__a=1`);
    const data     = await responce.json();

    console.log(`name : ${data.graphql.user.full_name} , ${profileId} has ${data.graphql.user.edge_followed_by.count} follower, and ${profileId} followed ${data.graphql.user.edge_follow.count} people `)

    if (data.graphql.user.is_private){
        console.log(`${profileId} has private id. try another `);
    }
    else{
        console.log(`${profileId} has public id`);
    }


    const latest =data.graphql.user.edge_owner_to_timeline_media.edges;
    const thumbnails = [];

    latest.forEach(element => thumbnails.push(element.node.thumbnail_src));

    return thumbnails;
}

async function creatGallery (profileId){
    const thumbnils = await fetchLatestPosts(profileId);

    const container = document.createElement('div');
    container.id = 'gallery';

    thumbnils.forEach(thumbnail =>{
        const img = document.createElement('img');
        img.src=thumbnail;
        container.appendChild(img);
    });
    document.body.appendChild (container);
}

search.addEventListener('submit', (e) =>{
    e.preventDefault();
    creatGallery(search.id.value);
    //console.log(search.id.value);
    search.reset();
});


