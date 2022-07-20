async function postFormHander(event) {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const post_content = document.querySelector('#content').value.trim();

    if (title && post_content) {
        const response = await fetch('/api/posts', {
            method: 'post',
            body: JSON.stringify({
                title,
                post_content
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        }
        else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#newPostForm').addEventListener('submit', postFormHander);