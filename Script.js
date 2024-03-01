const apikey = 'fc191c0978bd477bb17ba66a921105b2';
const blogContainer = document.getElementById('blog-container');
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// const sidebarBusiness = document.getElementsByClassName("business");
// const sidebarBusiness = document.querySelector(".business");

const sidebarIcons = document.querySelectorAll('.sidebar-icons');


async function fetchrandomnews (){
    try{
        const apiUrl =`https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=12&apikey=${apikey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
        
    }catch(error){
        console.error("Error fetching random news",error);
        return [];
    }
}




searchButton.addEventListener("click",async ()=>{
    const query = searchField.value.trim();
    if(query !== "")
    {
        try{
            const articles = await fetchnewsquery(query);
            displayBlog(articles);
        }catch(error){
            console.log("error fetching news from query",error);
        }
    }
});

async function fetchnewsquery(query){
    try{
        const apiUrl =`https://newsapi.org/v2/everything?q=${query}&pageSize=24&apikey=${apikey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
        
    }catch(error){
        console.error("Error fetching random news",error);
        return [];
    }
}


function displayBlog (articles){
    blogContainer.innerHTML = "";
    articles.forEach((article) =>{
        

        if(article.urlToImage)
        {
            const blogCard = document.createElement("div");
            blogCard.classList.add("blog-card");
            const img =document.createElement("img");

            img.src = article.urlToImage;
            img.alt = article.title;
            const title = document.createElement("h2");
            // title.textContent = article.title;
            const truncatedTitle = article.title.length >30? article.title.slice(0,45) + "..." : article.title ;
            title.textContent = truncatedTitle;
            const description = document.createElement("p");
            //description.textContent = article.description;
            const truncateDescription = article.description.length >100? article.description.slice(0,100) + "..." :article.description;
            description.textContent = truncateDescription;

            blogCard.appendChild(img);
            blogCard.appendChild(title);
            blogCard.appendChild(description);
            blogCard.addEventListener("click", ()=>{
                window.open(article.url, "_blank")
            });
            blogContainer.appendChild(blogCard);
        }


    });
}

(async ()=>{
    try{
        const articles = await fetchrandomnews();
        displayBlog(articles);

    }catch(error){

        console.error("Error fetching random news(arrow func)",error);
        return [];
    }
})();


// sidebarBusiness.addEventListener("click",async () =>{
//     const query = 'business';
//     try{
//         const articles = await fetchnewsquery(query);
//         displayBlog(articles);
//     }catch(error)
//     {
//         console.log("error fetching business");
//     }
// });
 

sidebarIcons.forEach(icon => {
    icon.addEventListener('click', async () => {
        
        const query = icon.getAttribute('data-query').trim();
        
        try {
            const articles = await fetchnewsquery(query);
            displayBlog(articles);
        } catch(error) {
            console.log(`Error fetching ${query} news:`, error);
        }
    });
});

const dropdownLinks = document.querySelectorAll('.dropdown-content div');

// Add click event listener to each link
dropdownLinks.forEach(link => {
    link.addEventListener('click', async () => {
        // Get the value of data-query attribute for the clicked link
        const query = link.getAttribute('data-query').trim();
        
        try {
            const articles = await fetchnewsquery(query);
            displayBlog(articles);
        } catch(error) {
            console.log(`Error fetching ${query} news:`, error);
        }
    });
});