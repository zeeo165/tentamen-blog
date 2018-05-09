// JavaScript för att implementera kraven A-D.

//fetch posts
fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(json => {
    addlikes(json)
    blog(json)
})

//fetch comments
const getComments = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        .then(res => res.json())
        .then(json => blog_comments(json))
};


//random number generator
function addlikes(blogList){
    blogList.forEach(like => {
        like["likes"] = Math.floor((Math.random() * 100) + 1);
    });
}


//function for when button is pushed
$('#blog').on('click', (e) => {
    getComments(Number(e.target.id))
});

//display blog and commnets affter button press
function blog(data){
    
        let renderhtml = '';
    
        for(let i in data){

            renderhtml += `
            <li class="border">
             <h3>${data[i].title}</h3>
             <p>${data[i].body}</p>
             <p>likes: ${data[i].likes}</p>
             <button id=${data[i].id}>Load comments</button>
             <ul id="comment-${data[i].id}" class="comments">
                 <!--getComments() and renderComments() is called when the button is pressed -->
             </ul>
            </li>
        `

        document.getElementById("blog").innerHTML = renderhtml;
        }
        console.log(data);
    }

//load comments
const blog_comments = (data) => {
    for (let comment of data) {
        $(`#comment-${comment.postId}`).append(`
            <li>
            <h4>${comment.name}</h4>
            <p>${comment.email}<p> 
            <p>${comment.body}</p>
            </li>
       `)
    }
};