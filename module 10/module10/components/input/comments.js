import { useState,useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments,setComments] = useState([]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);

    fetch('/api/comments/'+eventId).then(response=>response.json()).then(data=>setComments(data.comments))
  }

  function addCommentHandler(commentData) {
    
    // just before  sending request , we want to show pending notification

    notificationCtx.showNotification({
      title: "sending comment...",
      message: " your comment is being currently stored into a database",
      status: "pending",
    });

    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if(response.ok){
        return response.json();
      }

      response.json().then(data =>{
        throw new Error(data.message || "something went wrong")
      })
  })
      .then(data => {
        
    notificationCtx.showNotification({
      title: "Sucess",
      message: " Comment has been saved successfully",
      status: "success",
    });
      })
      .catch(error=>{
        notificationCtx.showNotification({
          title : "Error !!",
          message : error.message || " oops ! something went wrong",
          status : "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items = {comments} />}
    </section>
  );
}

export default Comments;
