import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import {
  Grid,
  Transition,
  Placeholder,
  Segment,
  Comment,
  Button,
  Label,
  Icon,
} from "semantic-ui-react";
import gql from "graphql-tag";
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import { useParams } from "react-router";

export default function SinglePost(props) {
  //   const postId = props.match.params.postId;
  const postId = useParams();
  //   console.log(postId);

  const { user } = useContext(AuthContext);
  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: postId,
  });

  function deletePostCallback(props) {
    props.history.push("/");
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading Post...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      commentCount,
      likeCount,
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <h3>{username}</h3>
            <p>{body}</p>
            <LikeButton user={user} post={{ id, likes, likeCount }} />
            <p>{likeCount} likes</p>
            <p> {moment(createdAt).fromNow(true)}</p>
          </Segment>
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment>
            <p>{commentCount} comments</p>
            {comments.map((comment) => (
              <div key={comment.id}>
                <Comment comment={comment} postId={id} />
              </div>
            ))}
            {/* <CommentForm postId={id} /> */}
            <LikeButton user={user} post={{ id, likes, likeCount }} />
            <Button
              as="div"
              labelPosition="right"
              onClick={() => console.log("comment on post")}
            >
              <Button basic color="blue">
                <Icon name="comments" />
              </Button>
              <Label as="a" basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
            {user && user.username === username && (
              <DeleteButton postId={id} callback={deletePostCallback} />
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
  return postMarkup;
}

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
