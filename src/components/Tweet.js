import { dbService, storageService } from 'fbase';
import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";


const Tweet =( {tweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);

    const onDeleteClick = async ()=> {
        const ok = window.confirm("Are you sure to delete this Tweet?")
        if(ok) {
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
            await storageService.refFromURL(tweetObj.fileUrl).delete();
        }
    }

    const toggleEditing =()=> setEditing((prev) => !prev);

    const onSubmit = async(e) => {
        e.preventDefault();
        const edit = window.confirm("Do you want to save change?")
        if(edit) {
            await dbService.doc(`tweets/${tweetObj.id}`).update({
                text:newTweet
            });
        }
        setEditing(false);
    };

    const onChange = (e) => {
        const {target:{value},
        } = e;
        setNewTweet(value);
    }

    return (
    <div className="nweet">
    {editing ? (
    <>
    <form onSubmit={onSubmit} className="container nweetEdit">
    <input
    className="formInput"
    onChange={onChange}
    value={newTweet} 
    type="text" 
    placeholder="what is new-Tweet?"
    />
    <input
    value="Update Tweet"
    type="submit"
    />
    </form>
    <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
    </span>
    </>):
    <>
    <h4>{tweetObj.text}</h4>
    {tweetObj.fileUrl && <img src={tweetObj.fileUrl} width='50px' height='50px'/>}
    {isOwner && (
    <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
    </div>
    )}
    </>
    }
    </div>
    );
}
export default Tweet;
