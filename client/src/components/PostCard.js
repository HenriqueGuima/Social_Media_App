import React, { useContext } from "react";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

export default function PostCard({
  post: {
    body,
    createdAt,
    username,
    id,
    likeCount,
    likes,
    commentCount,
    comments,
  },
}) {
  const { user } = useContext(AuthContext);
  function likePost() {
    console.log("Like was clicked");
  }

  return (
    <React.Fragment>
      <Card fluid>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
          />
          <Card.Header as={Link} to={`/${username}`}>
            {username}
          </Card.Header>
          <Card.Meta as={Link} to={`/posts/${id}`}>
            {moment(createdAt).fromNow(true)}
          </Card.Meta>
          <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <LikeButton user={user} post={{ id, likes, likeCount }} />

          <Button
            as="div"
            labelPosition="right"
            as={Link}
            to={`/posts/${id}`}
            // onClick={commentPost}
          >
            <Button>
              <Icon name="comments" color="blue" />
            </Button>
            <Label as="a" basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
          {user && user.username === username && <DeleteButton postId={id} />}
        </Card.Content>
      </Card>
    </React.Fragment>
  );
}
