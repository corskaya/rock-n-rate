import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteOutlined,
  HeartFilled,
  HeartOutlined,
  MessageFilled,
} from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Loading, Message } from "../../../../components";
import { AppDispatch, RootState } from "../../../../store";
import { Topic } from "../../../../types/common";
import {
  commentArtist,
  getComments,
  likeComment,
  removeComment,
  setComments,
  setToastStatus,
  unlikeComment,
} from "../../slice";
import defaultProfilePicture from "../../../../assets/default-profile-picture.png";
import Comment from "../../../../types/comment";
import styles from "./Comments.module.css";

const Comments: React.FC = () => {
  const [commentValue, setCommentValue] = useState("");
  const { slug } = useParams();
  const {
    commentsPending,
    commentsFulfilled,
    commentsRejected,
    comments,
    commentsErrorMessage,
    commentArtistPending,
    commentArtistFulfilled,
    commentArtistRejected,
    commentArtistErrorMessage,
    removeCommentPending,
  } = useSelector((state: RootState) => state.artist);
  const user = useSelector((state: RootState) => state.login.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!user) {
      dispatch(
        setToastStatus({
          show: true,
          title: "Please login",
          message: "To leave a comment, please log in first.",
          type: "info",
        })
      );
      navigate("/login");
      return;
    }

    dispatch(
      commentArtist({
        topic: Topic.Artist,
        topicSlug: slug!,
        content: commentValue,
      })
    );
  };

  const handleLike = (comment: Comment) => {
    if (!user) {
      dispatch(
        setToastStatus({
          show: true,
          title: "Please login",
          message: "To like a comment, please log in first.",
          type: "info",
        })
      );
      navigate("/login");
      return;
    }

    dispatch(likeComment(comment._id));
    const commentCopy = { ...comment };
    commentCopy.likes = [...comment.likes, user._id];
    commentCopy.likeCount = commentCopy.likes.length;
    const updatedComments = comments.map((c) => {
      return c._id === comment._id ? commentCopy : c;
    });
    dispatch(setComments(updatedComments));
  };

  const handleUnlike = (comment: Comment) => {
    const commentCopy = { ...comment };
    dispatch(unlikeComment(comment._id));
    commentCopy.likes = comment.likes.filter((id) => id !== user!._id);
    commentCopy.likeCount = commentCopy.likes.length;
    const updatedComments = comments.map((c) => {
      return c._id === comment._id ? commentCopy : c;
    });
    dispatch(setComments(updatedComments));
  };

  const handleRemoveComment = (commentId: string) => {
    dispatch(removeComment(commentId));
  };

  const checkIfLoggedUserComment = (userId: string) => {
    if (user && user._id === userId) {
      return true;
    }
    return false;
  };

  const checkIfCommentLiked = (userIds: string[]) => {
    if (user && userIds.includes(user._id)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    dispatch(getComments(slug!));
  }, [dispatch, slug]);

  useEffect(() => {
    if (commentArtistFulfilled) {
      setCommentValue("");
    }
  }, [commentArtistFulfilled]);

  return (
    <div className={styles.commentsContainer}>
      {commentsPending && <Loading />}
      {commentsFulfilled && comments && (
        <>
          <div className={styles.commentsHeader}>
            <MessageFilled className={styles.commentIcon} />
            <h4
              className={styles.commentsHeading}
            >{`${comments.length} Comments`}</h4>
          </div>
          <div className={styles.comments}>
            {comments.map((comment) => (
              <div key={comment._id} className={styles.commentContainer}>
                <Link
                  to={`/user/${comment.username}`}
                  className={styles.commentAvatarLink}
                >
                  <div className={styles.commentAvatarContainer}>
                    <img
                      src={comment.avatar || defaultProfilePicture}
                      alt={`${comment.username} avatar`}
                      className={styles.commentAvatar}
                    />
                  </div>
                </Link>
                <div className={styles.commentContentContainer}>
                  <div>
                    <Link
                      to={`/user/${comment.username}`}
                      className={styles.commentUsernameLink}
                    >
                      <span className={styles.commentUsername}>
                        {comment.username}
                      </span>
                    </Link>
                    <span className={styles.commentDate}>
                      {dayjs(comment.createdAt).format(
                        "MMMM DD, YYYY [at] HH:mm"
                      )}
                    </span>
                  </div>
                  <p className={styles.commentContent}>{comment.content}</p>
                </div>
                <div className={styles.commentActionContainer}>
                  <div className={styles.commentLikeContainer}>
                    <span className={styles.commentLikeCount}>
                      {comment.likeCount}
                    </span>
                    {checkIfCommentLiked(comment.likes) ? (
                      <HeartFilled
                        className={styles.commentHeartIcon}
                        onClick={() => handleUnlike(comment)}
                      />
                    ) : (
                      <HeartOutlined
                        className={styles.commentHeartIcon}
                        onClick={() => handleLike(comment)}
                      />
                    )}
                  </div>
                  {checkIfLoggedUserComment(comment.userId) &&
                    removeCommentPending && (
                      <Loading
                        size="small"
                        className={styles.commentRemoveIcon}
                      />
                    )}
                  {checkIfLoggedUserComment(comment.userId) &&
                    !removeCommentPending && (
                      <DeleteOutlined
                        className={styles.commentRemoveIcon}
                        onClick={() => handleRemoveComment(comment._id)}
                      />
                    )}
                </div>
              </div>
            ))}
          </div>
          {commentArtistRejected && (
            <Message>
              {commentArtistErrorMessage}
            </Message>
          )}
          <div className={styles.leaveCommentContainer}>
            <textarea
              className={styles.leaveCommentInput}
              placeholder="Leave a comment"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
            />
            <button
              className={styles.leaveCommentButton}
              onClick={handleSubmit}
            >
              {commentArtistPending ? <Loading size="small" /> : "Submit"}
            </button>
          </div>
        </>
      )}
      {commentsRejected && <Message>{commentsErrorMessage}</Message>}
    </div>
  );
};

export default Comments;
