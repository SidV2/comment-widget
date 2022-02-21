let commentList = [];
let randomId = '0';
let level = 0;

function postComment() {
    let commentValue = document.getElementById('comment').value;
    createComment(commentValue);
}

function createComment(commentValue, id) {
    if(id) {
        const parent = findComment(id, commentList);
        parent.children.push(
            {
                id: id + 1,
                commentText: commentValue,
                children: [],
            }
        )
        showcommentOnDom(parent.children);
    } else {
        commentList.push(
            {
                id: level + randomId,
                commentText: commentValue,
                children: []
            }
        )
        showcommentOnDom(commentList);
    }
    randomId += 1;
    console.log(commentList);
}

function showcommentOnDom(commentList) {
    let comment = commentList[commentList.length - 1];
    let commentDiv = document.createElement("div");
    commentDiv.setAttribute("class", "commentDiv");
    commentDiv.setAttribute("id", "commentDiv" + comment.id);
    commentDiv.style.border = '1px solid black';
    commentDiv.innerHTML = comment.commentText;
    document.getElementById("comments_wrapper").appendChild(commentDiv);
    let replyDiv = document.createElement("div");
    replyDiv.setAttribute("class", "replyDiv" + comment.id);
    replyDiv.setAttribute("id", "replyDiv" + comment.id);
    commentDiv.appendChild(replyDiv);
    let replyButton = document.createElement("button");
    replyButton.setAttribute("class", "replyButton" + comment.id);
    replyButton.innerText = "Reply to this comment";
    replyButton.addEventListener('click', replytoComment);
    replyDiv.appendChild(replyButton);
}

function replytoComment(e) {
    let matches = e.target.className.match(/(\d+)/);
    const id = matches[0];
    const commentDiv = document.getElementById("commentDiv" + id);
    let replytoCommentDiv = document.createElement("div");
    replytoCommentDiv.setAttribute("class", "replyComment");
    replytoCommentDiv.setAttribute("id", "replyComment" + id);
    let replyCommentTextArea = document.createElement("textarea");
    replyCommentTextArea.setAttribute("class", "replyCommentTextArea");
    replyCommentTextArea.setAttribute("id", "replyCommentTextArea" + id);
    replytoCommentDiv.appendChild(replyCommentTextArea);
    commentDiv.appendChild(replytoCommentDiv);
    let postToCommentButton = document.createElement("button");
    postToCommentButton.innerText = 'Post Comment';
    commentDiv.appendChild(postToCommentButton);
    postToCommentButton.addEventListener('click', (e) => {
        createComment(document.getElementById("replyCommentTextArea" + id).value, id);
    });
}

function findComment(id, commentList) {
    console.log(commentList);
    for (let comment of commentList) {
        if (comment.children.length) {
            const result = this.findComment(id, comment.replies);
            if (result !== -1) {
                return result;
            }
        }
        if (comment.id === id) {
            return comment;
        }
    }
    return -1;
}





