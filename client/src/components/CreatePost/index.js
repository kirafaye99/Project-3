import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Shubham');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const post = { title, body, author };

        setIsPending(true);

        fetch('http://localhost:8000/posts', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        }).then(() => {
            setIsPending(false);
            history.push('/');
        })
    }

    return ( 
        <div className="create">
            <h2>Add a New Post</h2>
            <form onSubmit={handleSubmit}>
                <label>Post Title</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Post Content</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <label>Category</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="Shubham">Shubham</option>
                    <option value="Satyam">Satyam</option>
                    <option value="Anmol">Anmol</option>
                </select>
                {!isPending && <button>Post Item</button>}
                {isPending && <button disabled>Posting...</button>}
            </form>
        </div>
     );
}
 
export default Create;